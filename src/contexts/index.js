import React, { createContext, useState, useEffect, useCallback } from "react";
import Toast from "react-native-simple-toast";
import { Platform } from "react-native";

// Define the context
const GameContext = createContext();

// Data Provider component
const GameProvider = ({ children }) => {
  const [selectedMode, setSelectedMode] = useState("");
  const [timer, setTimer] = useState(5);


  useEffect(() => {
    console.log("game context changed --------------------------");
  });

  return (
    <GameContext.Provider
      value={{
        selectedMode,
        timer,
        setSelectedMode,
        setTimer
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };