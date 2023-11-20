import React, { createContext, useState, useEffect, useCallback } from "react";
import { useRef } from "react";
import Toast from "react-native-simple-toast";
import { Platform } from "react-native";

// Define the context
const GameContext = createContext();

// Data Provider component
const GameProvider = ({ children }) => {
  const [selectedMode, setSelectedMode] = useState("");
  const [timer, setTimer] = useState(5);
  const [color, setColor] = useState("w");
  let ws = useRef(
    new WebSocket(
        'ws://139.59.94.85:3000/ws/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDM0MDg5OTQsImp0aSI6IjY1NTlhYWFkNzdmYTBmNjA0MDE5YjUwNSJ9.C9dmFlRLkfFpjfEDwYKUaaVtyb7VcovIwtlcVDN9VO4'
    )
).current;


const submitMessage = useCallback((message) => {
    ws.send(JSON.stringify(message))
}, []);




  useEffect(() => {
    console.log("game context changed --------------------------");
  });

  return (
    <GameContext.Provider
      value={{
        selectedMode,
        timer,
        ws,
        color,
        setSelectedMode,
        setTimer,
        submitMessage,
        setColor
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };