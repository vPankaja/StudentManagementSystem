import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import { db } from "../../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function AddClassSchedule() {
  const [data, setData] = useState("");
  const [Venue, setVenue] = useState("");
  const [Module, setModule] = useState("");
  const [Lecturer, setLecturer] = useState("");
  const navigation = useNavigation();
  const DatCollectinRef = collection(db, "Class Schedule"); //database collection reference
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const backgroundImage = require("../../../assets/B_Image.jpg"); // specify the path to your image file

  //create user function,include firebase methods
  const handleSubmit = async () => {
    if (selectedDay.trim() === "") {
      // If the day is not selected, show an error message
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Day cant be empty !",
      });
      return;
    }

    if (selectedTime.trim() === "") {
      // If the time slot is not selected, show an error message
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Time cant be empty !",
      });
      return;
    }

    if (Module.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Module cant be empty !",
      });
      return;
    }

    if (Venue.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Venue cant be empty !",
      });
      return;
    }

    if (Lecturer.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Lecturer cant be empty !",
      });
      return;
    }

    // Check if the selected time slot has already been selected for the given day
    if (selectedTime.trim() !== "" && selectedDay !== "") {
      const snapshot = await getDocs(
        query(
          DatCollectinRef,
          where("selectedDay", "==", selectedDay),
          where("selectedTime", "==", selectedTime)
        )
      );
      if (snapshot.docs.length !== 0) {
        // If the selected time slot has already been selected for the given day, show an error message
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `A class has already been scheduled for ${selectedDay} at ${selectedTime}.`,
        });
        return;
      }
    }

    await addDoc(DatCollectinRef, {
      selectedDay,
      selectedTime,
      Venue,
      Module,
      Lecturer,
    });
    if (addDoc) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Class Schedule Successfully submitted!",
      }); //application toast message
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error adding Class Schedule !",
      });
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text
          style={{
            color: "yellow",
            fontWeight: "bold",
            fontSize: 30,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Add Class Schedule
        </Text>
        <View
          style={{
            margin: 5,
            borderBottomWidth: 1,
            borderColor: "#BDBDBD",
            padding: 10,
          }}
        >
          <Text style={styles.text}>Day</Text>
          <Picker
            style={styles.input}
            selectedValue={selectedDay}
            onValueChange={(itemValue) => setSelectedDay(itemValue)}
          >
            <Picker.Item label="Select a Day" value="" />
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>

          <Text style={styles.text}>Time</Text>
          <Picker
            style={styles.input}
            selectedValue={selectedTime}
            onValueChange={(itemValue) => setSelectedTime(itemValue)}
          >
            <Picker.Item label="Select a Time" value="" />
            <Picker.Item
              label="8.30 AM - 10.30 AM"
              value="8.30 AM - 10.30 AM"
            />
            <Picker.Item
              label="10.30 AM - 12.30 AM"
              value="10.30 AM - 12.30 AM"
            />
            <Picker.Item label="1.00 PM - 3.00 PM" value="1.00 PM - 3.00 PM" />
            <Picker.Item label="3.00 PM - 5.00 PM" value="3.00 PM - 5.00 PM" />
            <Picker.Item label="5.00 PM - 7.00 PM" value="5.00 PM - 7.00 PM" />
          </Picker>

          <Text style={styles.text}>Venue</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the Venue"
            onChangeText={(text) => setVenue(text)}
          />

          <Text style={styles.text}>Module</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the Module"
            onChangeText={(text) => setModule(text)}
          />

          <Text style={styles.text}>Lecturer</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the Lecturer's name"
            onChangeText={(text) => setLecturer(text)}
          />
          <br />
          <Button
            style={styles.btn1}
            title="Add Class"
            onPress={() => handleSubmit()}
          />
          <br />
          <Button
            title="Schedule List"
            onPress={() => navigation.navigate("Schedule List")}
          />
        </View>
      </View>
      <Toast />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  btn1: {
    height: 40,
    width: 150,
  },
  text: {
    fontWeight: "bold",
    color: "yellow",
    borderColor: "white",
  },
  input: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover", // stretch the image to cover the entire screen
    tintColor: "white",
  },
});
