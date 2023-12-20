import { EditIcon } from "@assets/images/svg";
import React from "react";
import { View, Image, StyleSheet } from "react-native";

interface IMyAvatar {
  size: number;
  imageUrl: string;
  edit?: boolean;
}

const MyAvatar = ({ size, imageUrl, edit }: IMyAvatar) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {edit && (
        <View style={{ zIndex: 4, position: "absolute" }}>
          <EditIcon />
        </View>
      )}
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
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
