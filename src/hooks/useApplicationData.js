import { useReducer, useEffect } from "react";
import updateEmptySpots from "helpers/updateSpots";
import axios from 'axios';



export default function useApplicationData() {

  const [state, dispatch] = useReducer({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const setDay = day => dispatch({ ...state, day });

    useEffect(() => {
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers')
      ]).then(([days, appointments, interviewers]) => {
          setState(prev => ({
            ...prev, 
            days: days.data, 
            appointments: appointments.data,
            interviewers: interviewers.data
          }))
        })
        .catch((err) => {console.log(err.response.status)})
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

          setState({
            ...upToDateState, 
            days: newDays})
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
        setState({...newStatedata, days: updatedDays})
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