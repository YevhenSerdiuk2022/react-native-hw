import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import {
  collection,
 
  onSnapshot,

} from "firebase/firestore";

const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  const getAllPost = async () => {
    const query = await onSnapshot(collection(db, "post"), (snapshot) =>
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return query;
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.imgBox}>
          <Image
            style={styles.avatar}
            source={require("../../assets/image/avatar.png")}
          />
        </View>
        <View style={styles.user}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.picture} />
            <Text style={styles.text}>{item.comment}</Text>
            <View style={styles.box}>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CommentsScreen", { postId: item.id, photoId: item.photo})}
                >
                  <Text style={styles.texTitle}>
                    <EvilIcons
                      style={styles.comment}
                      name="comment"
                      size={24}
                      color="#BDBDBD"
                    />
                    0{" "}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.boxMap}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("MapScreen", {location: item.location})}
                >
                  <Text style={styles.texTitle}>
                    <Ionicons
                      style={styles.iconMap}
                      name="location-outline"
                      size={24}
                      color="#BDBDBD"
                    />

                    {item.place}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  userInfo: {
    flexDirection: "row",
    marginTop: 32,
    height: 60,
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  imgBox: {
    width: 60,
    height: 60,
    // backgroundColor: "#E8E8E8",
    marginRight: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius:16,
    },
    name: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    lineHeight: 15,
    fontSize: 13,
    fontWeight: 700,
    color: "#212121",
  },
  picture: {
    height: 240,
    borderRadius: 8,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginTop: 8,
  },
  box: {
    marginTop: 11,
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boxMap: {
    flexDirection: "row",
  },
});

export default Home;
