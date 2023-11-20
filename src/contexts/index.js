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
  const [color, setColor] = useState("b");
  const [matchId, setMatchId] = useState("matchId");
  const [prevInstance, setPrevInstance] = useState(null);
  let ws = useRef(
    new WebSocket(
        'ws://139.59.94.85:3000/ws/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDM0ODI3MTcsImp0aSI6IjY1NTlhYWFkNzdmYTBmNjA0MDE5YjUwNSJ9.gxJZi_J0gryXCQzF6oRUT-nep6nsSrofZtweoT-M4qk'
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
        matchId,
        prevInstance,
        setSelectedMode,
        setTimer,
        submitMessage,
        setColor,
        setMatchId,
        setPrevInstance
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };