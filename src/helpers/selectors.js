

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
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerID = interview.interviewer;
  const finalObj = {
  ...interview,
  interviewer: {...state.interviewers[interviewerID]}
}
return finalObj

};


export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((oneDay) => { 
    return oneDay.name === day
    })

  if (filteredDays.length === 0) {
    return [];
  }
  const relevantInterviewers = filteredDays[0].interviewers.map((oneInterviewer) => {
    return state.interviewers[oneInterviewer]
  })
  return relevantInterviewers;
  
};


