import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {LoginScreen} from './LoginScreen';
import {NumericKeyboard} from './NumericKeyboard';
import Products from './Products';
import {RestScreen} from './RestScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Products"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={RestScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="InsertTable" component={NumericKeyboard} />
      <Stack.Screen name="Products" component={Products} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    SystemNavigationBar.navigationHide();
  }, []);

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar hidden={true} translucent={true} />
        <RootStack />
      </NavigationContainer>
    </View>
  );
}
