import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {AppRegistry, KeyboardAvoidingView, Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {name as appName} from './app.json';
import Views from './src/Views';
const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#181818'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <QueryClientProvider client={queryClient}>
          <Views />
        </QueryClientProvider>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => App);

export default App;
