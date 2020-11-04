import updateEmptySpots from "helpers/updateSpots";

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const BOOK_INTERVIEW = "BOOK_INTERVIEW";
export const CANCEL_INTERVIEW = "CANCEL_INTERVIEW";


export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { 
        ...state,
        day: action.day
       }
    case SET_APPLICATION_DATA:
      return { 
        ...state,
        days: action.days, 
        appointments: action.appointments,
        interviewers: action.interviewers
       }
    case BOOK_INTERVIEW:
       
      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };

      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      } 

      const newStatedata = {
        ...state,
        appointments
      }

      const updatedDays = updateEmptySpots(newStatedata, action.id)

      return {
        ...state,
        appointments,
        days: updatedDays
      }
    
    case CANCEL_INTERVIEW:

      const deletedAppt = {
        ...state.appointments[action.id],
        interview: null,
      }

      const deletedAppts = {
        ...state.appointments,
        [action.id]: deletedAppt
      }

      const upToDateState = {
        ...state,
        appointments: deletedAppts
      }

      const newDays = updateEmptySpots(upToDateState, action.id)
      
      return {
        ...state,
        appointments: deletedAppts,
        days: newDays
      }
  
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
