import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useRef } from 'react';
import Toast from 'react-native-simple-toast';
import { Platform } from 'react-native';

// Define the context
const ChatContext = createContext();

// Data Provider component
const ChatProvider = ({ children }) => {
    const [chatMessages, setChatMessages] = useState([]);


    return (
        <ChatContext.Provider
            value={{
                chatMessages,
                setChatMessages
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatProvider };
