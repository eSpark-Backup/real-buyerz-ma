import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { MyTheme } from "../../types";
import MyText from "../../components/MyText";
import MyInput from "../../components/MyInput";

export default function App() {
  const { dark, colors } = useTheme() as MyTheme;
  return (
    <View>
      <MyText text="" size={50} />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <MyInput placeholder="Username" />
        <MyText
          text="Forget Username?"
          textColor="#2e6fac"
          size={15}
          style={{ textAlign: "right" }}
        />
        <MyText text="" size={20} />
        <MyInput placeholder="Password" />
        <MyText text="Forget Password?" textColor="#2e6fac" size={15} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

{
  /* <Text style={{ color: colors.text }}>App {dark ? "true" : "false"}</Text> */
}
{
  /* <MyText text="random" weight="900" size={20} textColor={colors.text}/>
      <MyInput placeholder="First name" password={true} />  */
}
