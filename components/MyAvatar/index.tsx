import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import { EditIcon } from "@assets/images/svg";
import { IMyAvatar, MyTheme } from "@types";

const MyAvatar = ({ size, imageUrl, edit, status }: IMyAvatar) => {
  const theme = useTheme() as MyTheme;
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {edit && (
        <View style={styles.edit}>
          <EditIcon />
        </View>
      )}
      <Image source={{ uri: imageUrl }} style={styles.image} />
      {status && (
        <View
          style={{
            zIndex: 1000,
            bottom: 0,
            right: 0,
            position: "absolute",
            height: 10,
            width: 10,
            borderRadius: 10,
            backgroundColor: "#18DD00",
            borderWidth: 2,
            borderColor: theme.colors.background,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    // overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  username: {
    marginTop: 5,
    fontWeight: "bold",
  },
  edit: { zIndex: 4, position: "absolute" },
});

export default MyAvatar;
