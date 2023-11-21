import 'expo-dev-client';
import { GameProvider } from './contexts';
import Route from './screens';

const App = () => {
    return (
        <GameProvider>
            <Route />
        </GameProvider>
    );
};

export default App;
