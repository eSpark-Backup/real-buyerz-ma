import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import RnSlider from "rn-range-slider";

import MyText from "@components/MyText";
import { MyTheme } from "@types";

interface RangeSliderProps {
  title: string;
}

export default function RangeSlider({ title }: RangeSliderProps) {
  const [start, setStart] = useState("0");
  const [end, setEnd] = useState("Any");
  const theme = useTheme() as MyTheme;
  return (
    <View>
      {title && (
        <MyText
          text={title}
          style={{ alignSelf: "flex-start", paddingBottom: 10.5 }}
          size={15}
          weight="400"
        />
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.input}>
          <MyText
            text={start.toString()}
            size={16}
            weight="600"
            textColor={theme.colors.dimText}
          />
        </View>
        <MyText
          text={"To"}
          size={16}
          weight="600"
          style={{ marginHorizontal: 10 }}
        />
        <View style={styles.input}>
          <MyText
            text={end.toString()}
            size={16}
            weight="600"
            textColor={theme.colors.dimText}
          />
        </View>
      </View>
      <RnSlider
        min={0}
        max={100}
        step={1}
        style={{ width: "100%", marginVertical: 15 }}
        renderRailSelected={() => (
          <View
            style={{
              height: 10,
              borderRadius: 2,
              backgroundColor: "#47B2FF",
            }}
          />
        )}
        renderRail={() => (
          <View
            style={{
              flex: 1,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#C7D3EB",
            }}
          />
        )}
        onValueChanged={(low, high) => {
          setStart(low.toString());
          setEnd(high.toString());
        }}
        renderThumb={() => (
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 3,
              borderRadius: 10,
              backgroundColor: "#C7D3EB",
              borderColor: "#47B2FF",
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 11,
    paddingLeft: 15,
    borderColor: "#E7E7E7",
  },
});
