import { Pressable, StyleSheet, LayoutAnimation, View } from "react-native";
import React, { useState } from "react";
import { BubbleIcon, GapView, MyText } from "@components";
import { useTheme } from "@react-navigation/native";
import { MyTheme } from "@types";
import { ScrollView } from "react-native-gesture-handler";
import { DownArrow } from "@assets/images";

const temp = [
  {
    id: "Arman Khan",
    description: "Basic + 90 connection",
    date: "01-02-24",
    time: "09:22 PM",
    cost: "3500",
    basicPackagePrice: 1000,
    connectionsPrice: 2500,
    numConnections: 1500,
  },
  {
    id: "Arman Khan",
    description: "Basic + 90 connection",
    date: "01-02-24",
    time: "09:22 PM",
    cost: "3500",
    basicPackagePrice: 1000,
    connectionsPrice: 2500,
    numConnections: 1500,
  },
  {
    id: "Arman Khan",
    description: "Basic + 90 connection",
    date: "01-02-24",
    time: "09:22 PM",
    cost: "3500",
    basicPackagePrice: 1000,
    connectionsPrice: 2500,
    numConnections: 1500,
  },
  {
    id: "Arman Khan",
    description: "Basic + 90 connection",
    date: "01-02-24",
    time: "09:22 PM",
    cost: "3500",
    basicPackagePrice: 1000,
    connectionsPrice: 2500,
    numConnections: 1500,
  },
  {
    id: "Arman Khan",
    description: "Basic + 90 connection",
    date: "01-02-24",
    time: "09:22 PM",
    cost: "3500",
    basicPackagePrice: 1000,
    connectionsPrice: 2500,
    numConnections: 1500,
  },
  {
    id: "Arman Khan",
    description: "Basic + 90 connection",
    date: "01-02-24",
    time: "09:22 PM",
    cost: "3500",
    basicPackagePrice: 1000,
    connectionsPrice: 2500,
    numConnections: 1500,
  },
  {
    id: "Arman Khan",
    description: "Basic + 90 connection",
    date: "01-02-24",
    time: "09:22 PM",
    cost: "3500",
    basicPackagePrice: 1000,
    connectionsPrice: 2500,
    numConnections: 1500,
  },
  {
    id: "Arman Khan",
    description: "Basic + 1000 connection",
    date: "01-02-24",
    time: "09:22 PM",
    cost: "3500",
    basicPackagePrice: 1000,
    connectionsPrice: 2500,
    numConnections: 1500,
  },
];

export default function OrderHistory() {
  const theme = useTheme() as MyTheme;

  return (
    <ScrollView style={styles(theme).main} showsVerticalScrollIndicator={false}>
      <MyText weight="500" size={16}>
        OrderHistory
      </MyText>
      <GapView length={10} />
      <MyText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis
        gravida lectus nec sodales.
      </MyText>
      <GapView length={20} />
      <View style={styles(theme).container}>
        <View style={styles(theme).header}>
          {["Description", "Time", "Cost"].map((item) => (
            <MyText
              key={item}
              weight="600"
              style={styles().headerText}
              textColor={theme.colors.placeholderText}
            >
              {item}
            </MyText>
          ))}
        </View>
        {temp.map((item, index) => (
          <OrderRow
            description={item.description}
            time={item.time}
            cost={item.cost}
            id={item.id}
            date={item.date}
            basicPackagePrice={item.basicPackagePrice}
            connectionsPrice={item.connectionsPrice}
            numConnections={item.numConnections}
          />
        ))}
      </View>
    </ScrollView>
  );
}

interface OrderRowProps {
  id: string;
  description: string;
  date: string;
  time: string;
  cost: string;
  basicPackagePrice?: number;
  connectionsPrice?: number;
  numConnections?: number;
}
function OrderRow({
  id,
  date,
  description,
  time,
  cost,
  basicPackagePrice = 0,
  connectionsPrice = 0,
  numConnections,
}: OrderRowProps) {
  const theme = useTheme() as MyTheme;
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };
  return (
    <View>
      <Pressable style={styles(theme).row} onPress={toggleExpand}>
        {[description, time, cost].map((item, index) =>
          index === 2 ? (
            <MyText key={item} weight="500" style={styles().rowText}>
              Rs. {item}
            </MyText>
          ) : (
            <MyText key={item} weight="500" style={styles().rowText}>
              {item}
            </MyText>
          )
        )}
        {/* need to change downArrow to upArrow; svg required */}
        <BubbleIcon size={16} plain onPress={toggleExpand}>
          <DownArrow />
        </BubbleIcon>
      </Pressable>
      {expanded && (
        <View
          style={{
            backgroundColor: "#f5f5f5",
            paddingHorizontal: 20,
            paddingVertical: 10,
            gap: 5,
          }}
        >
          <MyText textColor={theme.colors.listText} size={13} weight="500">
            ID: {id}
          </MyText>
          <MyText textColor={theme.colors.listText} size={13} weight="500">
            Description: {description}
          </MyText>
          <MyText textColor={theme.colors.listText} size={13} weight="500">
            Date: {date}
          </MyText>
          <MyText textColor={theme.colors.listText} size={13} weight="500">
            Time: {time}
          </MyText>
          <GapView length={0} />
          <View
            style={{
              borderTopWidth: 1,
              borderStyle: "dashed",
              borderColor: theme.colors.border,
            }}
          >
            {basicPackagePrice && (
              <View style={styles().pricing}>
                <MyText weight="500">Basic Package</MyText>
                <MyText weight="500">Rs. {basicPackagePrice}</MyText>
              </View>
            )}
            {numConnections && (
              <View style={styles().pricing}>
                <MyText weight="500">{numConnections} Connections</MyText>
                <MyText weight="500">Rs. {connectionsPrice}</MyText>
              </View>
            )}
            <View style={styles().pricing}>
              <MyText weight="600" size={16}>
                Total
              </MyText>
              <MyText size={16} weight="600">
                Rs. {cost}
              </MyText>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    main: { paddingVertical: 27, paddingHorizontal: 20 },
    container: {
      borderWidth: 1,
      width: "100%",
      alignSelf: "center",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderColor: theme?.colors.border,
      marginBottom: 50,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingRight: 27,
      paddingVertical: 17,
    },
    headerText: { width: "33%", textAlign: "center" },
    row: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      paddingRight: 20,
      paddingVertical: 20,
      alignItems: "center",
      borderTopWidth: 1,
      borderColor: theme?.colors.border,
    },
    rowText: { width: "36%", textAlign: "center" },
    pricing: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 5,
    },
  });
