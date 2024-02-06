import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { PakIcon, IraqIcon } from "@assets/images/svg";
import { DropdownProps, MyTheme } from "@types";

export default function FlagDropDown({
  zIndex = 10,
  style,
  onSelect,
}: DropdownProps) {
  const theme = useTheme() as MyTheme;
  const [show, setShow] = useState(false);
  type ICountry = {
    name: string;
    icon: React.ReactNode;
  };

  const [country, setCountry] = useState<ICountry>({
    name: "Pakistan",
    icon: <PakIcon />,
  });

  const countries = [
    {
      name: "Pakistan",
      icon: <PakIcon />,
    },
    {
      name: "Iraq",
      icon: <IraqIcon />,
    },
  ];

  const handleSelection = (item: ICountry) => {
    setCountry({ ...item });
    onSelect(item.name);
  };

  return (
    <View
      style={[
        styles(theme).container,
        { zIndex: zIndex },
        show ? { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } : {},
        style,
      ]}
    >
      <View style={[styles(theme).innerContainer, { zIndex: zIndex - 2 }]}>
        <View style={{ height: 25, width: 25 }}>{country.icon}</View>
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
          style={[
            styles(theme).dropdown,
            {
              zIndex: zIndex + 2,
            },
          ]}
        >
          {countries.map((item, index) => (
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles(theme).item,
                {
                  borderTopWidth: index > 0 ? 1 : 0,
                },
              ]}
              key={index}
              onPress={() => {
                setShow(false);
                handleSelection(item);
              }}
            >
              <View style={{ height: 25, width: 25 }}>{item.icon}</View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      width: 64,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme?.colors.border,
      alignItems: "center",
      zIndex: 10,
    },
    innerContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      width: "100%",
    },
    dropdown: {
      width: "101.5%",
      position: "absolute",
      overflow: "hidden",
      top: 28,
      justifyContent: "space-between",
      backgroundColor: theme?.colors.background,
      borderColor: theme?.colors.border,
      borderWidth: 1,
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
    },
    item: {
      height: 30,
      borderColor: theme?.colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });
