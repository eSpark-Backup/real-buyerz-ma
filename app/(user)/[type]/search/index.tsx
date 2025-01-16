import React from "react";
import { StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "@react-navigation/native";
import {
  Card,
  GapView,
  MyDropdown,
  MyText,
  SearchBar,
  TabFilter,
  MyButton,
} from "@components";
import { MyTheme, SearchListProps, UserType } from "@types";
import { PropertySliceState, setSearch } from "features/property/propertySlice";
import { RootState } from "@store";
import { useSelector, useDispatch } from "react-redux";

export default function Search() {
  const theme = useTheme() as MyTheme;
  const params = useLocalSearchParams<{ type: UserType }>();
  const dispatch = useDispatch();
  const { search, propertyTypes } = useSelector<RootState, PropertySliceState>(
    (state) => state.property
  );

  const handleSearch = () => {
    console.log("Search parameters: ", JSON.stringify(search));

    router.push(`(user)/${params?.type!}/search/searchList`);
  };

  const handleClearSearch = () => {
    dispatch(
      setSearch({
        propertyType: null,
        propertySubType: null,
        propertyCity: null,
        purpose: null,
        propertyName: null,
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchBar
          leftIcon
          clearIcon
          onValueChange={(value) =>
            dispatch(
            setSearch({
              ...search,
              propertyName: value,
            })
          )
        }
        />
      </View>

      <GapView length={25} />

      <View style={styles.purpose}>
        <MyDropdown
          id="purpose"
          placeholder="Select Purpose"
          data={["Buy", "Rent", "Sell"]}
          theme={theme}
          onSelect={(val) => {
            dispatch(
              setSearch({
                ...search,
                purpose: val.value[0],
              })
            );
          }}
          style={{ width: "100%" }}
          height={40}
        />
      </View>

      <GapView length={30} />

      <View style={styles.city}>
        <MyDropdown
          id="propertyCity"
          placeholder="Select City"
          multiSelect={false}
          zIndex={8}
          data={[
            "Karachi",
            "Lahore",
            "Islamabad",
            "Quetta",
            "Peshawar",
            "Sialkot",
          ]}
          onSelect={(value) =>
            dispatch(
              setSearch({
                ...search,
                propertyCity: value.value[0],
              })
            )
          }
          theme={theme}
          style={{ width: "100%" }}
          height={40}
        />
      </View>

      <GapView length={30} />

      <View style={styles.genre}>
        <TabFilter
          isSearch
          data={
            propertyTypes?.map((type) => ({
              id: type.id,
              title: type.typeName,
              list:
                type.subTypes?.map((subType) => ({
                  id: type.id,
                  label: subType.typeName,
                })) || [],
            })) || []
          }
          onSelect={(selected: SearchListProps[]) => {
            const propertyType =
              propertyTypes?.find((item) => item.id === selected[0].id)
                ?.typeName || null;
            const propertySubType = selected?.[0]?.label || null;
            console.log("selected hogya" + JSON.stringify(propertyTypes));
            dispatch(
              setSearch({
                ...search,
                propertyType,
                propertySubType,
              })
            );
          }}
        />
      </View>

      <View style={styles.button}>
        <MyButton
          label="Clear Filter"
          textColor={theme.colors.primary}
          backgroundColor="transparent"
          onPress={handleClearSearch}
          style={{
            borderRadius: 4,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderWidth: 1,
            borderColor: theme.colors.primary,
          }}
          labelStyle={{ fontSize: 15 }}
        />
        <GapView mode="horizontal" length={5} />
        <MyButton
          label="Search"
          textColor="#ffffff"
          backgroundColor={theme.colors.primary}
          onPress={handleSearch}
          style={{ borderRadius: 4, paddingHorizontal: 21, paddingVertical: 6 }}
          labelStyle={{ fontSize: 15 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  searchBar: {
    height: 46,
    width: "100%",
  },
  purpose: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  city: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  genre: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    marginTop: 50,
  },
});
