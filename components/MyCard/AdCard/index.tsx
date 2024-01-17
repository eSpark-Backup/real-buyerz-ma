import React from "react";
import { View, StyleSheet } from "react-native";

import Card from "../../Card";
import GapView from "../../GapView";
import MyText from "../../MyText";
import { AgentHome } from "@assets/images";
import { AgentHomeDark } from "@assets/images/svg";
import { MyTheme } from "@types";

export const AdCard = ({
  label,
  btnLabel,
  theme,
}: {
  label?: string;
  btnLabel?: string;
  theme?: MyTheme;
}) => {
  return (
    <Card style={styles(theme).cardConatainer}>
      <View style={styles(theme).row1}>
        <View style={styles(theme).wrap}>
          {theme?.dark ? <AgentHomeDark /> : <AgentHome />}
          <MyText style={styles(theme).label}>{label}</MyText>
        </View>
        <GapView length={15} />
        <View style={styles(theme).btn}>
          <MyText textColor={theme?.colors.primary}>{btnLabel}</MyText>
        </View>
      </View>
    </Card>
  );
};

export default AdCard;

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    cardConatainer: {
      width: "90%",
      marginTop: 30,
      backgroundColor: theme?.colors.background,
      borderColor: theme?.colors.border,
    },
    row1: { paddingHorizontal: 20, paddingVertical: 12 },
    wrap: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    label: { width: "70%" },
    btn: {
      backgroundColor: theme?.colors.primary + "33",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 7,
      borderRadius: 2,
    },
  });
