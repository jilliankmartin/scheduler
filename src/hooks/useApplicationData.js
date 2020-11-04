import { useReducer, useEffect } from "react";
import axios from 'axios';
import reducer, {SET_DAY, SET_APPLICATION_DATA, BOOK_INTERVIEW, CANCEL_INTERVIEW} from 'reducers/application'



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
          dispatch({type: CANCEL_INTERVIEW, id})
        })
        
    }
    
    function BookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const url = `/api/appointments/${id}`
      return axios.put(url, appointment)
      .then((res) => {
        dispatch({type: BOOK_INTERVIEW, id, interview})
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