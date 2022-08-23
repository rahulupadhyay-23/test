import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParams } from '../../App';

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [numOfLots, setNumOfLots] = useState<string>('')  

  const handleCreateLots = () => {
    if(numOfLots){
      navigation.navigate('Booking', {numOfLots: numOfLots});
    }else{
      Alert.alert('Enter lot number!')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
       placeholder='Enter number of Lots'
       style={styles.inputStyle}
       value={numOfLots}
       onChangeText={(text)=>setNumOfLots(text)}
      />
      <View>
        <Button
          title="Create Lots"
          onPress={handleCreateLots}
          color="blue"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputStyle:{
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
    marginBottom: 20
   }
});

export default Home;