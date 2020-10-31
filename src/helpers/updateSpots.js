
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

// const state = {
//   "day": "Monday",
//   "days": [
//     {
//       "id": 1,
//       "name": "Monday",
//       "appointments": [
//         1,
//         2,
//         3,
//         4,
//         5
//       ],
//       "interviewers": [
//         1,
//         4,
//         6,
//         7,
//         10
//       ],
//       "spots": 3
//     },
//     {
//       "id": 2,
//       "name": "Tuesday",
//       "appointments": [
//         6,
//         7,
//         8,
//         9,
//         10
//       ],
//       "interviewers": [
//         1,
//         5,
//         6,
//         8,
//         9
//       ],
//       "spots": 3
//     },
//     {
//       "id": 3,
//       "name": "Wednesday",
//       "appointments": [
//         11,
//         12,
//         13,
//         14,
//         15
//       ],
//       "interviewers": [
//         1,
//         5,
//         6,
//         7,
//         9
//       ],
//       "spots": 3
//     },
//     {
//       "id": 4,
//       "name": "Thursday",
//       "appointments": [
//         16,
//         17,
//         18,
//         19,
//         20
//       ],
//       "interviewers": [
//         2,
//         4,
//         5,
//         8,
//         10
//       ],
//       "spots": 4
//     },
//     {
//       "id": 5,
//       "name": "Friday",
//       "appointments": [
//         21,
//         22,
//         23,
//         24,
//         25
//       ],
//       "interviewers": [
//         1,
//         4,
//         5,
//         7,
//         9
//       ],
//       "spots": 1
//     }
//   ],
//   "appointments": {
//     "1": {
//       "id": 1,
//       "time": "12pm",
//       "interview": {
//         "student": "Rob",
//         "interviewer": 1
//       }
//     },
//     "2": {
//       "id": 2,
//       "time": "1pm",
//       "interview": null
//     },
//     "3": {
//       "id": 3,
//       "time": "2pm",
//       "interview": {
//         "student": "Archie Cohen",
//         "interviewer": 7
//       }
//     },
//     "4": {
//       "id": 4,
//       "time": "3pm",
//       "interview": null
//     },
//     "5": {
//       "id": 5,
//       "time": "4pm",
//       "interview": null
//     },
//     "6": {
//       "id": 6,
//       "time": "12pm",
//       "interview": null
//     },
//     "7": {
//       "id": 7,
//       "time": "1pm",
//       "interview": {
//         "student": "Chad Takahashi",
//         "interviewer": 9
//       }
//     },
//     "8": {
//       "id": 8,
//       "time": "2pm",
//       "interview": null
//     },
//     "9": {
//       "id": 9,
//       "time": "3pm",
//       "interview": null
//     },
//     "10": {
//       "id": 10,
//       "time": "4pm",
//       "interview": {
//         "student": "Jamal Jordan",
//         "interviewer": 8
//       }
//     },
//     "11": {
//       "id": 11,
//       "time": "12pm",
//       "interview": null
//     },
//     "12": {
//       "id": 12,
//       "time": "1pm",
//       "interview": {
//         "student": "Leopold Silvers",
//         "interviewer": 7
//       }
//     },
//     "13": {
//       "id": 13,
//       "time": "2pm",
//       "interview": {
//         "student": "Liam Martinez",
//         "interviewer": 7
//       }
//     },
//     "14": {
//       "id": 14,
//       "time": "3pm",
//       "interview": null
//     },
//     "15": {
//       "id": 15,
//       "time": "4pm",
//       "interview": null
//     },
//     "16": {
//       "id": 16,
//       "time": "12pm",
//       "interview": null
//     },
//     "17": {
//       "id": 17,
//       "time": "1pm",
//       "interview": null
//     },
//     "18": {
//       "id": 18,
//       "time": "2pm",
//       "interview": null
//     },
//     "19": {
//       "id": 19,
//       "time": "3pm",
//       "interview": null
//     },
//     "20": {
//       "id": 20,
//       "time": "4pm",
//       "interview": {
//         "student": "Lydia Miller-Jones",
//         "interviewer": 4
//       }
//     },
//     "21": {
//       "id": 21,
//       "time": "12pm",
//       "interview": {
//         "student": "Maria Boucher",
//         "interviewer": 7
//       }
//     },
//     "22": {
//       "id": 22,
//       "time": "1pm",
//       "interview": {
//         "student": "Michael Chan-Montoya",
//         "interviewer": 7
//       }
//     },
//     "23": {
//       "id": 23,
//       "time": "2pm",
//       "interview": null
//     },
//     "24": {
//       "id": 24,
//       "time": "3pm",
//       "interview": {
//         "student": "Richard Wong",
//         "interviewer": 5
//       }
//     },
//     "25": {
//       "id": 25,
//       "time": "4pm",
//       "interview": {
//         "student": "Yuko Smith",
//         "interviewer": 5
//       }
//     }
//   },
//   "interviewers": {
//     "1": {
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       "id": 2,
//       "name": "Tori Malcolm",
//       "avatar": "https://i.imgur.com/Nmx0Qxo.png"
//     },
//     "3": {
//       "id": 3,
//       "name": "Mildred Nazir",
//       "avatar": "https://i.imgur.com/T2WwVfS.png"
//     },
//     "4": {
//       "id": 4,
//       "name": "Cohana Roy",
//       "avatar": "https://i.imgur.com/FK8V841.jpg"
//     },
//     "5": {
//       "id": 5,
//       "name": "Sven Jones",
//       "avatar": "https://i.imgur.com/twYrpay.jpg"
//     },
//     "6": {
//       "id": 6,
//       "name": "Susan Reynolds",
//       "avatar": "https://i.imgur.com/TdOAdde.jpg"
//     },
//     "7": {
//       "id": 7,
//       "name": "Alec Quon",
//       "avatar": "https://i.imgur.com/3tVgsra.jpg"
//     },
//     "8": {
//       "id": 8,
//       "name": "Viktor Jain",
//       "avatar": "https://i.imgur.com/iHq8K8Z.jpg"
//     },
//     "9": {
//       "id": 9,
//       "name": "Lindsay Chu",
//       "avatar": "https://i.imgur.com/nPywAp1.jpg"
//     },
//     "10": {
//       "id": 10,
//       "name": "Samantha Stanic",
//       "avatar": "https://i.imgur.com/okB9WKC.jpg"
//     }
//   }
// }

  
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


