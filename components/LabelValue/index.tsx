import { TextStyle, View } from "react-native";

import MyText from "../MyText";

const LabelValue = ({
  label,
  value,
  labelStyle = { color: "#636363", fontSize: 14 },
  valueStyle = { color: "#126FAA", fontSize: 14 },
  labelWeight = "400",
  valueWeight = "700",
}: {
  label: string;
  value: string;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  labelWeight?: TextStyle["fontWeight"];
  valueWeight?: TextStyle["fontWeight"];
}) => {
  return (
    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
      <MyText text={`${label}: `} style={labelStyle} weight={labelWeight} />
      <MyText text={`${value}`} style={valueStyle} weight={valueWeight} />
    </View>
  );
};

export default LabelValue;
