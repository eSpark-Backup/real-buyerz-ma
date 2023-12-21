import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import {
  Card,
  GapView,
  MyAvatar,
  MyButton,
  MyText,
  PropertyList,
} from "@components";
import { useTheme } from "@react-navigation/native";
import { MyTheme } from "@types";
import { HomeSmall, MiniArrow } from "@assets/images";

const data = {
  name: "Arman Khan",
  avatarURL: "https://picsum.photos/id/151/130",
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat",
  sale: {
    plots: 34,
    houses: 7,
    commercials: 5,
  },
};

const AgentProfile = () => {
  const theme = useTheme() as MyTheme;
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
      }}
    >
      <MyAvatar imageUrl={data.avatarURL} size={100} />
      <MyText
        size={16}
        weight="500"
        text="Arman Khan"
        textColor={theme.colors.secondary}
      />
      <MyButton
        label="Lets talk"
        style={{
          backgroundColor: theme.colors.background,
          width: 90,
          height: 35,
          elevation: 4,
          borderRadius: 17,
        }}
        labelStyle={{ color: theme.colors.secondary }}
      />
      {/* custom cards */}
      <MyText size={16} weight="500" style={{ alignSelf: "flex-start" }}>
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
        plots={data.sale.plots}
        houses={data.sale.houses}
        commercials={data.sale.commercials}
      />
      <MyText
        size={16}
        weight="500"
        style={{ alignSelf: "flex-start", marginTop: 25 }}
      >
        About {data.name}
      </MyText>
      <MyText size={12} textColor={theme.colors.listText}>
        {data.desc}
      </MyText>
      <View style={{ width: "100%" }}>
        <PropertyList theme={theme} title="Recent Properties " />
      </View>
    </ScrollView>
  );
};

interface PropertriesCardProps {
  sale?: boolean;
  plots: number;
  houses: number;
  commercials: number;
}

const PropertriesCard = ({
  plots,
  houses,
  commercials,
  sale,
}: PropertriesCardProps) => {
  const theme = useTheme() as MyTheme;
  return (
    <>
      <View style={styles(theme).top}>
        <HomeSmall />
        <MyText size={12} style={{ width: "80%" }}>
          {plots + houses + commercials} Properties for {sale ? "sale" : "rent"}
        </MyText>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MyText size={12} textColor={theme.colors.primary} text="View All" />
          <MiniArrow />
        </TouchableOpacity>
      </View>
      <View style={styles(theme).main}>
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

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    main: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
    },
    top: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingVertical: 10,
    },
    card: {
      width: "30%",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default AgentProfile;
