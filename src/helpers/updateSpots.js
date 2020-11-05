
  //Fetches a number of open spots for the day and returns a new days object to use to update state
  export default function updateEmptySpots(state, id) {
    const openSpotCount = countSpots(state, id);
    const days = [...state.days];
    for (const key in days) {
      if (days[key].appointments.includes(id)) {
        const day = {...days[key], spots: openSpotCount};
        days[key] = day;
      }
    }
    return days;
  };

  //returns a count of the number of open spots in the appointments for the relevant day
  const countSpots = function(state, id) {
    const appointments = state.appointments
    const days = state.days
    let count = 0;
      for (let i = 0; i < days.length; i++) {
        if (days[i].appointments.includes(id)) {
          for (let key in days[i].appointments) 
            if (appointments[days[i].appointments[key]].interview === null) {
              count += 1;
            }
        }
      }
    return count;
  };


