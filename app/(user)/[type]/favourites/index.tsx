import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { MyListItem, GapView, MyText, Card, OverlayLoader } from "@components";
import { MyTheme, UserType } from "@types";
import { handleGetFavorite, PropertyResponse } from "./utils";
import { PropertyItem } from "../(tabs)/home/utils";
import { formatPrice } from "app/utils/priceConverter";
import { useGlobalSearchParams } from "expo-router";

export default function Favourite() {
  const theme = useTheme() as MyTheme;
  const [favorites, setFavorites] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useGlobalSearchParams<{ type: UserType }>();

  const mapPropertyToItem = (property: PropertyResponse): PropertyItem => ({
    id: property.propertyId,
    userId: property.userId,
    propertyName: property.property.propertyName,
    propertyPrice: formatPrice(property.property.propertyPrice)+" PKR",
    propertyArea: property.property.propertyArea,
    purpose: property.property.purpose,
    propertyAddress: property.property.propertyAddress,
    propertyCity: property.property.propertyCity,
    propertyZip: property.property.propertyZip,
    propertyDescription: property.property.propertyDescription,
    longitude: property.property.longitude,
    latitude: property.property.latitude,
    propertyBy: property.property.propertyBy,
    proposalCount: property.property.proposalCount,
    propertyStatus: property.property.propertyStatus,
    isFeatured: property.property.isFeatured,
    isDeleted: property.property.isDeleted,
    propertyTypeId: property.property.propertyTypeId,
    image:[],
    video:[],
    createdAt: property.property.createdAt,
    updatedAt: property.property.updatedAt,
    amenities: property.property.amenities || [],
    propertyType: {
      ...property.propertyType,
      url: property.propertyType?.url || '',
    },
    PropertyData: property.property.PropertyData || [],
    user: {
      id: property.userId,
    },
    isFavourite: true
  });

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await handleGetFavorite(params.type);
      setLoading(true);
      if (result.status) {
        const mappedFavorites = result.properties?.map(mapPropertyToItem) || [];
        if (mappedFavorites.length == 0) setError('No Properties found');
        setFavorites(mappedFavorites)
      } else {
        setError(result.message || 'Failed to load favorites.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching favorites.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const renderItem = ({ index, item }: { index: number; item: PropertyItem }) => (
    <MyListItem
      item={item}
      index={index}
      theme={theme}
      params={params}
      fav={item.isFavourite}
      isFavRed={true}
      onFavClicked={() => fetchFavorites()}
    />
  );

  const renderError = () => (
    <View style={styles(theme).errorContainer}>
      <MyText text={typeof error === 'string' ? error : 'An unknown error occurred.'} size={16} textColor="red" />
      <TouchableOpacity onPress={fetchFavorites}>
        <MyText text="Retry" size={16} textColor={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles(theme).container}>
      <OverlayLoader isShow={loading} />
      {error ? (
        renderError()
      ) : favorites.length === 0 ? (
        <View style={styles(theme).errorContainer}>
          <MyText text="No Properties found" size={16} textColor="red" />
          <TouchableOpacity onPress={fetchFavorites}>
            <MyText text="Retry" size={16} textColor={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      ) : (
        <Card style={styles(theme).cardContainer}>
          <View style={styles(theme).innerContainer}>
            <View style={styles(theme).singleTab}>
              <MyText
                text="Favourites"
                size={16}
                textColor={theme.colors.primary}
                weight="700"
              />
            </View>
          </View>
          <View style={styles(theme).searchList}>
            <FlatList
              data={favorites}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => <GapView length={36} />}
              ItemSeparatorComponent={() => <GapView />}
              keyExtractor={(item) => item.id}
            />
          </View>
        </Card>
      )}
    </View>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 10 },
    cardContainer: {
      flex: 1,
      alignSelf: "center",
      marginTop: 12,
      borderColor: theme?.colors.border,
    },
    innerContainer: {
      borderBottomWidth: 1,
      marginTop: 8,
      marginBottom: 4,
      borderColor: theme?.colors.border,
    },
    singleTab: {
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderBottomColor: theme?.colors.primary,
      borderBottomWidth: 2,
      marginLeft: "3%",
      width: "24%",
    },
    searchList: {
      padding: 11,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });