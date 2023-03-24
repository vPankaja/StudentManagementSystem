import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { Image } from 'react-native';

function Home() {
  return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card  style={{ width: 250, height: 250 }}>
        <Card.Content>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
             <Image
          source={{ uri: 'https://images.ctfassets.net/2htm8llflwdx/6LK9MCbEafyPhE3YB5HLW0/c0fe08b894d0cff8a6838f9172d1a61c/Graduation_StudentsGroup_Smiling_Outdoor_GettyImages-907837926.jpg' }}
          style={{ width: 200, height: 200,  }}
        />
            <Text>Home!</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

function Student() {
  return (
    <Card>
      <Card.Content>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Student!</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

function Feedback() {
  return (
    <Card>
      <Card.Content>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Feedback!</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

function Timetable() {
  return (
    <Card>
      <Card.Content>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Timetable!</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

function Uploading() {
  return (
    <Card>
      <Card.Content>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Uploading!</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home-outline'
                : 'home-outline';
            } else if (route.name === 'Feedback') {
              iconName = focused 
              ? 'pencil-outline' 
              : 'pencil-outline';
            }
            else if (route.name === 'Timetable') {
              iconName = focused 
              ? 'calendar-outline' 
              : 'calendar-outline';
            }
            else if (route.name === 'Uploading') {
              iconName = focused 
              ? 'cloud-upload-outline' 
              : 'cloud-upload-outline';
            }
            else if (route.name === 'Student') {
              iconName = focused 
              ? 'book-outline' 
              : 'book-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#5d6d7e',
          tabBarInactiveTintColor: '#d4e6f1',
          tabBarStyle: { backgroundColor: '#52be80' } // set background color here
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Student" component={Student} />
        <Tab.Screen name="Feedback" component={Feedback} />
        <Tab.Screen name="Timetable" component={Timetable} />
        <Tab.Screen name="Uploading" component={Uploading} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}