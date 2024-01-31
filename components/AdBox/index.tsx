import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import Card from "@components/Card";
import MyText from "@components/MyText";
import LabelValue from "@components/LabelValue";
import MyButton from "@components/MyButton";
import GapView from "@components/GapView";
import { MyTheme } from "@types";

interface Btns {
  label: string;
  onPress: () => void;
  outline?: boolean;
}

interface Points {
  label: string;
  value?: string;
}

export default function AdBox({
  title,
  description,
  btns,
  botPost,
  points,
}: {
  title: string;
  description: string;
  points: Points[];
  btns?: Btns[];
  botPost?: boolean;
}) {
  const theme = useTheme() as MyTheme;

  return (
    <Card>
      <Card.Title>
        <MyText text={title} size={14} weight="500" />
      </Card.Title>
      <Card.Divider />
      <View style={{ paddingHorizontal: 30, marginTop: 10, marginBottom: 23 }}>
        <MyText
          style={{ marginVertical: 8 }}
          size={12}
          weight="300"
          text={description}
        />
        {points && (
          <>
            {points.map((pitem, pindex) => (
              <LabelValue
                key={pindex}
                label={pitem.label}
                value={pitem.value!}
              />
            ))}
          </>
        )}
        <View
          style={{
            flexDirection: "row",
            marginTop: btns || botPost ? 10 : 0,
            justifyContent: "space-between",
          }}
        >
          {btns ? (
            <View style={{ flexDirection: "row" }}>
              {btns.map((bitem, bindex) => (
                <NormalBtn
                  label={bitem.label}
                  theme={theme}
                  outline={bitem.outline}
                  onPress={bitem.onPress}
                />
              ))}
            </View>
          ) : (
            <View />
          )}
          {botPost && (
            <MyText
              text="Posted 39 min ago"
              size={10}
              style={{ alignSelf: "flex-end" }}
            />
          )}
        </View>
      </View>
    </Card>
  );
}

const NormalBtn = ({
  theme,
  label,
  outline,
  onPress,
}: {
  theme: MyTheme;
  label: string;
  outline?: boolean;
  onPress: () => void;
}) => {
  return (
    <MyButton
      label={label}
      labelStyle={
        outline
          ? {
              color: theme.colors.primary,
              ...styles.outlineLabel,
            }
          : { ...styles.normalLabel }
      }
      style={
        outline
          ? { borderColor: theme.colors.primary, ...styles.outlineBtn }
          : {
              backgroundColor: theme.colors.primary,
              ...styles.normalBtn,
            }
      }
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  outlineBtn: {
    width: 85,
    height: 30,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    marginRight: 10,
  },
  outlineLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  normalBtn: {
    width: 85,
    height: 30,
    borderRadius: 4,
  },
  normalLabel: {
    color: "#ffffff",
    fontSize: 12,
  },
});
