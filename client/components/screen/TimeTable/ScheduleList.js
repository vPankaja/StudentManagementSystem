import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase-config/firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default function ScheduleList() {
  const [getData, setGetData] = useState("");
  const navigation = useNavigation();
  const DatCollectinRef = collection(db, "Class Schedule"); //firebase databse reference
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0); //the method for refresh functions
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      const data = await getDocs(DatCollectinRef);
      setOriginalData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      forceUpdate();
    };
    getAllData();
  }, [ignored]);

  //delete Schedules from database
  const deleteSchedule = async (id) => {
    try {
      const ScheduleDoc = doc(db, "Class Schedule", id);
      await deleteDoc(ScheduleDoc);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Class Schedule Successfully Deleted!",
    });
    forceUpdate();
  };

  const handleSearch = () => {
    const filtered = originalData.filter(
      (item) =>
        item.selectedDay.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Module.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const sorted = filtered.sort((a, b) => {
      const aTime = parseInt(a.selectedTime.split(":").join(""));
      const bTime = parseInt(b.selectedTime.split(":").join(""));
      return aTime - bTime;
    });
  
    setFilteredData(sorted);
  };
  

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            color: "#0D0140",
            fontWeight: "bold",
            fontSize: 30,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Class Schedule List
        </Text>
        <br />
        <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
            placeholder="Search by day or module"
            placeholderTextColor="#666"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => handleSearch()}
            underlayColor="#0084fffa"
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* store feched data in list using react native flatlist */}
        <FlatList
          style={{
            margin: 5,
            height: "95%",
          }}
          data={searchTerm ? filteredData : getData}
          renderItem={({ item }) => (
            <View
              style={{
                margin: 5,
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 15,
                elevation: 10,
              }}
            >
              <Text style={styles.text}>Day : {item.selectedDay}</Text>
              <Text style={styles.text}>Time : {item.selectedTime}</Text>
              <Text style={styles.text}>Venue : {item.Venue}</Text>
              <Text style={styles.text}>Module : {item.Module}</Text>
              <Text style={styles.text}>Lecturer : {item.Lecturer}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {/* update button */}
                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    flex: 0.4,
                    backgroundColor: "#0056A2",
                    marginHorizontal: 5,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  activeOpacity={2}
                  //pass data to another page using usenavigate params for update user
                  onPress={() =>
                    navigation.navigate("Update Schedule", { item })
                  }
                  underlayColor="#0084fffa"
                >
                  <Text style={{ fontSize: 15, color: "#fff" }}>Update</Text>
                </TouchableOpacity>
                {/* delete button */}
                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    flex: 0.4,
                    backgroundColor: "tomato",
                    marginHorizontal: 5,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  activeOpacity={2}
                  onPress={() => deleteSchedule(item.id)}
                  underlayColor="#0084fffa"
                >
                  <Text style={{ fontSize: 15, color: "#fff" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        ></FlatList>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#0D0140",
    marginVertical: 5,
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
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 7,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#0056A2",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    paddingHorizontal: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 15,
  },
});
