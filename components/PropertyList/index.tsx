import { FlatList, Image, TouchableOpacity, View } from "react-native";

import { MyTheme } from "@types";
import Card from "../Card";
import GapView from "../GapView";
import MyText from "../MyText";
import { PropertyItem } from "app/(user)/[type]/(tabs)/home/utils";

const PropertyListing = ({
  title,
  data,
  theme,
}: {
  title?: string;
  data:PropertyItem[] | null
  theme?: MyTheme;
}) => {

  function renderList({ item, index }: { item: any; index: number }) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
        }}
      >
        <Card radius={2} style={{ height: 180, width: 130 }}>
          <Image
            source={{ uri: item?.propertyImage || "https://picsum.photos/id/299/620" }}
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
              text={item.propertyName}
              numberOfLines={1}
              size={10}
              textColor={theme?.colors.text}
              style={{ marginBottom: 8 }}
            />
            <MyText
              text={item.propertyAddress}
              size={10}
              numberOfLines={1}
              weight="500"
              textColor={theme?.colors.listText}
              style={{ marginBottom: 8 }}
            />
            <MyText
              text={item.propertyArea+" Sq .ft"}
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
