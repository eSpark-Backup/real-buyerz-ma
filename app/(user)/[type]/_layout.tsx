import React, { useEffect } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch } from "react-redux";
import { colors } from "@theme";
import { MyTheme, UserType } from "@types";
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
import {
  BubbleIcon,
  GapView,
  MyAvatar,
  MyHeader,
  MyPopupModal,
  MyText,
} from "@components";
import { useState } from "react";
import useSessionManagement from "hooks/useSessionManagement";
import { setUserData, setUserToken, UserState } from "features/user/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { storage } from "store/mmkv";

const DrawerContent = (props: DrawerContentComponentProps) => {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const params = useLocalSearchParams<{ type: UserType }>();
  const theme = useTheme() as MyTheme;
  const { clearSession, clearTheme } = useSessionManagement();
  const dispatch = useDispatch();
  const { userData } = useSelector<RootState, UserState>((state) => state.user);

  console.log("param milrha hai kiya " + JSON.stringify(params));
  const handleLogout = () => {
    if (userData?.socialLogin) {
      handleSignOut();
    }
    clearTheme();
    clearSession();
    dispatch(setUserToken(""));
    dispatch(setUserData(""));
    router.replace("/auth/SignIn/signIn"); // Redirect user to sign-in screen
  };

  const handleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <MyAvatar
            imageUrl={{
              uri: userData?.profileImage || "https://i.pravatar.cc/300?img=68",
            }}
            size={35}
          />
          <View style={{ marginLeft: 10 }}>
            <MyText
              text={
                `${userData?.firstName} ${userData?.lastName}` || "Arman Khan"
              }
              size={16}
              weight="600"
              textColor="#ffffff"
            />
            <MyText
              text={userData?.email || "Email123@gmail.com"}
              size={12}
              textColor="#ffffff"
              style={{ marginVertical: 5 }}
            />
            {params.type === "agent" && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MyText
                  text="Available connects: "
                  size={12}
                  textColor="#ffffff"
                />
                <MyText text="50" size={12} weight="600" textColor="#ffffff" />
              </View>
            )}
          </View>
        </View>
        <BubbleIcon
          size={40}
          style={{ backgroundColor: "#fff" }}
          onPress={() => router.push(`(user)/${params?.type!}/(tabs)/profile`)}
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
            <Draw_Logout style={{ color: theme.colors.text }} />
          )}
          onPress={() => setConfirmLogout(true)}
        />
      </View>
      {Platform.OS === "ios" && <GapView />}
      <MyPopupModal visible={confirmLogout} bgDim>
        <MyPopupModal.Alert
          message="Are you sure you want to Log out?"
          onClose={() => setConfirmLogout(false)}
          onPress={handleLogout}
        />
      </MyPopupModal>
    </View>
  );
};

export default function MainLayout() {
  const theme = useTheme() as MyTheme;
  const params = useLocalSearchParams<{ type: UserType }>();
  console.log("param idhar hai" + JSON.stringify(params));
  const [alertCounts, setAlertCounts] = useState<number>(0);
  useEffect(() => {
    const storedAlerts = JSON.parse(storage.getString("alertCount") || "[]");
    console.log("storedAlerts "+ JSON.parse(storage.getString("alertCount") || "[]"))
    const alertMap = new Map<string, number>(storedAlerts);
    const totalAlerts = Array.from(alertMap.values()).reduce((sum, count) => sum + count, 0);
    setAlertCounts(totalAlerts); 
  });

  return (
    <>
      <StatusBar backgroundColor={theme.colors.secondary} style="light" />
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        backBehavior="history"
        screenOptions={({ route }) => ({
          swipeEnabled: params?.type === "anon" ? false : true,
          header: (props) => (
            <MyHeader
              {...props}
              userType={params?.type!}
              showRight
              theme={theme}
            />
          ),
          drawerStyle: { width: "80%" },
        })}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerItemStyle: { display: "none" },
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="search"
          options={{
            headerShown: false,
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="inbox"
          options={{
            drawerActiveBackgroundColor: "#DCEAF2",
            headerShown: false,
            drawerIcon: ({ focused }) => (
              <Draw_Inbox
                style={{
                  color: focused ? theme.colors.secondary : theme.colors.text,
                }}
              />
            ),
            drawerLabel: ({ focused }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <DrawerLabel label="Inbox" theme={theme} focused={focused} />
                {alertCounts > 0 && (
                  <View
                    style={{
                      backgroundColor: "red",
                      borderRadius: 10,
                      paddingHorizontal: 6,
                      marginLeft: 8,
                      minWidth: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MyText
                      text={alertCounts.toString()}
                      size={12}
                      weight="600"
                      textColor="#fff"
                    />
                  </View>
                )}
              </View>
            ),
          }}
          initialParams={{ type: params?.type }}
        />
        <Drawer.Screen
          name="myProposals"
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
            drawerItemStyle: {
              display: params.type === "user" ? "none" : "flex",
            }, // Show for user type only
          }}
          initialParams={{ type: params.type }}
        />
        <Drawer.Screen
          name="myProperties"
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
                label={params.type === "user" ? "My Listings" : "My Properties"}
                theme={theme}
                focused={focused}
              />
            ),
          }}
          initialParams={{ type: params.type }}
        />
        <Drawer.Screen
          name="favourites"
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
          initialParams={{ type: params.type }}
        />
        <Drawer.Screen
          name="shop"
          options={{
            headerShown: false,
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
            drawerItemStyle: {
              display: params.type === "user" ? "none" : "flex",
            }, // Show for user type only
          }}
          initialParams={{ type: params.type }}
        />
        <Drawer.Screen
          name="orderHistory"
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
            drawerItemStyle: {
              display: params.type === "user" ? "none" : "flex",
            }, // Show for user type only
          }}
          initialParams={{ type: params.type }}
        />
        <Drawer.Screen
          name="preferences"
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
          initialParams={{ type: params.type }}
        />
        <Drawer.Screen
          name="privacyPolicy"
          options={{
            drawerActiveBackgroundColor: "#DCEAF2",
            header: (props) => (
              <MyHeader
                {...props}
                showBackIcon
                userType={params?.type!}
                title="Privacy Policy"
                hideCenter
                theme={theme}
              />
            ),
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
          initialParams={{ type: params.type }}
        />
        <Drawer.Screen
          name="termsAndConditions"
          options={{
            drawerActiveBackgroundColor: "#DCEAF2",
            header: (props) => (
              <MyHeader
                {...props}
                showBackIcon
                userType={params?.type!}
                title="Terms & Conditions"
                hideCenter
                theme={theme}
              />
            ),
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
          initialParams={{ type: params.type }}
        />
        <Drawer.Screen
          name="myListings"
          options={({ route }) => ({
            drawerItemStyle: { display: "none" },
            drawerLabel: () => null,
            drawerIcon: () => null,
          })}
          initialParams={{ type: params.type }}
        />
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
