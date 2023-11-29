import { AgentHome } from "@assets/images";
import Card from "components/Card";
import GapView from "components/GapView";
import MyText from "components/MyText";
import { View } from "react-native";

export const AdCard = ({
  label,
  btnLabel,
}: {
  label?: string;
  btnLabel?: string;
}) => {
  return (
    <Card style={{ width: "100%", marginTop: 20, borderRadius: 10 }}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <AgentHome />
          <MyText style={{ width: "70%" }}>{label}</MyText>
        </View>
        <GapView length={15} />
        <View
          style={{
            backgroundColor: "#FB631C33",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 7,
            borderRadius: 2,
          }}
        >
          <MyText textColor="#FB631C">{btnLabel}</MyText>
        </View>
      </View>
    </Card>
  );
};
