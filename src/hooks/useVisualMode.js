import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop()
    }
    setHistory((current) => {
      return [...current, newMode]
    }) //add the current mode to the history array
    // history.push(newMode);
    setMode(newMode); 
  }

  function back() {
    if (history.length !== 1) {
    // setMode(history.pop())

    setMode(history[history.length - 2]); 
    // let slicedHistory = history.slice(0, -1)
    setHistory((current) => {
      let currentSliced = current.slice(0, -1)
      return [...currentSliced]
    })
    // setHistory([...slicedHistory]) 
    }
  }

  return { mode, transition, back };
}
