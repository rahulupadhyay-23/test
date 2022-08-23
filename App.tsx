import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home'
import Booking from './src/screens/Booking';

export type RootStackParams = {
  Home: any;
  Booking: {
    numOfLots: string
  };
}

const RootStack = createNativeStackNavigator<RootStackParams>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator  initialRouteName='Home'>
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Booking" component={Booking} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
