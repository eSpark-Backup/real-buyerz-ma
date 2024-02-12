import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import {
  Card,
  GapView,
  MyAvatar,
  MyButton,
  MyText,
  PropertyList,
} from "@components";
import {
  HomeOutline,
  HomeSmall,
  KeySmallIcon,
  MiniArrow,
} from "@assets/images";
import { MyTheme } from "@types";

const data = {
  name: "Arman Khan",
  avatarURL: "https://picsum.photos/id/151/130",
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat",
  location: "Karachi",
  sale: {
    plots: 34,
    houses: 7,
    commercials: 5,
  },
  rent: {
    plots: 34,
    houses: 7,
    commercials: 5,
  },
};

interface PropertriesCardProps {
  sale?: boolean;
  plots: number;
  houses: number;
  commercials: number;
  style?: ViewStyle;
}

const AgentProfile = () => {
  const theme = useTheme() as MyTheme;
  const [title, setTitle] = useState("Recent Properties");

  useEffect(() => setTitle("Recent Properties By " + data.name), []);
  return (
    <ScrollView contentContainerStyle={styles(theme).main}>
      <MyAvatar imageUrl={{ uri: data.avatarURL }} size={100} />
      <MyText
        size={16}
        weight="500"
        text="Arman Khan"
        textColor={theme.colors.secondary}
        style={{ paddingVertical: 10 }}
      />
      <MyButton
        label="Lets talk"
        style={styles(theme).button}
        labelStyle={styles(theme).label}
      />
      <CustomCard
        location={data.location}
        forSale={data.sale.commercials + data.sale.houses + data.sale.plots}
        forRent={data.rent.commercials + data.rent.houses + data.rent.plots}
      />
      {/* custom cards */}
      <MyText size={16} weight="500" style={styles(theme).name}>
        Properties By {data.name}
      </MyText>

      <PropertriesCard
        plots={data.sale.plots}
        houses={data.sale.houses}
        commercials={data.sale.commercials}
        sale
      />
      <GapView length={10} />
      <PropertriesCard
        plots={data.rent.plots}
        houses={data.rent.houses}
        commercials={data.rent.commercials}
      />
      <MyText size={16} weight="500" style={styles(theme).about}>
        About {data.name}
      </MyText>
      <MyText size={12} textColor={theme.colors.listText}>
        {data.desc}
      </MyText>
      <View style={{ width: "100%" }}>
        <PropertyList theme={theme} title={title} />
      </View>
      <GapView length={20} />
    </ScrollView>
  );
};

const PropertriesCard = ({
  plots,
  houses,
  commercials,
  sale,
  style,
}: PropertriesCardProps) => {
  const theme = useTheme() as MyTheme;
  return (
    <>
      <View
        style={[styles(theme).cardContainer, { paddingVertical: 10 }, style]}
      >
        <HomeSmall />
        <MyText size={12} style={{ width: "80%" }}>
          {plots + houses + commercials} Properties for {sale ? "sale" : "rent"}
        </MyText>
        <TouchableOpacity activeOpacity={1} style={styles(theme).viewAll}>
          <MyText size={12} textColor={theme.colors.primary} text="View All" />
          <MiniArrow />
        </TouchableOpacity>
      </View>
      <View style={styles(theme).cardContainer}>
        <Card style={styles(theme).card}>
          <MyText size={16} textColor={theme.colors.secondary} weight="700">
            {plots}
          </MyText>
          <MyText>Plots</MyText>
        </Card>
        <Card style={styles(theme).card}>
          <MyText size={16} textColor={theme.colors.secondary} weight="700">
            {houses}
          </MyText>
          <MyText>Houses</MyText>
        </Card>
        <Card style={styles(theme).card}>
          <MyText size={16} textColor={theme.colors.secondary} weight="700">
            {commercials}
          </MyText>
          <MyText>Commercials</MyText>
        </Card>
      </View>
    </>
  );
};

interface CustomCardProps {
  location?: string;
  forSale?: number;
  forRent?: number;
}

const CustomCard = ({ location, forSale, forRent }: CustomCardProps) => {
  const theme = useTheme() as MyTheme;

  return (
    <Card style={styles(theme).customCardContainer}>
      <View style={styles(theme).box}>
        <Ionicons
          name="location-outline"
          size={14}
          color={theme.colors.primary}
        />
        <MyText
          size={12}
          weight="500"
          textColor={theme.dark ? theme.colors.text : theme.colors.listText}
        >
          {location}
        </MyText>
      </View>
      <View style={styles(theme).box}>
        <HomeOutline />
        <MyText
          size={12}
          weight="500"
          textColor={theme.dark ? theme.colors.text : theme.colors.listText}
        >
          {forSale} For Sale
        </MyText>
      </View>
      <View style={styles(theme).lastBox}>
        <KeySmallIcon />
        <MyText
          size={12}
          weight="500"
          textColor={theme.dark ? theme.colors.text : theme.colors.listText}
        >
          {forRent} For Rent
        </MyText>
      </View>
    </Card>
  );
};

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    main: {
      alignItems: "center",
      width: "90%",
      alignSelf: "center",
      paddingTop: "2%",
    },
    cardContainer: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
    },
    card: {
      width: "30%",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      backgroundColor: theme?.colors.background,
      width: 90,
      height: 35,
      elevation: 4,
      borderRadius: 17,
      marginBottom: 15,
    },
    label: {
      color: theme?.dark ? theme?.colors.text : theme?.colors.secondary,
    },
    name: { alignSelf: "flex-start", paddingTop: 53, paddingBottom: 5 },
    about: { alignSelf: "flex-start", marginTop: 25, paddingBottom: 15 },
    viewAll: { flexDirection: "row", alignItems: "center" },
    customCardContainer: {
      flexDirection: "row",
      backgroundColor: theme?.dark ? theme.colors.card : "#F6F6F6",
      height: 60,
      alignItems: "center",
      justifyContent: "space-between",
    },
    box: {
      width: "33.33%",
      alignItems: "center",
      borderRightWidth: 1,
      borderRightColor: theme?.colors.border,
      gap: 4,
    },
    lastBox: {
      width: "33.33%",
      gap: 4,
      alignItems: "center",
    },
  });

export default AgentProfile;
