import { DarkTheme, NavigationContainer, Theme } from '@react-navigation/native';
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { DripsyProvider, makeTheme } from 'dripsy';

import Game from './screens/Game';
import Home from './screens/Home';
import PvP from './screens/PvP';
import PvAi from './screens/PvAi';
import "expo-dev-client";
import Lobby from './screens/Lobby';
import CreateLobby from './screens/CreateLobby';
import InsideLobby from './screens/InsideLobby';

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
            <NavigationContainer>
                <Stack.Navigator screenOptions={screenOptions}>
                    <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name='Game' component={Game} options={{ headerShown: false }}/>
                    <Stack.Screen name='PvP' component={PvP} options={{ headerShown: false }}/>
                    <Stack.Screen name='PvAi' component={PvAi} options={{ headerShown: false }}/>
                    <Stack.Screen name='Lobby' component={Lobby} options={{ headerShown: false }}/>
                    <Stack.Screen name='CreateLobby' component={CreateLobby} options={{ headerShown: false }}/>
                    <Stack.Screen name='InsideLobby' component={InsideLobby} options={{ headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </DripsyProvider>
    );
};

export default App;
