import { useReducer, useEffect } from "react";
import updateEmptySpots from "helpers/updateSpots";
import axios from 'axios';
import reducer, {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW} from 'reducers/application'



export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

    useEffect(() => {
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers')
      ]).then(([days, appointments, interviewers]) => {
          dispatch({
            type: SET_APPLICATION_DATA, 
            days: days.data, 
            appointments: appointments.data,
            interviewers: interviewers.data
          })
        })
        .catch((err) => {console.log(err)})
    }, [] )

    function CancelInterview(id) {
      const url = `/api/appointments/${id}`

      
      return axios.delete(url)
        .then(() => {
          const deletedAppt = {
            ...state.appointments[id],
            interview: null,
          }
          const deletedAppts = {
            ...state.appointments,
            [id]: deletedAppt
          }

          const upToDateState = {
            ...state,
            appointments: deletedAppts
          }

          const newDays = updateEmptySpots(upToDateState, id)

          dispatch({type: SET_INTERVIEW, appointments: deletedAppts, days: newDays})
        })
        
    }

    function BookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      const newStatedata = {
        ...state,
        appointments
      }

      const url = `/api/appointments/${id}`
      return axios.put(url, newStatedata.appointments[id])
      .then((res) => {
        const updatedDays = updateEmptySpots(newStatedata, id)
        dispatch({type: SET_INTERVIEW, appointments, days: updatedDays})
        return res;
      })

    }
    return {
      state,
      setDay,
      BookInterview,
      CancelInterview
    }

}