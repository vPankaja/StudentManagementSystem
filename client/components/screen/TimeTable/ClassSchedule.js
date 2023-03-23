import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";

export default function AddClassSchedule() {
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const DatCollectinRef = collection(db, "Class Schedule"); //database collection reference

  //inputs handle function
  const handleChangeText = (name, value) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  //create user function,include firebase methods
  const add_data = async () => {
    try {
      await addDoc(DatCollectinRef, {
        day: data.day,
        time: data.time,
        venue: data.venue,
        subject: data.subject,
      });
      if (addDoc) {
        ToastAndroid.show(
          "Class Schedule Successfully submited!",
          ToastAndroid.SHORT
        ); //application toast message
      }
    } catch (e) {
      //error handling
      console.error("Error adding document: ", e);
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Class Schedule</Text>
      <View
        style={{
          margin: 5,
          borderBottomWidth: 1,
          borderColor: "#BDBDBD",
          padding: 10,
        }}
      >
        <Text style={styles.text}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Date"
          onChangeText={(val) => handleChangeText("day", val)}
        />

        <Text style={styles.text}>Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Time"
          onChangeText={(val) => handleChangeText("time", val)}
        />

        <Text style={styles.text}>Venue</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Venue"
          onChangeText={(val) => handleChangeText("venue", val)}
        />

        <Text style={styles.text}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Subject"
          onChangeText={(val) => handleChangeText("subject", val)}
        />
        <br />
        <Button title="Add Class" onPress={() => add_data()} />
        <br />
        <Button
          title="Schedule List"
          onPress={() => navigation.navigate("Schedule List")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
