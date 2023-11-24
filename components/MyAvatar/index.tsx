import React from "react";
import { View, Image, StyleSheet } from "react-native";

interface IMyAvatar {
  size: number;
  imageUrl: string;
}

const MyAvatar = ({ size, imageUrl }: IMyAvatar) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  username: {
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default MyAvatar;
