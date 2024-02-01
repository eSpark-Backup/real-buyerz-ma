import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import { MyTheme } from "@types";
import { MyInput, MyText, PreferencesList, PrimaryBtn } from "@components";

export default function Preferences() {
  const theme = useTheme() as MyTheme;
  const listData = [
    {
      title: "Dark Theme",
      value: false,
      indexIcon: 0,
      subtitle: "Enable dark mode throughout the app",
    },
    {
      title: "Email Notification",
      value: false,
      indexIcon: 1,
      subtitle: "Allow to receive email notification",
    },
    {
      title: "NewsLetters",
      value: false,
      indexIcon: 2,
      subtitle: "Allow to stay updated & receive newsLetter",
    },
    {
      title: "Automated Reports",
      value: false,
      indexIcon: 3,
      subtitle: "Allow to send us reports automatically incase of any issue.",
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles(theme).wrapper}>
        <MyText
          text="Preferences"
          weight="600"
          size={16}
          style={styles(theme).text}
        />
        <View style={styles(theme).ListItemWrapper}>
          {listData.map((item, index) => (
            <PreferencesList
              title={item.title}
              value={item.value}
              index={index}
              key={index}
              indexIcon={item.indexIcon}
              subtitle={item.subtitle}
            />
          ))}
        </View>
        <View style={{ rowGap: 10, padding: 6 }}>
          <MyText text="Currency" />
          <MyInput
            style={styles(theme).inputContainer}
            inputStyle={styles(theme).inputStyle}
            placeholder="PKR"
            placeholderColor={theme.colors.placeholderText}
          />

          <MyText text="Area Unit" />
          <MyInput
            style={styles(theme).inputContainer}
            inputStyle={styles(theme).inputStyle}
            placeholder="Sq. Ft."
            placeholderColor={theme.colors.placeholderText}
          />
          <PrimaryBtn
            title="Save Changes"
            textColor="#ffffff"
            labelStyle={{ fontSize: 12 }}
            width={105}
            btnStyle={{ marginTop: 5 }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    text: {
      paddingLeft: 8,
    },
    ListItemWrapper: {
      marginTop: 15,
    },
    inputContainer: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderRadius: 5.98,
      flexDirection: "row",
      elevation: 0,
      width: "100%",
      height: 31,
      borderColor: theme?.colors.border,
    },
    inputStyle: {
      padding: 0,
      fontSize: 14,
      fontWeight: "300",
    },
  });
