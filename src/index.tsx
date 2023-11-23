import 'expo-dev-client';
import { GameProvider } from './contexts';
import Route from './screens';
import { ChatProvider } from './contexts/chat';

const App = () => {
    return (
        <GameProvider>
            <ChatProvider>
                <Route />
            </ChatProvider>
        </GameProvider>
    );
};

export default App;
