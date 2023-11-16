import { DarkTheme, NavigationContainer, Theme } from '@react-navigation/native';
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { DripsyProvider, makeTheme } from 'dripsy';

import Game from './screens/Game';
import Home from './screens/Home';
import 'expo-dev-client';
import Lobby from './screens/Lobby';
import CreateLobby from './screens/CreateLobby';
import InsideLobby from './screens/InsideLobby';
import { GameProvider } from './contexts';
import More from './screens/More';
import Stats from './screens/Stats';
import Profile from './screens/Profile';
import Sound from './screens/Sound';
import Personalization from './screens/Presonalization';

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
    headerTitleStyle: {
        // fontFamily: 'Verdana',
        fontWeight: '600',
    },
    headerStyle: {
        backgroundColor: '#262522',
    },
};

const theme = makeTheme({});

const App = () => {
    return (
        <DripsyProvider theme={theme}>
            <GameProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={screenOptions}>
                        <Stack.Screen
                            name='Home'
                            component={Home}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Game'
                            component={Game}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Lobby'
                            component={Lobby}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='CreateLobby'
                            component={CreateLobby}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='InsideLobby'
                            component={InsideLobby}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='More'
                            component={More}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Sound'
                            component={Sound}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Profile'
                            component={Profile}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Stats'
                            component={Stats}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Personalization'
                            component={Personalization}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </GameProvider>
        </DripsyProvider>
    );
};

export default App;
