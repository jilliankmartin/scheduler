import React, { Fragment } from 'react'
import './styles.scss';
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

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

  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && 
          <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer} />
        )}
        {mode === CREATE && 
          <Form interviewers={[]} onSave={() => {console.log("save")}} onCancel={back}/>
        }
    </article>
  )
}
