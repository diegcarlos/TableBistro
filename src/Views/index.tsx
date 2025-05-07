import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import kioskmode from 'rtn-kioskmode/js/NativeKioskmode';
import {AuthProvider} from '../context/AuthContext';
import {CartProvider} from '../context/CartContext';
import AdminScreen from './Admin/indext';
import {LoginScreen} from './LoginScreen';
import {NumericKeyboard} from './NumericKeyboard';
import Products from './Products';
import {RestScreen} from './RestScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  InsertTable: undefined;
  Products: undefined;
  Admin: undefined;
  Splash: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={RestScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="InsertTable" component={NumericKeyboard} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Admin" component={AdminScreen} />
        </Stack.Navigator>
      </CartProvider>
    </AuthProvider>
  );
}

export default function App() {
  useEffect(() => {
    kioskmode.checkPermissions();
    kioskmode.startKioskMode();
    SystemNavigationBar.navigationHide();
    SystemNavigationBar.setNavigationColor('transparent', 'dark');
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}>
      <View
        style={{
          flex: 1,
        }}>
        <NavigationContainer>
          <StatusBar hidden={true} translucent={true} />
          <RootStack />
        </NavigationContainer>
      </View>
    </KeyboardAvoidingView>
  );
}
