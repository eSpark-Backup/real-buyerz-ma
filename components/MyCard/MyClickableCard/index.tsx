import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";

import MyText from "../../MyText";
import GapView from "../../GapView";
import Card from "../../Card";

interface IClickableCard {
  title: string;
  onPress: () => void;
  children?: React.ReactNode;
}

const MyClickableCard = ({ title, onPress, children }: IClickableCard) => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={onPress}>
        <Card
          style={{
            height: 100,
            width: 165,
            borderWidth: 1,
            borderRadius: 5,
            padding: 17,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
          <GapView />
          <MyText size={14} style={{ textAlign: "center" }}>
            {title}
          </MyText>
        </Card>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MyClickableCard;

const styles = StyleSheet.create({});
