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

    const updateSpots = function(id, direction) {
      const days = [...state.days]
      for (const key in days) {
        if (days[key].appointments.includes(id)) {
          if (direction === "decrement") {
            const updatedDay = {...days[key], spots: days[key].spots - 1}
            days[key] = updatedDay
          } else if (direction === "increment") {
            const updatedDay = {...days[key], spots: days[key].spots + 1}
            days[key] = updatedDay
          }
        }
      }
      return days
    }

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
          const changedDay = updateSpots(id, "increment")
          console.log("DAYS", changedDay)
          setState({
            ...state, 
            deletedAppts, 
            days: changedDay})
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
      
      // const updateSpots = function(direction) {
      //   let count = 0;
      //   if (state.day === "Monday") {
      //     for (const spot in state.appointments)
      //       if (spot >=1 && spot <= 5) {
      //         if (state.appointments[spot].interview === null) {
      //           count += 1;
      //         }
      //       }
      //   }
      //   return count;
      // };
      
      

      const url = `/api/appointments/${id}`
      return axios.put(url, newStatedata.appointments[id])
      .then((res) => {
        const changedDay = updateSpots(id, "decrement")
        console.log("CHANGED SDAY: ", changedDay)
        setState({...newStatedata, days: changedDay})
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