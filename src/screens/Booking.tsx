import { NativeStackNavigatorProps, NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { FC, useEffect, useState } from 'react';
import {
  Button, StyleSheet, Text, TextInput, View, Alert, ScrollView, TouchableOpacity, ToastAndroid,
  Platform
} from 'react-native';
import { RootStackParams } from '../../App';
import CustomModal from '../components/CustomModal';

type Props = NativeStackScreenProps<RootStackParams, 'Booking'>;

const Booking: FC<Props> = ({ route }) => {
  const { numOfLots } = route.params;
  const [visible, setVisible] = useState(false);
  const [slots, setSlots] = useState<{ carId: string, entry: number | null, exit: number | null }[]>([]);
  const [regNumber, setRegNumber] = useState<string>('');

  useEffect(() => {
    const arr = new Array(Number(numOfLots)).fill(null);
    setSlots(arr)
  }, [])

  function isCarAlreadyPresent(){
   
      for(let i = 0; i <= slots.length; i++){
        if(slots[i] !== null){
          if(slots[i].carId == regNumber){
            return true
          }else{
            return false
          }
        }else{
          return false
        }
      }

  

  }

  const Park = () => {
    

    if (slots.every((slot) => slot !== null)) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Parking Full', ToastAndroid.SHORT)
      } else {
        Alert.alert('Parking Full');
      }
    }

    if(isCarAlreadyPresent()){
      Alert.alert('Duplicate registraion number not allowed')
    }else{
      let x  = Math.floor((Math.random() * 5));
      console.log(x)
  
      const obj: { carId: string, entry: number | null, exit: number | null } = {
        carId: '',
        entry: null,
        exit: null
      }
  
      if(slots[x] === null){
        obj.carId = regNumber;
        obj.entry = Date.now();
        obj.exit = null;
        slots[x] = obj;
        return true
      }else{
        Alert.alert("Try Again")
      }
     }   
  }

  function addHours(numOfHours: number, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
  }

  const RemovePark = (car: string) => {

    console.log(slots)
   
    let arr: any[] = [...slots];

    for (let i = 0; i <= arr.length; i++) {

      if(arr[i] !== null){
        if (arr[i].carId === car) {
          const result: any = addHours(10);
          let hours = Math.abs(arr[i].entry - result);
          var diffHrs = Math.floor((hours % 86400000) / 3600000); // hours
  
          if (diffHrs <= 2) {
            Alert.alert(
              "Exit Parking",
              "",
              [
                {
                  text: "NO",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "YES", onPress: () => {
                    arr[i] = null,
                      setSlots(arr),
                      Alert.alert(`You have charge $10 for ${diffHrs} hours `)
                  }
                }
              ]
            );
          } else {
            let extraHour = diffHrs - 2
            Alert.alert(
              "Exit Parking",
              "",
              [
                {
                  text: "NO",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "YES", onPress: () => {
                    arr[i] = null,
                      setSlots(arr),
                      Alert.alert(`You have charge $${10 + extraHour * 10} for ${diffHrs} hours `)
                  }
                }
              ]
            );
          }
          return true;
        }
      }


     
    }
  }

  const getAvailable = () => {
    const availableSlots = slots.filter((s) => s === null).length;
    console.log(`Available parking slots: ${availableSlots}`);
    return availableSlots;
  }

  const getSlots = () => {
    console.log(`Parking slots: ${JSON.stringify(slots)}`);
    return slots;
  }

  const isFull = () => {
    return getAvailable() === 0;
  }

  return (

    <View style={styles.container}>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        regNumber={regNumber}
        setRegNumber={setRegNumber}
        Park={Park}
      />
      <View>
        <Button
          title="Book Parking"
          onPress={() => setVisible(!visible)}
          color="blue"
        />
      </View>

      {slots.map((slot, index) => {
        return (
          <View key={index}>
            <View style={[styles.slotItem, { backgroundColor: slot ? 'red' : 'green', marginBottom: slot ? 0 : 10 }]}>
              <Text>Park {index + 1}  {slot ? `Car Id ${slot.carId}` : null}</Text>
            </View>

            {slot !== null ?
              <Button
                title={`Exit ${slot.carId}`}
                onPress={() => RemovePark(slot.carId)}
                color="blue"
              />
              :
              null
            }
          </View>
        )
      })}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slotItem: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Booking;