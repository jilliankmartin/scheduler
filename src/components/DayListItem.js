import React from "react";
import "components/DayListItem.scss";
const classnames = require('classnames');

export default function DayListItem({ spots, selected, full, name, setDay }) {

  const formatSpots = () => {
    if (spots === 1) {
      return "1 spot remaining";
    }
    let spotsRemainingMessage = spots ? spots + " spots remaining" : "no spots remaining";
    return spotsRemainingMessage}
  

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": full,
  });

  return (
    <li onClick={setDay} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}