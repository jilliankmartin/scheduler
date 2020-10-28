import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import axios from 'axios';


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "2pm",
  },
  {
    id: 3,
    time: "9am",
  },
  {
    id: 4,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "3pm",
    interview: {
      student: "Mark Jones",
      interviewer: {
        id: 2,
        name: "Daniel Andrews",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }
];


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

    useEffect(() => {
      axios
        .get('/api/days')
        .then((response) => {(setDays(response.data))})
    }, [])

    const listMaker = appointments.map((appointment) => 
    <Appointment key={appointments.id} {...appointments} />
    )

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
    days={state.days}
    day={state.day}
    setDay={setDay}
  />    
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {listMaker}
        <Appointment key={"last"} time="4pm" />
      </section>
    </main>
  );
}
