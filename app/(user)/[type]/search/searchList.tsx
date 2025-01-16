import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { GapView, MyListItem, MyText, OverlayLoader } from "@components";
import { MyTheme, UserType } from "@types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store";
import { PropertySliceState, setSearch } from "features/property/propertySlice";
import { handleGetAllProperties, PropertyItem } from "../(tabs)/home/utils";

export default function SearchList() {
  const theme = useTheme() as MyTheme;
  const params = useGlobalSearchParams<{ type: UserType }>();
  const dispatch = useDispatch();
  const { search } = useSelector<RootState, PropertySliceState>(
    (state) => state.property
  );

  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchTags = Object.entries(search)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([_, value]) => value as string);

  useEffect(() => {
    fetchProperties();
  }, [search]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const filters = Object.fromEntries(
        Object.entries(search).filter(([_, value]) => value !== null)
      );
      console.log(
        "Fetching properties with filters:",
        JSON.stringify(filters)
      );
      const response = await handleGetAllProperties(params.type, filters);
      if (response?.data) {
        setProperties(response?.data.items);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  };

  const removeSearchTag = (key: string) => {
    const updatedSearch = Object.fromEntries(
      Object.entries(search).map(([k, v]) => (v === key ? [k, null] : [k, v]))
    );
    dispatch(setSearch(updatedSearch));
  };

  return (
    <View style={styles(theme).container}>
      <OverlayLoader isShow={loading} />
      <View style={styles(theme).filterList}>
        <FlatList
          data={searchTags}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <GapView mode="horizontal" />}
          renderItem={({ item, index }) =>
            renderTagList({ index, item, theme, removeSearchTag })
          }
        />
      </View>
      {properties.length === 0 ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <MyText>No Properties Found</MyText>
        </View>
      ) : (
        <View style={styles(theme).searchList}>
          <FlatList
            data={properties}
            renderItem={({ index, item }) => (
              <MyListItem
                item={item}
                index={index}
                theme={theme}
                onFavClicked={() => fetchProperties()}
                fav={item.isFavourite}
                isFavRed={false}
                params={params}
              />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <GapView />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
}

const renderTagList = ({
  item,
  index,
  theme,
  removeSearchTag,
}: {
  item: string;
  index: number;
  theme: MyTheme;
  removeSearchTag: (key: string) => void;
}) => {
  return (
    <View style={styles(theme).filterItem}>
      <Ionicons
        name="close"
        color={theme.colors.text}
        size={16}
        onPress={() => removeSearchTag(item)}
      />
      <GapView mode="horizontal" />
      <MyText text={item} size={12} />
    </View>
  );
};

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    filterList: {
      paddingVertical: 10,
    },
    filterItem: {
      flexDirection: "row",
      padding: 10,
      borderRadius: 20,
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme?.colors.border,
    },
    searchList: {
      flex: 1,
      paddingTop: 10,
    },
  });