import React, {
  useState,
  useCallback,
  useContext,
  useLayoutEffect,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { AntDesign } from "@expo/vector-icons";
import { doc, addDoc, collection, onSnapshot } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const { photoId } = route.params;

  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const { userName } = useSelector((state) => state.auth);
  const { navigation } = route.params;

  useEffect(() => {
    getAllPost();

    navigation.setOptions({
      tabBarStyle: {
        display: "none",
      },
      headerShown: false,
    });
  }, [navigation]);

  useLayoutEffect(() => {
    return () => {
      navigation.setOptions({
        headerShown: true,
        tabBarStyle: {
          display: "flex",
        },
      });
    };
  }, [navigation]);

  const createPost = async () => {
    let date = new Date().toLocaleString("ru", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let time = new Date().toLocaleString("ru", {
      timeStyle: "short",
    });

    const docRef = doc(db, "post", postId);
    const postData = {
      comment: comment,
      userName: userName,
      date: date,
      time: time,
    };
    const colRef = collection(docRef, "comments");
    await addDoc(colRef, postData);
    setComment("");
  };
  const getAllPost = async () => {
    const docRef = doc(db, "post", postId);
    const colRef = collection(docRef, "comments");

    const query = await onSnapshot(colRef, (snapshot) =>
      setAllComments(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
    return query;
  };
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: photoId }} style={styles.picture} />
      </View>
      <SafeAreaView>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentBox}>
              <Text>{item.comment}</Text>
              <Text style={{ textAlign: "right", color: "#BDBDBD" }}>
                {item.date} | {item.time}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.inputComment}>
        <TextInput
          style={styles.input}
          textAlign={"left"}
          placeholderTextColor={"#BDBDBD"}
          placeholder="Комметарии..."
          value={comment}
          onChangeText={(value) => setComment(value)}
        />
        <TouchableOpacity style={styles.buttonComment} onPress={createPost}>
          <AntDesign style={styles.arrow} name="arrowup" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  inputComment: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  input: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    // color: "#212121",
    paddingLeft: 16,
    borderWidth: 1,
    height: 50,
    borderRadius: 100,
    borderColor: "#F6F6F6",
    backgroundColor: "#F6F6F6",
  },
  buttonComment: {
    position: "absolute",
    top: 4,
    right: 25,
    marginTop: 32,
    backgroundColor: "#FF6C00",

    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    color: "#FFFFFF",
    padding: 8,
  },
  commentBox: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#F6F6F6",
    backgroundColor: "#F6F6F6",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  picture: {
    height: 240,
    borderRadius: 8,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

CommentsScreen.options = {
  tabBarStyle: { display: "none" },
};
export default CommentsScreen;
