import { View, Platform, StatusBar } from "react-native";
import AddUser from "././components/screen/AddUser";
import UserList from "././components/screen/UserList";
import UpdateUser from "././components/screen/UpdateUser";
import SplashScreen from "././components/screen/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddFeedback from "./components/screen/Feedback/Addfeedback";
import FeedbackList from "./components/screen/Feedback/FeedbackList";
import UpdateFeedback from "./components/screen/Feedback/UpdateFeedback";


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
          <Stack.Screen name="Add Feedback" component={AddFeedback} />
          <Stack.Screen name="Add Feedback List" component={FeedbackList} />
          <Stack.Screen name="Update Feedback" component={UpdateFeedback} />
        
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
