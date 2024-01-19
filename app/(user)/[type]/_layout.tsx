import { GapView, MyText } from "@components";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { colors } from "@theme";
import { MyTheme } from "@types";
import { Drawer } from "expo-router/drawer";
import { Platform, StyleSheet, View } from "react-native";

const DrawerContent = (props: DrawerContentComponentProps) => {
  const { index } = props.state;
  const theme = useTheme() as MyTheme;

  return (
    <View style={{ ...styles.container }}>
      <View style={styles.header}></View>
      <DrawerContentScrollView style={styles.content}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={[styles.footer, { borderColor: theme.colors.border }]}>
        <DrawerItem
          label={() => (
            <MyText text="Logout" size={16} weight="400" textColor="#424242" />
          )}
          pressColor="transparent"
          activeBackgroundColor={"#ffffff1a"}
          // icon={({color, size, focused}) => (
          // )}
          onPress={() => props.navigation.navigate("SignIn")}
        />
      </View>
      {Platform.OS == "ios" && <GapView />}
    </View>
  );
};

export default function MainLayout() {
  const theme = useTheme() as MyTheme;
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      backBehavior="history"
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="(tabs)" // This is the name of the page and must match the url from root
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="inbox" // This is the name of the page and must match the url from root
        options={{
          drawerActiveBackgroundColor: "#DCEAF2",
          drawerLabel: ({ focused }) => (
            <DrawerLabel label="Inbox" theme={theme} focused={focused} />
          ),
        }}
      />
      <Drawer.Screen
        name="myProposals" // This is the name of the page and must match the url from root
        options={{
          drawerActiveBackgroundColor: "#DCEAF2",
          drawerLabel: ({ focused }) => (
            <DrawerLabel label="My Proposals" theme={theme} focused={focused} />
          ),
        }}
      />
      <Drawer.Screen
        name="myProperties" // This is the name of the page and must match the url from root
        options={{
          drawerActiveBackgroundColor: "#DCEAF2",
          drawerLabel: ({ focused }) => (
            <DrawerLabel
              label="My Properties"
              theme={theme}
              focused={focused}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="favorites" // This is the name of the page and must match the url from root
        options={{
          drawerActiveBackgroundColor: "#DCEAF2",
          drawerLabel: ({ focused }) => (
            <DrawerLabel label="Favorites" theme={theme} focused={focused} />
          ),
        }}
      />
      <Drawer.Screen
        name="shop" // This is the name of the page and must match the url from root
        options={{
          drawerActiveBackgroundColor: "#DCEAF2",
          drawerLabel: ({ focused }) => (
            <DrawerLabel label="Shop" theme={theme} focused={focused} />
          ),
        }}
      />
      <Drawer.Screen
        name="orderHistory" // This is the name of the page and must match the url from root
        options={{
          drawerActiveBackgroundColor: "#DCEAF2",
          drawerLabel: ({ focused }) => (
            <DrawerLabel
              label="Order History"
              theme={theme}
              focused={focused}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="preferences" // This is the name of the page and must match the url from root
        options={{
          drawerActiveBackgroundColor: "#DCEAF2",
          drawerLabel: ({ focused }) => (
            <DrawerLabel label="Preferences" theme={theme} focused={focused} />
          ),
        }}
      />
      <Drawer.Screen
        name="privacyPolicy" // This is the name of the page and must match the url from root
        options={{
          drawerActiveBackgroundColor: "#DCEAF2",
          drawerLabel: ({ focused }) => (
            <DrawerLabel
              label="Privacy and Policy"
              theme={theme}
              focused={focused}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="termsAndConditions" // This is the name of the page and must match the url from root
        options={{
          drawerActiveBackgroundColor: "#DCEAF2",
          drawerLabel: ({ focused }) => (
            <DrawerLabel
              label="Terms and conditions"
              theme={theme}
              focused={focused}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="listings" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "My Listings",
        }}
      /> */}
    </Drawer>
  );
}

const DrawerLabel = ({
  label,
  focused,
  theme,
}: {
  label: string;
  focused: boolean;
  theme: MyTheme;
}) => {
  return (
    <MyText
      text={label}
      size={16}
      weight="400"
      textColor={focused ? theme.colors.secondary : "#424242"}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    height: 100,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light.secondary,
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
  },
});
