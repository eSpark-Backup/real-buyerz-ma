import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import MyText from "components/MyText";

interface DropdownProps {
  data: string[];
  onSelect: (value: string) => void;
}

export default function MyDropdown({ data, onSelect }: DropdownProps) {
  const [show, setShow] = useState(false);
  const [label, setLabel] = useState("");

  return (
    <View
      style={[
        styles.container,
        show ? { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } : {},
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
          paddingHorizontal: 15,
        }}
      >
        <MyText text={label ? label : "Select City"} textColor="#969696" />
        <Entypo
          name={!show ? "chevron-down" : "chevron-up"}
          color={"#66666666"}
          size={16}
          onPress={() => {
            setShow(!show);
          }}
        />
      </View>
      {show && (
        <View
          style={{
            zIndex: 10,
            width: "101.5%",
            position: "absolute",
            overflow: "hidden",
            top: 28,
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            borderColor: "#E7E7E7",
            borderWidth: 1,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        >
          {data.map((item, index) => (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                height: 30,
                borderTopWidth: index > 0 ? 1 : 0,
                justifyContent: "center",
                borderColor: "#E7E7E7",
                paddingHorizontal: 15,
              }}
              key={item}
              onPress={() => {
                onSelect(item);
                setLabel(item);
                setShow(!show);
              }}
            >
              <MyText text={item} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#E7E7E7",
    alignItems: "center",
    zIndex: 10,
  },
});
