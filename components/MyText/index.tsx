import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { MyTextProps } from "../../types";

export default function MyText({
    text,
    textColor,
    weight,
    size,
    style
}: MyTextProps) {
    const textStyle: TextStyle= {
        color: textColor,
        fontWeight: weight || "normal",
        fontSize: size || 14,
    };

    return <Text style={[styles.plain, textStyle, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
    plain: {
        fontFamily: "Inter",
    },
});
