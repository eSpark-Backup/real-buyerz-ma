import React from "react";
import { StyleSheet, View } from "react-native";

import { PLogo, RText } from "../../assets/images/svg";
import { colors } from "../../theme";
import MySwitch from "../MySwitch";

export default function MyAppBar() {
  const switchData = {
    titleSwitchOne: "Buy",
    onPressSwitchOne: () => {
      console.log("switch one Press");
    },
    titleSwitchTwo: "Rent",
    onPressSwitchTwo: () => {
      console.log("switch Two Press");
    },
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.logoStyle}>
        <PLogo />
        <View style={styles.RtextStyle}>
          <RText />
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <MySwitch
          titleSwitchOne={switchData.titleSwitchOne}
          titleSwitchTwo={switchData.titleSwitchTwo}
          onPressSwitchOne={switchData.onPressSwitchOne}
          onPressSwitchTwo={switchData.onPressSwitchTwo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 120,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: colors.light.card,
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
  },
  logoStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  RtextStyle: {
    marginStart: 95,
  },
});
