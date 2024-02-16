import { Platform, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

import { colors } from "@theme";
import { MyTheme } from "@types";
import {
  Draw_Favorites,
  Draw_Inbox,
  Draw_Logout,
  Draw_OrderHistory,
  Draw_Policy,
  Draw_Preferences,
  Draw_Properties,
  Draw_Proposals,
  Draw_Settings,
  Draw_Shop,
} from "@assets/images";
import { BubbleIcon, GapView, MyAvatar, MyHeader, MyText } from "@components";

const DrawerContent = (props: DrawerContentComponentProps) => {
  const { index } = props.state;
  const theme = useTheme() as MyTheme;

  return (
    <View style={{ ...styles.container }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <MyAvatar
            size={40}
            imageUrl={{ uri: "https://i.pravatar.cc/300?img=68" }}
          />
          <View style={{ marginLeft: 10 }}>
            <MyText
              text="Arman Khan"
              size={16}
              weight="600"
              textColor="#ffffff"
            />
            <MyText
              text="Email123@gmail.com"
              size={12}
              textColor="#ffffff"
              style={{ marginVertical: 5 }}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MyText
                text="Available connects: "
                size={12}
                textColor="#ffffff"
              />
              <MyText text="50" size={12} weight="600" textColor="#ffffff" />
            </View>
          </View>
        </View>
        <BubbleIcon
          size={40}
          onPress={() => router.push("(user)/anon/(tabs)/profile")}
        >
          <Draw_Settings />
        </BubbleIcon>
      </View>
      <DrawerContentScrollView
        style={styles.content}
        contentContainerStyle={{ flexGrow: 1, paddingTop: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={[styles.footer, { borderColor: theme.colors.border }]}>
        <DrawerItem
          label={() => (
            <DrawerLabel label="Logout" theme={theme} focused={false} />
          )}
          pressColor="transparent"
          activeBackgroundColor={"#ffffff1a"}
          icon={({ color, size, focused }) => (
            <Draw_Logout
              style={{
                color: focused ? theme.colors.secondary : theme.colors.text,
              }}
            />
          )}
          onPress={() => router.replace("/auth/signIn")}
        />
      </View>
      {Platform.OS == "ios" && <GapView />}
    </View>
  );
};

export default function MainLayout() {
  const theme = useTheme() as MyTheme;
  return (
    <>
      <StatusBar backgroundColor={theme.colors.secondary} style="light" />

      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        backBehavior="history"
        screenOptions={({ route }) => ({
          // headerShown: false,
          sceneContainerStyle: { marginBottom: 10 },
          header: (props) => {
            return <MyHeader {...props} showBackIcon showRight theme={theme} />;
          },
          drawerStyle: { width: "80%" },
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
            headerShown: false,
            sceneContainerStyle: { marginBottom: 0 },
          }}
        />
        <Drawer.Screen
          name="search" // This is the name of the page and must match the url from root
          options={{
            headerShown: false,
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="inbox" // This is the name of the page and must match the url from root
          options={{
            drawerActiveBackgroundColor: "#DCEAF2",
            drawerIcon: ({ focused }) => (
              <Draw_Inbox
                style={{
                  color: focused ? theme.colors.secondary : theme.colors.text,
                }}
              />
            ),
            drawerLabel: ({ focused }) => (
              <DrawerLabel label="Inbox" theme={theme} focused={focused} />
            ),
          }}
        />
        <Drawer.Screen
          name="myListings" // This is the name of the page and must match the url from root
          options={{
            drawerActiveBackgroundColor: "#DCEAF2",
            drawerIcon: ({ focused }) => (
              <Draw_Proposals
                style={{
                  color: focused ? theme.colors.secondary : theme.colors.text,
                }}
              />
            ),
            drawerLabel: ({ focused }) => (
              <DrawerLabel
                label="My Listings"
                theme={theme}
                focused={focused}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="myProposals" // This is the name of the page and must match the url from root
          options={{
            drawerActiveBackgroundColor: "#DCEAF2",
            drawerIcon: ({ focused }) => (
              <Draw_Proposals
                style={{
                  color: focused ? theme.colors.secondary : theme.colors.text,
                }}
              />
            ),
            drawerLabel: ({ focused }) => (
              <DrawerLabel
                label="My Proposals"
                theme={theme}
                focused={focused}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="myProperties" // This is the name of the page and must match the url from root
          options={{
            drawerActiveBackgroundColor: "#DCEAF2",
            drawerIcon: ({ focused }) => (
              <Draw_Properties
                style={{
                  color: focused ? theme.colors.secondary : theme.colors.text,
                }}
              />
            ),
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
          name="favourites" // This is the name of the page and must match the url from root
          options={{
            drawerActiveBackgroundColor: "#DCEAF2",
            drawerIcon: ({ focused }) => (
              <Draw_Favorites
                style={{
                  color: focused ? theme.colors.secondary : theme.colors.text,
                }}
              />
            ),
            drawerLabel: ({ focused }) => (
              <DrawerLabel label="Favourites" theme={theme} focused={focused} />
            ),
          }}
        />
        <Drawer.Screen
          name="shop" // This is the name of the page and must match the url from root
          options={{
            drawerActiveBackgroundColor: "#DCEAF2",
            drawerIcon: ({ focused }) => (
              <Draw_Shop
                style={{
                  color: focused ? theme.colors.secondary : theme.colors.text,
                }}
              />
            ),
            drawerLabel: ({ focused }) => (
              <DrawerLabel label="Shop" theme={theme} focused={focused} />
            ),
          }}
        />
        <Drawer.Screen
          name="orderHistory" // This is the name of the page and must match the url from root
          options={{
            drawerActiveBackgroundColor: "#DCEAF2",
            drawerIcon: ({ focused }) => (
              <Draw_OrderHistory
                style={{
                  color: focused ? theme.colors.secondary : theme.colors.text,
                }}
              />
            ),
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
            drawerIcon: ({ focused }) => (
              <Draw_Preferences
                style={{
                  color: focused ? theme.colors.secondary : theme.colors.text,
                }}
              />
            ),
            drawerLabel: ({ focused }) => (
              <DrawerLabel
                label="Preferences"
                theme={theme}
                focused={focused}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="privacyPolicy" // This is the name of the page and must match the url from root
          options={{
            drawerActiveBackgroundColor: "#DCEAF2",
            header: (props) => {
              return (
                <MyHeader
                  {...props}
                  showBackIcon
                  title="Privacy Policy"
                  hideCenter
                  theme={theme}
                />
              );
            },
            drawerIcon: ({ focused }) => (
              <Draw_Policy
                style={{
                  color: focused ? theme.colors.secondary : theme.colors.text,
                }}
              />
            ),
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
            header: (props) => {
              return (
                <MyHeader
                  {...props}
                  showBackIcon
                  title="Terms & Conditions"
                  hideCenter
                  theme={theme}
                />
              );
            },
            drawerIcon: ({ focused }) => (
              <Draw_Policy
                style={{
                  color: focused ? theme.colors.secondary : theme.colors.text,
                }}
              />
            ),
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
    </>
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
      textColor={focused ? theme.colors.secondary : theme.colors.text}
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
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: colors.light.secondary,
  },
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
  },
});
