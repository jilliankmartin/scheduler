export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((oneDay) => { 
    return oneDay.name === day
    })

  if (filteredDays.length === 0) {
    return [];
  }
  const relevantAppts = filteredDays[0].appointments.map((appt) => {
    return state.appointments[appt]
  })

  return relevantAppts;
}