import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import RnSlider from "rn-range-slider";

import MyText from "@components/MyText";
import { MyTheme } from "@types";

interface RangeSliderProps {
  title: string;
  theme: MyTheme;
  initialValHigh:string,
  initialValLow:string,
  onChangeVal: (low: string, high: string) => void; 
}

export default function RangeSlider({ title, theme,initialValHigh, initialValLow, onChangeVal }: RangeSliderProps) {
  const [start, setStart] = useState(parseInt(initialValLow)); 
  const [end, setEnd] = useState(parseInt(initialValHigh));

  useEffect(() => {
    setStart(parseInt(initialValLow));
    setEnd(parseInt(initialValHigh));
    console.log("initialVal"+ initialValLow)
    console.log("initialValHigh"+ initialValHigh)
  }, [initialValLow, initialValHigh]);

  return (
    <View>
      {title && (
        <MyText
          textColor={theme.colors.text}
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
          textColor={theme.colors.text + "99"}
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
          setStart(low); 
          setEnd(high);
        }}
        low={start} // Use state for low value
        high={end} // Use state for high value
        onSliderTouchEnd={(low, high) => {
          onChangeVal(low.toString(), high.toString());
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
