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
  const [slots, setSlots] = useState<any[]>([]);
  const [carId, setCarId] = useState<string | null>(null);


  useEffect(() => {
    const arr = new Array(Number(numOfLots)).fill(null);
    setSlots(arr);

  }, [])

  function search() {
    for (var i = 0; i < slots.length; i++) {
      if (slots[i] !== null) {
        if (slots !== null && slots[i].carId === carId) {
          return true;
        }
      }
    }

    return false
  }

  function isCarPresent(random: number) {
    if (search()) {
      Alert.alert("Car id is already present.");
    }
    else {

      var obj: { carId: string | null; EntryTime: number | string } = {
        carId: '',
        EntryTime: ''
      };

      const slotsCopy = [...slots];
      obj.carId = carId;
      obj.EntryTime = Date.now();
      //slotsCopy[random] = carId;
      slotsCopy[random] = obj;
      setSlots(slotsCopy)
      //Alert.alert("No, the value is absent.");
      //return random;
    }
  }

  function generateRandomNum() {
    let random = Math.floor(Math.random() * 5);

    if (slots[random] !== null) {
      console.log(random);
      generateRandomNum();
    } else {
      isCarPresent(random);
    }
  }


  const Park = () => {

    setCarId('')

    if(!carId){
     return Alert.alert('Enter carId')
    }


    if (slots.every((slot) => slot !== null)) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Parking Full', ToastAndroid.SHORT);
        return true
      } else {
        Alert.alert('Parking Full');
        return true
      }
    }
     generateRandomNum();
  }



  function convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    // 👇️ if seconds are greater than 30, round minutes up (optional)
    hours = minutes >= 0 ? hours + 1 : hours;

    return hours;

  }

  const RemovePark = (index) => {

    let exitTime = Date.now();

    let EntryTime = slots[index].EntryTime;

    let diffMs = exitTime - EntryTime

    let hours = convertMsToHM(15335000);

    let extraHour = hours - 2;

    if (hours <= 2) {
      Alert.alert(`for ${hours} hours you charged $${10}`)
    } else {
      Alert.alert(`for ${hours} hours you charged $${10 + extraHour * 10}`)
    }



    // console.log(convertMsToHM(54000000)); // 👉️ 15:00 (15 hours)
    // console.log(convertMsToHM(86400000)); // 👉️ 00:00 (24 hours)
    //convertMsToHM(36900000); // 👉️ 10:15 (10 hours, 15 minutes)
    // console.log(convertMsToHM(15335000)); // 👉️ 04:16 (4 hours, 15 minutes, 35 seconds)
    // console.log(convertMsToHM(130531000)); // 👉️ 36:16 (36 hours 15 minutes 31 seconds)

    const slotsCopy = [...slots];
    slotsCopy[index] = null;
    setSlots(slotsCopy);
  }

  return (

    <View style={styles.container}>

      <View>
        <TextInput
          placeholder='Enter CarId'
          style={{ height: 40, borderWidth: 1, borderColor: 'red' }}
          value={carId}
          onChangeText={(id) => setCarId(id)}
        />
        <Button
          title="Book Parking"
          onPress={() => Park()}
          color="blue"
        />
      </View>


      <View>

        {slots.map((slot, index) => {
          return (
            <View key={index}>
              <View style={[styles.slotItem, { backgroundColor: slot !== null ? 'red' : 'green', marginBottom: slot !== null ? 0 : 10 }]}>
                <Text>Slot - CarId {slot !== null ? <Text>{slot.carId}</Text> : null}</Text>
              </View>

              {slot !== null ?
                <Button
                  title={`Remove`}
                  onPress={() => RemovePark(index)}
                  color="blue"
                />
                :
                null
              }
            </View>
          )
        })}





      </View>

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