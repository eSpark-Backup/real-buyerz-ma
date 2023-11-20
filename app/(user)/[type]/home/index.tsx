import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, MyText } from "@components";

export default function Home() {
  return (
    <View style={{ alignItems: "center" }}>
      <Text>Home</Text>
      <Card style={{ width: "95%" }}>
        <Card.Title>A Test Title</Card.Title>
        <Card.Divider />
        <View>
          <MyText>Hello world</MyText>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
