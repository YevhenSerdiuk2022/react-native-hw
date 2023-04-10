import React from "react";
import { View, Text, StyleSheet,  Dimensions } from "react-native";




import MapView from "react-native-maps/lib/MapView";



const MapScreen = ({ route }) => {
  
  const {latitude, longitude} = route.params.location;
    return (
        <View style={styles.container}>
            <MapView style={{ flex: 1 }}
             region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922, 
          longitudeDelta: 0.0421,
        }}
        >
           
            </MapView>      
     
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
//   mapStyle: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
});

export default MapScreen;