import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase-config/firebase-config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Table, Row, Rows } from "react-native-table-component";

export default function ScheduleList() {
  const [getData, setGetData] = useState("");
  const navigation = useNavigation();
  const DatCollectinRef = collection(db, "Class Schedule"); //firebase databse reference
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0); //the method for refresh functions
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      const data = await getDocs(DatCollectinRef);
      setOriginalData(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setTableData(
        data.docs.map((doc) => [
          doc.data().day,
          doc.data().time,
          doc.data().venue,
          doc.data().subject,
          doc.data().lecturer,
          doc.id,
        ])
      );
      forceUpdate();
    };
    getAllData();
  }, [ignored]);

  //delete Schedules from database
  const deleteSchedule = async (id) => {
    try {
      const UserDoc = doc(db, "Class Schedule", id);
      await deleteDoc(UserDoc);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    ToastAndroid.show(
      "Class Schedule Successfully Deleted!",
      ToastAndroid.SHORT
    );
    forceUpdate();
  };

  const handleSearch = () => {
    const filtered = originalData.filter(
      (item) =>
        item.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const tableHead = ["Day", "Time", "Venue", "Subject", "Lecturer", "Actions"];
  
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
            placeholder="Search by day or subject"
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
        <br />
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Row
                data={tableHead}
                style={styles.tableHeader}
                textStyle={styles.tableHeaderText}
              />
              <Rows
                data={tableData}
                textStyle={styles.tableText}
                style={[
                  styles.tableRow,
                  { backgroundColor: "#ffffff" },
                ]}
              />
            </Table>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
    alignItems: "center",
  },
  tableHeader: {
    height: 50,
    width: 350,
    backgroundColor: "#537791",
  },
  tableHeaderText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  tableRow: {
    height: 40,
    backgroundColor: "#EDEDED",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
    alignItems: "center",
    marginHorizontal: 20,
  },
  tableCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tableCellText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666666",
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
