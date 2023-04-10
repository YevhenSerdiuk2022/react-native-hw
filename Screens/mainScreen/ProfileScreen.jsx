import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { EvilIcons, Feather, Ionicons, AntDesign } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { db } from "../../firebase/config";
import {
  collection,
  query,
  where,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

const ProfileScreen = ({navigation}) => {
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();
  const { userId, userName, userEmail } = useSelector((state) => state.auth);
  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const colRef = query(collection(db, "post"), where("userId", "==", userId));

    const querySnapshot = await onSnapshot(colRef, (snapshot) =>
      setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return query;
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/image/photo-BG-2x.jpg")}
        style={styles.image}
      >
        <View style={styles.wrapper}>
          <View style={styles.imgBox}>
            <Image
              style={styles.avatar}
              source={require("../../assets/image/avatar.png")}
            />
          </View>

          <TouchableOpacity style={styles.iconSignOut} onPress={signOut}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>{userName}</Text>
          </View>
          <FlatList
            data={userPosts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View>
                <Image source={{ uri: item.photo }} style={styles.picture} />
                <Text style={styles.text}>{item.comment}</Text>
                <View style={styles.box}>
                  <View style={ styles.iconBox}>
               
                      <Text style={styles.texTitle}>
                        <EvilIcons
                          style={styles.comment}
                          name="comment"
                          size={24}
                        color="#FF6C00"
                       
                        />
                        0{" "}
                      </Text>
                             <Text style={styles.texLike}>
                        <AntDesign
                          style={styles.comment}
                          name="like2"
                          size={24}
                          color="#FF6C00"
                        />
                        0{" "}
                      </Text>
                   
                  </View>
                  <View style={styles.boxMap}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("MapScreen", {
                          location: item.location,
                        })
                      }
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    flex: 1,
    marginTop: 150,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  iconSignOut: {
    top: 24,
    left: "92%",
  },
  title: {
    marginTop: 92,
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
    color: "#212121",
  },

  picture: {
    height: 240,
    borderRadius: 8,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "center",
  },
  imgBox: {
    position: "absolute",
    left: "38%",
    top: "-10%",

    width: 120,
    height: 120,
    backgroundColor: "#E8E8E8",
    marginRight: 8,
    borderRadius: 16,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  box: {
    marginTop: 11,
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconBox: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center"
  },
  boxMap: {
    flexDirection: "row",
  },
  text: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginTop: 8,
  },
  texLike: {
    marginLeft: 27,
  }
});
export default ProfileScreen;
