import React from "react";
import "components/DayListItem.scss";
const classnames = require('classnames');

export default function DayListItem(props) {

  const formatSpots = function(spots) {
    if (!spots) {
      return "no spots remaining"
    }
    if (spots === 1) {
      return spots + " spot remaining"
    }
    return spots + " spots remaining"
    
  };

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}