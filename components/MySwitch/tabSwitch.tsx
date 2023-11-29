import React, { useState, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { colors } from "../../theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import MyText from "../MyText";

export interface IMySwitch {
  titleSwitchOne: string;
  titleSwitchTwo: string;
  onPressSwitchOne?: () => void;
  onPressSwitchTwo?: () => void;
  bgColor?: string;
}

const TabSwitch = ({
  titleSwitchOne,
  titleSwitchTwo,
  onPressSwitchOne,
  onPressSwitchTwo,
  bgColor,
}: IMySwitch) => {
  const [activeButton, setActiveButton] = useState(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleButtonPress = (buttonName: any) => {
    if (activeButton !== buttonName) {
      setActiveButton(buttonName);
      Animated.timing(slideAnim, {
        toValue: buttonName === titleSwitchOne ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <View style={[styles.switchWrapper, { backgroundColor: bgColor }]}>
      <TouchableOpacity
        style={[styles.buttonStyle]}
        onPress={() => {
          handleButtonPress(titleSwitchOne);
          onPressSwitchOne?.();
        }}
      >
        <MyText
          text={titleSwitchOne}
          textColor={
            activeButton === titleSwitchOne ? colors.dark.primary : "#000000"
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonStyle]}
        onPress={() => {
          handleButtonPress(titleSwitchTwo);
          onPressSwitchTwo?.();
        }}
      >
        <MyText
          text={titleSwitchTwo}
          textColor={
            activeButton === titleSwitchTwo ? colors.dark.primary : "#000000"
          }
        />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 53],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default TabSwitch;

const styles = StyleSheet.create({
  switchWrapper: {
    backgroundColor: colors.light.border,
    flexDirection: "row",
    width: 107,
    justifyContent: "space-between",
    height: 30,
    alignItems: "center",
    borderRadius: 35,
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 54,
    height: 30,
  },
  slider: {
    position: "absolute",
    backgroundColor: "#FFD9C7",
    width: 54,
    height: 30,
    borderRadius: 15,
    borderColor: "#FB631C",
    borderWidth: 1,
    zIndex: -1,
  },
});
