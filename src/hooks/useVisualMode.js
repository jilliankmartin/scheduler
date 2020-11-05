import { useState } from "react";

//handles transition between each of the different appointment components, as well as storing the history of transitions
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
  
    setHistory((current) => {
      if (replace) {
        current.pop();
      }
      return [...current, newMode];
    })
    setMode(newMode); 
  }

  function back() {
      if (history.length !== 1) {
        setMode(history[history.length - 2]); 
        setHistory((current) => {
        let currentSliced = current.slice(0, -1)
        return [...currentSliced];
      });
    }
  };
  return { mode, transition, back };
};
