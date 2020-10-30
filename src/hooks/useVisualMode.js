import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
  
    setHistory((current) => {
      if (replace) {
        current.pop()
      }
      return [...current, newMode]
    }) //add the current mode to the history array
    // history.push(newMode);
    setMode(newMode); 
  }

  function back() {
    if (history.length !== 1) {
      console.log("History: ", history)
    // setMode(history.pop())
    // setMode((prev) => {console.log("Prev: ",prev, "mode: ", mode); return prev[prev.length - 3]})
    
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
