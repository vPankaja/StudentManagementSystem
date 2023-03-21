import { View, Platform, StatusBar } from "react-native";
import AddUser from "././components/screen/AddUser";
import UserList from "././components/screen/UserList";
import UpdateUser from "././components/screen/UpdateUser";
import SplashScreen from "././components/screen/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Chanduni
import AddNotice from "./components/screen/Notices/AddNotice";
import NoticeList from "./components/screen/Notices/NoticeList";
import UpdateNotice from './components/screen/Notices/UpdateNotice'


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Add User" component={AddUser} />
          <Stack.Screen name="User List" component={UserList} />
          <Stack.Screen name="Update User" component={UpdateUser} />

          {/* Chanduni */}
          <Stack.Screen name="Add Notice" component={AddNotice} />
          <Stack.Screen name="View Notice" component={NoticeList} />
          <Stack.Screen name="Update Notice" component={UpdateNotice} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
