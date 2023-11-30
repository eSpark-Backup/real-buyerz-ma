import React, { useState } from "react";
import { StyleSheet, Animated, TouchableOpacity, View } from "react-native";

interface IAnimatedButton {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const ToggleSwtich = ({ value, onValueChange }: IAnimatedButton) => {
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

  const handleOnPress = () => {
    Animated.timing(animatedValue, {
      toValue: value ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onValueChange(!value);
    });
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 18],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleOnPress}>
      <View
        style={
          Boolean(value) ? styles.switchContainerActive : styles.switchContainer
        }
      >
        <Animated.View
          style={[styles.switchHandle, { transform: [{ translateX }] }]}
        />
      </View>
    </TouchableOpacity>
  );
};
export default ToggleSwtich;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 35,
    height: 18,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
  },
  switchContainerActive: {
    flexDirection: "row",
    alignItems: "center",
    width: 35,
    height: 18,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    backgroundColor: "#FB631C",
  },
  switchHandle: {
    width: 14,
    height: 14,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },
});
