import React from 'react';
import {AppRegistry, KeyboardAvoidingView, Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Views from './src/Views';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#181818'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <Views />
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent('TableBistro', () => App);

export default App;
