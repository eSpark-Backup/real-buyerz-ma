import { FlatList, Image, TouchableOpacity, View } from "react-native";

import { MyTheme } from "@types";
import Card from "../Card";
import GapView from "../GapView";
import MyText from "../MyText";
import { useTheme } from "@react-navigation/native";

const PropertyListing = ({
  title,
  theme,
}: {
  title?: string;
  theme?: MyTheme;
}) => {
  const data = [
    {
      id: 0,
      name: "Mount Khalid",
      location: "Gulberg",
      image: "https://picsum.photos/id/151/130",
      size: "1155 sqft to 2684 sqft",
    },
    {
      id: 1,
      name: "Mount Khalid",
      location: "Gulberg",
      image: "https://picsum.photos/id/153/130",
      size: "1155 sqft to 2684 sqft",
    },
    {
      id: 2,
      name: "Mount Khalid",
      location: "Gulberg",
      image: "https://picsum.photos/id/162/130",
      size: "1155 sqft to 2684 sqft",
    },
  ];

  function renderList({ item, index }: { item: any; index: number }) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          console.log("Hello world");
        }}
      >
        <Card radius={2} style={{ height: 180, width: 130 }}>
          <Image
            source={{ uri: item?.image }}
            style={{ height: 80, borderRadius: 2 }}
          />
          <View style={{ padding: 8 }}>
            <MyText
              text="Contact for price"
              size={12}
              textColor={theme?.colors.text}
              weight="500"
              style={{ marginBottom: 8 }}
            />
            <MyText
              text={item.name}
              size={10}
              textColor={theme?.colors.text}
              style={{ marginBottom: 8 }}
            />
            <MyText
              text={item.location}
              size={10}
              weight="500"
              textColor={theme?.colors.listText}
              style={{ marginBottom: 8 }}
            />
            <MyText
              text={item.size}
              size={10}
              textColor={theme?.colors.listText}
              style={{ marginBottom: 8 }}
            />
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <Card style={{ width: "100%", marginTop: 30 }} radius={10}>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderList}
          ItemSeparatorComponent={() => <GapView mode="horizontal" />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </Card>
  );
};

export default PropertyListing;
