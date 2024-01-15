import { EditIcon } from "@assets/images/svg";
import { useTheme } from "@react-navigation/native";
import { MyTheme } from "@types";
import React from "react";
import { View, Image, StyleSheet } from "react-native";

interface IMyAvatar {
  size: number;
  imageUrl?: string;
  edit?: boolean;
  status?: "online" | "offline" | "invisible";
}

const MyAvatar = ({ size, imageUrl, edit, status }: IMyAvatar) => {
  const theme = useTheme() as MyTheme;
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {edit && (
        <View style={{ zIndex: 4, position: "absolute" }}>
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
});

export default MyAvatar;
