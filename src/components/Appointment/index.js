import React from 'react'
import './styles.scss';
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDITING = "EDITING"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // const showOrEmpty = function() {
  //   let code = props.interview ? 
  //   <Show student={props.interview.student} interviewer={props.interview.interviewer}/> 
  //   : 
  //   <Empty onAdd={props.onAdd}/>
  //   return code;
  // }

  function deleting() {
    transition(DELETING, true)
    props.onDelete(props.id)
      .then((res) => {
        transition(EMPTY)
      })
      .catch((err) => {transition(ERROR_DELETE, true)})
  }

  function confirm() {
    transition(CONFIRM);
  }

  function edit() {
    transition(EDITING);
  }

  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)

    props.onSave(props.id, interview)
    .then((res) => {
      console.log("Promise resolved - res: ", res)
      transition(SHOW)
    })
    .catch((err) => {transition(ERROR_SAVE, true)})
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && 
          <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={confirm}
            onEdit={edit} />
        )}
        {mode === CREATE && 
          <Form 
          interviewers={props.interviewers} 
          onSave={save} 
          onCancel={back}/>
        }
        {mode === SAVING && 
          <Status message="Saving"/>
        }
        {mode === DELETING && 
          <Status message="Deleting"/>
        }
        {mode === CONFIRM && 
          <Confirm onClick={back} onConfirm={deleting}/>
        }
        {mode === EDITING && 
          <Form 
          name={props.interview.student} 
          interviewer={props.interview.interviewer.id} 
          interviewers={props.interviewers} 
          onSave={save} 
          onCancel={back}/>
        }
        {mode === ERROR_SAVE && 
          <Error 
          message="We couldn't save your appointment" 
          onClose={back}/>
        }
        {mode === ERROR_DELETE && 
          <Error 
          message="We couldn't delete your appointment" 
          onClose={back}/>
        }
    </article>
  )
}
