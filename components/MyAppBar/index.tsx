import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import { PLogo, RText } from "@assets/images/svg";
import { TabSwitch } from "../MySwitch";
import { MyTheme } from "@types";

export default function MyAppBar() {
  const theme = useTheme() as MyTheme;

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
    <View style={styles(theme).wrapper}>
      <View style={styles(theme).logoStyle}>
        <PLogo />
        <View style={styles(theme).RtextStyle}>
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
        <TabSwitch
          titleSwitchOne={switchData.titleSwitchOne}
          titleSwitchTwo={switchData.titleSwitchTwo}
          onPressSwitchOne={switchData.onPressSwitchOne}
          onPressSwitchTwo={switchData.onPressSwitchTwo}
        />
      </View>
    </View>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    wrapper: {
      height: 120,
      paddingVertical: 12,
      paddingHorizontal: 15,
      backgroundColor: theme?.colors.card,
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
