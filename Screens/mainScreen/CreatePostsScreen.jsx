import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";

import * as Location from "expo-location";
import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { collection, add, addDoc, doc, setDoc } from "firebase/firestore";

const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [comment, setComment] = useState("");
  const [place, setPlace] = useState("");
   const [errorMsg, setErrorMsg] = useState(null);
  const { userId, userName } = useSelector((state) => state.auth);

  useEffect(() => {

       (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();

    navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, []);

  const takePhoto = async () => {
    try {const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
      let locationRes = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
      setLocation(coords);

    } catch (error) {
      console.log(error);
    }
    
  };
  const sendPhoto = async () => {
    uploadPostToServer();
    setPhoto("");
    setComment("");
    setPlace("");
    
    navigation.navigate("Home");
  };

  const uploadPostToServer = async () => {
    try {
       const photo = await uploadPhotoToServer();
  

    const docData = await addDoc(collection(db, "post"), {
      userId: userId,
      userName: userName,
      location: location.coords,
      comment: comment,
      photo: photo,
      place: place
    });
    } catch (error) {
      console.log(error.message)
    }
   
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();

    const storageRef = ref(storage, `/postImage/${uniquePostId}`);
    await uploadBytes(storageRef, file).then((snapshot) => {
   
    });
    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    ).then((url) => {
      return url;
    });
    return processedPhoto;
  };

  const deletePhoto = () => {
    setPhoto("");
    setComment("");
    setPlace("");
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.previewPhotoBox}>
            <Image
              style={{ height: 100, width: 150 }}
              source={{
                uri: photo,
              }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.icon} onPress={takePhoto}>
          <FontAwesome name="camera" size={20} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>
      <Text style={styles.text}>Загрузите фото</Text>
      
      <View >
        <TextInput
          placeholderTextColor={"#BDBDBD"}
          placeholder="Название..."
          style={styles.input}
          value={comment}
            onChangeText={(value) => setComment(value)}
            
        />
     
        <View>
        <TextInput
          placeholderTextColor={"#BDBDBD"}
          placeholder="Местность..."
          style={styles.inputMap}
           value={place}
          onChangeText={(value) =>setPlace(value)}
        />
       <Ionicons style={styles.iconMap} name="location-outline" size={24} color="#BDBDBD" />  
    </View>
      </View>
      
    {photo ?(  <TouchableOpacity onPress={sendPhoto}
        style={styles.buttonActive}
          activeOpacity={0.8}>
        <Text style={styles.buttonTextActive}>Опубликовать</Text>
      </TouchableOpacity>) :
        (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={sendPhoto}
        >
          <Text style={styles.buttonText}>Опубликовать</Text>
        </TouchableOpacity>
        )}
       <TouchableOpacity
          style={styles.deleteBtn}
          activeOpacity={0.8}
          onPress={deletePhoto}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  camera: {
    height: 240,
    borderRadius: 8,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  previewPhotoBox: {
    position: "absolute",
    marginTop: 32,
    marginHorizontal: 16,
  },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    zIndex: 1,
  },
    text: {
    marginTop: 8,
    color: "#BDBDBD",
  },
  input: {
    // marginTop: 32,
    borderBottomWidth: 1,
    // marginHorizontal: 20,
    borderBottomColor: "#E8E8E8",
    paddingBottom: 16,
     paddingTop: 16,
  },
  inputMap: {
    marginTop: 32,
    borderBottomWidth: 1,
    paddingLeft: 24,
    borderBottomColor: "#E8E8E8",
    paddingBottom: 16,
     paddingTop: 16,
  },
  button: {
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    marginTop: 32,
    backgroundColor: "#FF6C00",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
    buttonTextActive: {
    color: "#fff",
  },
  buttonText: {
    color: "#BDBDBD",
  },
  iconMap: {
     position: "absolute",
    top: 42,
    left: -2,
  },
  deleteBtn: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: 70,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    
  },
});
export default CreatePostsScreen;
