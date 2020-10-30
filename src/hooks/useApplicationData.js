import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

    useEffect(() => {
      Promise.all([
        Promise.resolve(axios.get('/api/days')),
        Promise.resolve(axios.get('/api/appointments')),
        Promise.resolve(axios.get('/api/interviewers'))
      ]).then((all) => {
          const [days, appointments, interviewers] = all;
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
      console.log("ID for cancellation: ", id)
      const url = `/api/appointments/${id}`
      return axios.delete(url)
        .then((res) => {
          console.log("Axios delete res: ", res)
          const deletedAppt = {
            ...state.appointments[id],
            interview: null,
          }
          const deletedAppts = {
            ...state.appointments,
            [id]: deletedAppt
          }
          console.log("deleted appr: ", deletedAppt)
          setState({
            ...state, 
            deletedAppts})
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
        console.log("Response status: ",  res.status)
        setState(newStatedata)
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