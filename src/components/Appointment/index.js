import React, { Fragment } from 'react'
import './styles.scss';
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

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
    .catch((err) => console.log("error - promise failed"))
    
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && 
          <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer} />
        )}
        {mode === CREATE && 
          <Form interviewers={props.interviewers} onSave={save} onCancel={back}/>
        }
        {mode === SAVING && 
          <Status message="Saving"/>
        }
    </article>
  )
}
