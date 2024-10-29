import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { useRoute, useTheme } from "@react-navigation/native";

import {
  BathOutline,
  BedOutline,
  LandPlot,
  Parking,
  LikeActiveButton,
  LikeButton,
} from "@assets/images";
import MyText from "../MyText";
import PrimaryBtn from "../MyButton/primaryBtn";
import { MyListItemProps, MyTheme } from "@types";
import { dummyImage } from "@constants";
import { isImageUrl } from "@utils/functions";
import { useRouter } from "expo-router";
import { addFavorite } from "./utils";

const MyListItem: React.FC<MyListItemProps> = ({ item, index, theme, fav, onFavClicked, params }) => {
  const images = item?.PropertyData?.filter(val => val.type == "image")
  const router = useRouter()

  const handleFavClicked = () => {
    addFavorite(item.id);
    setTimeout(() => {
      onFavClicked?.();
    }, 100); 
  };
  
  return (
    <Pressable onPress={() => {
      router.navigate({
        pathname: `(user)/${params?.type!}/(tabs)/home/propertyDetail`,
        params: {
          item: JSON.stringify(item)
        }
      });
    }} style={styles(theme).searchItem}>
      <View>
        <Image source={{ uri: (images && images.length > 0 && isImageUrl(images[0].url)) ? images[0].url : dummyImage }} style={styles(theme).image} />
        <TouchableOpacity activeOpacity={1} style={styles(theme).likeBtn} onPress={() => handleFavClicked()}>
          {fav ? <LikeActiveButton /> : <LikeButton />}
        </TouchableOpacity>
      </View>
      <View style={styles(theme).rows}>
        <View style={styles(theme).row1}>
          <MyText
            text={item.propertyName}
            textColor={theme.colors.listText}
            size={12}
            style={{ width: "59%" }}
          />
          <View style={styles(theme).row1_inner}>
            <MyText text="PKR " size={12} />
            <MyText
              text={item.propertyPrice?.toString()}
              size={14}
              textColor={theme.colors.text}
              weight="500"
            />
          </View>
        </View>
        <MyText
          text={item?.propertyAddress}
          textColor={theme.colors.text}
          size={14}
          numberOfLines={2}
        />
        <View style={styles(theme).row1}>
          <View style={styles(theme).row3_inner}>
            <BedOutline style={{ color: theme.colors.text }} />
            <MyText
              text={"2".toString().padStart(2, "0")}
              style={styles(theme).miniText}
              size={10}
              weight="300"
            />
          </View>
          <View style={styles(theme).row3_inner}>
            <BathOutline style={{ color: theme.colors.text }} />
            <MyText
              text={"2".toString().padStart(2, "0")}
              style={styles(theme).miniText}
              size={10}
              weight="300"
            />
          </View>
          <View style={styles(theme).row3_inner}>
            <Parking style={{ color: theme.colors.text }} />
            <MyText
              text={"2".toString().padStart(2, "0")}
              style={styles(theme).miniText}
              size={10}
              weight="300"
            />
          </View>
          <View style={styles(theme).sqft}>
            <LandPlot style={{ color: theme.colors.text }} />
            <MyText
              text={item?.propertyArea?.toString().padStart(2, "0") + " sqft"}
              style={styles(theme).miniText}
              size={10}
              weight="300"
            />
          </View>
        </View>

        {fav ? (
          <View style={styles(theme).button_row}>
            <PrimaryBtn
              title="View"
              textColor="#ffffff"
              width="47%"
              weight="500"
              paddingV={6}
              onPress={() => console.log("asd")}
            />
            <PrimaryBtn
              title="Agent"
              textColor="#ffffff"
              width="47%"
              paddingV={6}
              onPress={() => console.log("asd")}
            />
          </View>
        ) : (
          <MyText
            text={"Posted 3 hours ago"}
            size={10}
            textColor={theme.colors.listText}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      borderColor: "#E4E4E4",
      borderWidth: 1,
      borderRadius: 9,
    },
    singleTab: {
      height: 40,
      justifyContent: "center",
      borderBottomColor: theme?.colors.primary,
      borderBottomWidth: 2,
      marginLeft: "3%",
      width: "20%",
    },
    searchList: {
      flex: 1,
      padding: 11,
    },
    searchItem: {
      flexDirection: "row",
      height: 150,
      padding: 10,
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme?.colors.border,
    },
    rows: {
      flex: 1,
      height: 120,
      marginLeft: 5,
      justifyContent: "space-between",
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 2,
    },
    likeBtn: {
      position: "absolute",
      alignSelf: "flex-end",
      padding: 1,
    },
    row1: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    row1_inner: {
      flexDirection: "row",
      alignItems: "center",
      height: "100%",
      paddingBottom: 13,
    },
    row3_inner: {
      flexDirection: "row",
      alignItems: "center",
    },
    miniText: { marginLeft: 5, opacity: 0.8 },
    sqft: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 5,
    },
    prim_button: {
      height: 25,
    },
    button_row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "88%",
    },
  });

export default MyListItem;
