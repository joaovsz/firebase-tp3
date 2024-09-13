import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "../context/AuthContext";

const ProfileScreen = () => {
  const { user } = useAuth();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [profileInfo, setProfileInfo] = useState({
    name: "Your Name",
    email: "your@email.com",
    location: "Your Location",
    bio: "Your bio goes here",
    portfolio: "https://yourportfolio.com",
  });

  const uploadImage = async (uri: string, fileName: string) => {
    try {
      const reference = storage().ref(fileName);
      const task = reference.putFile(uri);

      task.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload progress: ", progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          task.snapshot &&
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log("File available at", downloadURL);
              setDownloadUrl(downloadURL);
              saveImageUrlToFirestore(downloadURL);
            });
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const saveImageUrlToFirestore = async (url: string) => {
    try {
      await firestore().collection("users").doc(user?.uid).update({
        profilePicture: url,
      });
      console.log("Imagem salva no Firestore");
    } catch (error) {
      console.error("Erro ao salvar a imagem no Firestore:", error);
    }
  };

  const handleImageSelection = async () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, async (response) => {
      if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        setImageUri(imageUri!);
        await uploadImage(imageUri!, "profile_picture.jpg");
      }
    });
  };

  const handleImageDownload = async () => {
    const url = await downloadImage("profile_picture.jpg");
    if (url) {
      setDownloadUrl(url);
    }
  };

  const downloadImage = async (fileName: string) => {
    try {
      const reference = storage().ref(fileName);
      const url = await reference.getDownloadURL();
      return url;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleImageDownload();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.avatarContainer}>
          {downloadUrl ? (
            <Image
              source={{ uri: downloadUrl }}
              style={{ width: 140, height: 140, borderRadius: 70 }}
            />
          ) : (
            <Text>RN</Text>
          )}
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{profileInfo.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoText}>{profileInfo.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoText}>{profileInfo.location}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Bio:</Text>
          <Text style={styles.infoText}>{profileInfo.bio}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Portfolio:</Text>
          <Text style={styles.infoText}>{profileInfo.portfolio}</Text>
        </View>
        <Button title="Selecionar imagem" onPress={handleImageSelection} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F3",
  },
  body: {
    marginTop: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
  avatar: {
    fontSize: 72,
    fontWeight: "700",
  },
  nameContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666666",
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
  },
});
export default ProfileScreen;
