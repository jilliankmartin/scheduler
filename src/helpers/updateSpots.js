
//takes in a number of open spots for the day and returns a new days object to use to update state
export default function updateEmptySpots(state, id) {
  const openSpotCount = countSpots(state);
  const days = [...state.days]
  for (const key in days) {
    if (days[key].appointments.includes(id)) {
      const day = {...days[key], spots: openSpotCount}
      days[key] = day
    }
  }
  return days;
}
  
  //returns the correct index to start counting appointments at given the day supplied in the state
  const getKeyForDay = function(day) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const indexes = [1, 6, 11, 16, 21]
    for (let i = 0; i < days.length; i++) {
      if (day === days[i]) {
        return indexes[i]
      }
    }
  }
  
  //return a count of the number of open spots in the appointments for the relevant day
  const countSpots = function(state) {
    const appointments = state.appointments
    const index = getKeyForDay(state.day)
    let count = 0;
      for (let item in appointments) {
        for (let i = index; i < index + 5; i++) {
          // eslint-disable-next-line
            if (item == i && !appointments[item].interview) {
              count += 1;
            }
        }
      }
    return count;
  }


