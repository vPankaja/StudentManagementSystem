import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
} from "react-native";
import Toast from "react-native-toast-message";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export default function UpdateSchedule({ route }) {
  const { item } = route.params;
  const DatCollectinRef = collection(db, "Class Schedule"); //database collection reference
  const id = item.id;
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const initialState = {
    selectedDay: "",
    selectedTime: "",
    Venue: "",
    Module: "",
    Lecturer: "",
  };

  useEffect(() => {
    const UpdateSchedule = async () => {
      try {
        const docRef = await getDoc(doc(db, "Class Schedule", id));
        // console.log("Document update data:", docRef.data());
        setData({ ...docRef.data(), id: docRef.id });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    UpdateSchedule();
  }, []);

  const handleChangeText = (name, value) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (data.selectedDay.trim() === "") {
        // If the day is not selected, show an error message
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Day cant be empty !",
        });
        return;
      }

      if (data.selectedTime.trim() === "") {
        // If the time slot is not selected, show an error message
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Time cant be empty !",
        });
        return;
      }

      if (data.Module.trim() === "") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Module cant be empty !",
        });
        return;
      }

      if (data.Venue.trim() === "") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Venue cant be empty !",
        });
        return;
      }

      if (data.Lecturer.trim() === "") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Lecturer cant be empty !",
        });
        return;
      }

      // Check if the selected time slot has already been selected for the given day
      if (data.selectedTime.trim() !== "" && data.selectedDay !== "") {
        const snapshot = await getDocs(
          query(
            DatCollectinRef,
            where("selectedDay", "==", data.selectedDay),
            where("selectedTime", "==", data.selectedTime)
          )
        );
        if (snapshot.docs.length !== 0) {
          // If the selected time slot has already been selected for the given day, show an error message
          Toast.show({
            type: "error",
            text1: "Error",
            text2: `A class has already been scheduled for ${data.selectedDay} at ${data.selectedTime}.`,
          });
          return;
        }
      }

      await updateDoc(doc(db, "Class Schedule", id), {
        selectedDay: data.selectedDay,
        selectedTime: data.selectedTime,
        Venue: data.Venue,
        Module: data.Module,
        Lecturer: data.Lecturer,
      });
      if (updateDoc) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Class Schedule Updated Successfully!",
        });
        navigation.navigate("Schedule List");
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An Error occurred while updating the class schedule!",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 30,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        Update Class Schedule
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
          selectedValue={data.selectedDay}
          onValueChange={(val) => handleChangeText("selectedDay", val)}
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
          selectedValue={data.selectedTime}
          onValueChange={(val) => handleChangeText("selectedTime", val)}
        >
          <Picker.Item label="Select a Time" value="" />
          <Picker.Item label="8.30 AM - 10.30 AM" value="8.30 AM - 10.30 AM" />
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
          value={data.Venue}
          onChangeText={(val) => handleChangeText("Venue", val)}
        />

        <Text style={styles.text}>Module</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Module"
          value={data.Module}
          onChangeText={(val) => handleChangeText("Module", val)}
        />

        <Text style={styles.text}>Lecturer</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the lecturer's name"
          value={data.Lecturer}
          onChangeText={(val) => handleChangeText("Lecturer", val)}
        />
        <br />
        <Button
          style={styles.btn1}
          title="Update"
          onPress={() => handleSubmit()}
        />
      </View>
    </View>
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
    color: "black",
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
