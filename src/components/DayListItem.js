import React from "react";
import "components/DayListItem.scss";
const classnames = require('classnames');

export default function DayListItem(props) {

  const formatSpots = () => {
    if (props.spots === 1) {
      return "1 spot remaining";
    }
    let spots = props.spots ? props.spots + " spots remaining" : "no spots remaining";
    return spots}
  

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.full,
  });

  return (
    <li onClick={props.setDay} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}