import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import MyText from "components/MyText";
import GapView from "components/GapView";
import Card from "components/Card";
import { MyTheme } from "@types";
import { useTheme } from "@react-navigation/native";

interface IClickableCard {
  title: string;
  onPress: () => void;
  children?: React.ReactNode;
}

const MyClickableCard = ({ title, onPress, children }: IClickableCard) => {
  const theme = useTheme() as MyTheme;
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Card style={styles(theme).main}>
          {children}
          <GapView />
          <MyText size={14} style={{ textAlign: "center" }}>
            {title}
          </MyText>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default MyClickableCard;

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    main: {
      backgroundColor: theme?.colors.card,
      borderColor: theme?.colors.border,
      height: 100,
      width: 165,
      borderWidth: 1,
      borderRadius: 5,
      padding: 17,
      alignItems: "center",
      justifyContent: "center",
    },
  });
