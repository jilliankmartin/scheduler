import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const listMaker = props.days.map((day) => 

    <DayListItem 
      key={day.id} 
      name={day.name} 
      spots={day.spots}
      full={day.spots === 0}
      selected={props.day === day.name} 
      setDay={() => props.setDay(day.name)} />
  )
  return (
    <ul>
      {listMaker}
    </ul>
  )
};

