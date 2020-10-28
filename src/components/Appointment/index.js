import React, { Fragment } from 'react'
import './styles.scss';
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";

export default function Appointment(props) {

  const showOrEmpty = function() {
    let code = props.interview ? 
    <Show student={props.interview.student} interviewer={props.interview.interviewer}/> 
    : 
    <Empty onAdd={props.onAdd}/>
    return code;
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {showOrEmpty()}
    </article>
  )
}