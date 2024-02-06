import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import { MyText } from "@components";
import { MyTheme } from "@types";

export default function PrivacyPolicy() {
  const theme = useTheme() as MyTheme;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={[styles.row, { marginBottom: 5 }]}>
        <MyText text="Last updated: " weight="500" style={styles.headingText} />
        <MyText
          text="December 21,2022"
          weight="700"
          style={styles.headingText}
        />
      </View>
      <MyText
        text={
          "Eiusmod Lorem commodo voluptate officia nisi non veniam adipisicing dolore. Commodo quis minim labore esse do sint enim consectetur pariatur exercitation tempor velit enim. Mollit sunt nisi voluptate duis magna officia qui nostrud excepteur tempor labore minim proident adipisicing. Tempor officia aliqua aute qui eu. Cillum ipsum do officia commodo deserunt deserunt aliquip quis sint exercitation commodo Lorem nostrud. Deserunt sunt qui nisi ullamco nisi ipsum est cillum irure velit."
        }
        size={12}
        style={styles.descriptionText}
      />
      <MyText
        text="Lorem Ipsum"
        weight="700"
        textColor={theme.colors.secondary}
        style={[styles.headingText, { marginTop: 5 }]}
      />
      <MyText
        text={
          "Irure ad id pariatur magna dolore proident dolore occaecat incididunt. Ea aute aute aliquip culpa laborum ea eiusmod pariatur est."
        }
        size={12}
        style={styles.descriptionText}
      />
      <MyText
        text="Lorem Ipsum"
        weight="700"
        textColor={theme.colors.secondary}
        style={[styles.headingText, { marginTop: 5 }]}
      />
      <MyText
        text={"Irure ad id pariatur magna dolore proident."}
        size={12}
        style={styles.descriptionText}
      />
      <BulletText
        text="In elit cillum dolore voluptate nisi. Deserunt ex sit tempor sit mollit eu consectetur duis consequat cillum cillum aliqua anim fugiat. Reprehenderit tempor voluptate pariatur amet aute commodo voluptate aliquip commodo. Lorem sint quis nulla qui qui veniam consequat cillum. Excepteur reprehenderit aute reprehenderit incididunt aliqua nulla laboris labore officia minim culpa. Fugiat ea ullamco culpa ullamco et."
        theme={theme}
      />
      <BulletText
        text="In elit cillum dolore voluptate nisi. Deserunt ex sit tempor sit mollit eu consectetur duis consequat cillum cillum aliqua anim fugiat. Reprehenderit tempor voluptate pariatur amet aute commodo voluptate aliquip commodo. Lorem sint quis nulla qui qui veniam consequat cillum. Excepteur reprehenderit aute reprehenderit incididunt aliqua nulla laboris labore officia minim culpa. Fugiat ea ullamco culpa ullamco et."
        theme={theme}
      />
      <BulletText
        text="In elit cillum dolore voluptate nisi. Deserunt ex sit tempor sit mollit eu consectetur duis consequat cillum cillum aliqua anim fugiat. Reprehenderit tempor voluptate pariatur amet aute commodo voluptate aliquip commodo. Lorem sint quis nulla qui qui veniam consequat cillum. Excepteur reprehenderit aute reprehenderit incididunt aliqua nulla laboris labore officia minim culpa. Fugiat ea ullamco culpa ullamco et."
        theme={theme}
      />
      <BulletText
        text="In elit cillum dolore voluptate nisi. Deserunt ex sit tempor sit mollit eu consectetur duis consequat cillum cillum aliqua anim fugiat. Reprehenderit tempor voluptate pariatur amet aute commodo voluptate aliquip commodo. Lorem sint quis nulla qui qui veniam consequat cillum. Excepteur reprehenderit aute reprehenderit incididunt aliqua nulla laboris labore officia minim culpa. Fugiat ea ullamco culpa ullamco et."
        theme={theme}
      />
    </ScrollView>
  );
}

function BulletText({ text, theme }: { text: string; theme: MyTheme }) {
  return (
    <View style={[styles.row, styles.center]}>
      <View style={{ flex: 0.1 }}>
        <View
          style={{
            paddingTop: 13,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={[styles.bullet, { backgroundColor: theme.colors.negative }]}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <MyText text={text} size={12} style={styles.descriptionText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
  },
  center: {
    flex: 1,
  },
  descriptionText: {
    lineHeight: 30,
  },
  headingText: {
    marginBottom: 5,
    lineHeight: 30,
  },
  bullet: {
    borderRadius: 100,
    height: 5,
    width: 5,
  },
});
