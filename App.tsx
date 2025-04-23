
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecordScreen from "./screens/RecordScreen";
import ListScreen from "./screens/ListScreen";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar, Platform } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "default"} />
      <Tab.Navigator
        initialRouteName="Record"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#1EAEDB",
          tabBarInactiveTintColor: "#8E9196",
          tabBarStyle: { height: 62, paddingBottom: 5, paddingTop: 7 },
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Record") {
              return <Ionicons name="add-circle" size={size} color={color} />;
            } else {
              return <Ionicons name="list" size={size} color={color} />;
            }
          }
        })}
      >
        <Tab.Screen name="Record" component={RecordScreen} />
        <Tab.Screen name="Records" component={ListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
