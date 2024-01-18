import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
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
          drawerLabel: "Inbox",
        }}
      />
      <Drawer.Screen
        name="myProposals" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "My Proposals",
        }}
      />
      <Drawer.Screen
        name="myProperties" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "My Properties",
        }}
      />
      <Drawer.Screen
        name="favorites" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Favorites",
        }}
      />
      <Drawer.Screen
        name="shop" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Shop",
        }}
      />
      <Drawer.Screen
        name="orderHistory" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Order History",
        }}
      />
      <Drawer.Screen
        name="preferences" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Preferences",
        }}
      />
      <Drawer.Screen
        name="privacyPolicy" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Privacy Policy",
        }}
      />
      <Drawer.Screen
        name="termsAndConditions" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Terms and conditions",
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
