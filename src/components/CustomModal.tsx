import React, { FC, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button, TextInput } from "react-native";

interface CustomModalProps {
  visible: boolean;
  regNumber: string;
  setVisible: (visible: boolean) => void;
  setRegNumber: (regNumber: string) => void;
  Park: ()=>void;
}



const CustomModal: FC<CustomModalProps> = ({ visible, setVisible, regNumber, setRegNumber ,Park}) => {

  const isValid = () => {
    if(regNumber.trim() == ''){
      Alert.alert('Enter Reg. Number');
      return false;
    }else{
      return Park()
    }
  }
  
  const handlePress = () => {

    if(!regNumber){
      Alert.alert("Enter car registration number")
    }else{
      Park(),
      setRegNumber(''),
      setVisible(false)
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <TextInput
              placeholder='Registration Number'
              style={{
                height: 40,
                borderBottomWidth: 1,
                borderBottomColor: '#707070',
                marginBottom: 20
              }}
              value={regNumber}
             onChangeText={(text)=>setRegNumber(text)}
            />
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {handlePress()}}
          >
            <Text style={styles.textStyle}>Booking</Text>
          </Pressable>
        </View>
      </View>
    </Modal>


  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
export default CustomModal;
