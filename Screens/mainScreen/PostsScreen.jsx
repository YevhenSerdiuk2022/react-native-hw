import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../nestedScreens/Home";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation, route }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity  onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            ),
             headerTitle: 'CommentsScreen', // заголовок
      headerStyle: {
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 1,
      },
      headerLeftContainerStyle: {
        paddingLeft: 15,
      },
        }}
        initialParams={{ navigation: navigation }}
      />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
