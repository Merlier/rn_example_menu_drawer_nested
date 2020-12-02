/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();

function HomeScreen() {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={signOut} title="Sign Out" />
      <Text>Home Screen</Text>
    </View>
  );
}

function AuthScreen() {
  const {signIn} = React.useContext(AuthContext);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={signIn} title="Sign In" />
      <Text>Auth Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        try {
          await AsyncStorage.setItem('token', '1');
          setIsSignedIn(true);
        } catch (e) {
          // saving error
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('token');
          setIsSignedIn(false);
        } catch (e) {
          // saving error
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {isSignedIn ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Auth" component={AuthScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
