import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { MyTheme } from "@types";
import { PakIcon, IraqIcon } from "@assets/images/svg";

interface DropdownProps {
  zIndex?: number;
  onSelect: (value: string | string[]) => void;
  style?: StyleProp<ViewStyle>;
}

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          height: "100%",

          zIndex: zIndex - 2,
        }}
      >
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
          style={{
            zIndex: zIndex + 2,
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
          {countries.map((item, index) => (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                height: 30,
                borderTopWidth: index > 0 ? 1 : 0,
                borderColor: "#E7E7E7",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
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
      height: 35,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme?.colors.border,
      alignItems: "center",
      zIndex: 10,
    },
  });
