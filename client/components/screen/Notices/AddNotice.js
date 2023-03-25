import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { db } from "../../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import { Card, Button, Title, Paragraph } from "react-native-paper";

export default function AdddNotice() {
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const DatCollectinRef = collection(db, "Notice"); //database collection reference

  //inputs handle function
  const handleChangeText = (name, value) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  //create user function,include firebase methods
  const add_data = async () => {
    try {
      await addDoc(DatCollectinRef, {
        heading: data.heading,
        name: data.name,
        date: data.date,
      });
      if (addDoc) {
        ToastAndroid.show("successfully submited!", ToastAndroid.SHORT);
        navigation.navigate("View Notice"); //application toast message
      }
    } catch (e) {
      //error handling
      console.error("Error adding document: ", e);
      ToastAndroid.show("please filled out all feilds!", ToastAndroid.SHORT);
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    }
  };

  return (
    <View style={{ flex: 1, top: 20, backgroundColor: "#c8e3d0" }}>
      <Image
        style={{
          width: "20%",
          height: "20%",
          alignItems: "center",
          marginTop: -20,
          marginLeft: 290,
          marginBottom: -40,
        }}
        source={{
          uri: "https://static.wixstatic.com/media/d66c4a_b5060571f6964f1a9ce5ac286a294335~mv2.gif",
        }}
      />
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text
              style={{
                color: "#066b24",
                fontWeight: "bold",
                fontSize: 30,
                marginTop: 30,
                textAlign: "center",
                textShadowColor: "#585858",
                textShadowOffset: { width: 5, height: 5 },
                textShadowRadius: 10,
              }}
            >
              Add Notices
            </Text>

            {/* user data entering form start form here */}
            <View
              style={{
                margin: 5,
                borderBottomWidth: 1,
                borderColor: "#BDBDBD",
                padding: 10,
              }}
            >
              {/* lables */}
              <Text style={styles.text}>Heading</Text>
              {/* input fields  */}
              <TextInput
                style={{
                  borderColor: "#066b24",
                  borderWidth: 1.5,
                  borderRadius: 10,
                  padding: 5,
                  paddingLeft: 10,
                }}
                placeholder="Enter heading"
                onChangeText={(val) => handleChangeText("heading", val)}
              ></TextInput>
              {/* lables */}
              <Text style={styles.text}>Body</Text>
              {/* input fields  */}
              <TextInput
                style={{
                  borderColor: "#066b24",
                  borderWidth: 1.5,
                  borderRadius: 10,
                  padding: 5,
                  paddingLeft: 10,
                  height: 80,
                }}
                placeholder="Enter the content"
                onChangeText={(val) => handleChangeText("name", val)}
              ></TextInput>

              <Text style={styles.text}>Publisher </Text>
              <TextInput
                style={{
                  borderColor: "#066b24",
                  borderWidth: 1.5,
                  borderRadius: 10,
                  padding: 5,
                  paddingLeft: 10,
                }}
                placeholder="Enter Publisher"
                onChangeText={(val) => handleChangeText("date", val)}
              ></TextInput>
              <br />

              {/* submit button */}
              <TouchableOpacity
                style={styles.button}
                activeOpacity={2}
                onPress={() => add_data()}
                underlayColor="#0084fffa"
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 15 }}>
              {/* Button */}
              <TouchableOpacity
                style={{
                  marginTop: 15,
                  backgroundColor: "#0D47A1",
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 7,
                }}
                onPress={() => navigation.navigate("View Notice")}
                underlayColor="#0084fffa"
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                >
                  Notice List
                </Text>
              </TouchableOpacity>
            </View>
            <br />
          </Card.Content>
        </Card>
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
    backgroundColor: "#066b24",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    borderColor: "#066b24",
  },
  container: {
    alignContent: "center",
    margin: 37,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 0,
    elevation: 20,
  },
});
