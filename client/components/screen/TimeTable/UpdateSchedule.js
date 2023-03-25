import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function UpdateSchedule({ route }) {
  const { item } = route.params;
  const id = item.id;
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const initialState = {
    day: "",
    time: "",
    venue: "",
    module: "",
    lecturer: "",
  };

  useEffect(() => {
    const updatemember = async () => {
      try {
        const docRef = await getDoc(doc(db, "Notice", id));
        // console.log("Document update data:", docRef.data());
        setData({ ...docRef.data(), id: docRef.id });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    updatemember();
  }, []);

  const handleChangeText = (name, value) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const UpdateSchedule = async () => {
    try {
      await updateDoc(doc(db, "Class Schedule", id), {
        day: data.day,
        time: data.time,
        venue: data.venue,
        module: data.module,
        lecturer: data.lecturer,
      });
      if (updateDoc) {
        ToastAndroid.show(
          "Class Schedule Updated Successfully!",
          ToastAndroid.SHORT
        );
        navigation.navigate("Schedule List");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    }
  };

  return (
    <View style={{ flex: 1, top: 20 }}>
      <Text
        style={{
          color: "#0D0140",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: 30,
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
          onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
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
          onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}
        >
          <Picker.Item label="Select a Time" value="" />
          <Picker.Item label="8.30 AM - 10.30 AM" value="8.30 AM - 10.30 AM" />
          <Picker.Item label="9.30 AM - 11.30 AM" value="9.30 AM - 11.30 AM" />
          <Picker.Item label="10.30 AM - 12.30 AM" value="10.30 AM - 12.30 AM" />
          <Picker.Item label="11.30 AM - 1.30 PM" value="11.30 AM - 1.30 PM" />
          <Picker.Item label="2.00 PM - 4.00 PM" value="2.00 PM - 4.00 PM" />
          <Picker.Item label="3.00 PM - 5.00 PM" value="3.00 PM - 5.00 PM" />
          <Picker.Item label="4.00 PM - 6.00 PM" value="4.00 PM - 6.00 PM" />
          <Picker.Item label="5.00 PM - 7.00 PM" value="5.00 PM - 7.00 PM" />
          <Picker.Item label="6.00 PM - 8.00 PM" value="6.00 PM - 8.00 PM" />
        </Picker>

        <Text style={styles.text}>Venue</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Venue"
          value={data.venue}
          onChangeText={(val) => handleChangeText("venue", val)}
        />

        <Text style={styles.text}>Module</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Module"
          value={data.module}
          onChangeText={(val) => handleChangeText("module", val)}
        />

        <Text style={styles.text}>Lecturer</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the lecturer's name"
          value={data.lecturer}
          onChangeText={(val) => handleChangeText("lecturer", val)}
        />
        
        <TouchableOpacity
          style={styles.button}
          activeOpacity={2}
          onPress={() => UpdateSchedule()}
          underlayColor="#0084fffa"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#0D0140",
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#448AFF",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
});
