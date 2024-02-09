import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "@react-navigation/native";

import {
  GapView,
  MyCheckbox,
  MyDropdown,
  ListingIcon,
  MyInput,
  MyText,
  PrimaryBtn,
  TabFilter,
  ToggleSwitch,
  MyPopupModal,
} from "@components";
import {
  AddIcon,
  AmenitiesBed,
  AmenitiesParking,
  AmenitiesTub,
  Basketball,
  BusinessCentre,
  Clubhouse,
  Concierge,
  Corridor,
  Electricity,
  EyePrimary,
  Fitness,
  Generator,
  Maintenance,
  Map,
  Masjid,
  Minus,
  Park,
  Pet,
  Playground,
  Plus,
  Rails,
  RentTab,
  RooftopTerrace,
  SecurityCam,
  SellTab,
  SeniorCitizenArea,
  ServantArea,
  Swimming,
  TickPrimary,
  UtilityStore,
  Wall,
  Washing,
  Well,
} from "@assets/images";
import { data, testData } from "@constants";
import { MyTheme } from "@types";

interface CustomTableProps {
  children?: React.ReactNode;
  title?: string;
  indexIcon: number;
}
interface SvgIcon {
  [key: number]: any;
}
interface RequiredTextProps {
  text: string;
}
interface AmenitiesPopupProps {
  isVisible: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export default function Listing() {
  const theme = useTheme() as MyTheme;
  const [visible, setVisible] = useState(false);

  return (
    <ScrollView
      style={styles(theme).conatiner}
      contentContainerStyle={{ alignItems: "center" }}
      showsVerticalScrollIndicator={false}
    >
      <MyText
        text="Reach Millions of Buyers on our Platforms"
        textColor={theme.colors.negative}
        weight="500"
        size={16}
      />
      <MyText
        text="In a few simple steps!"
        size={15}
        textColor={theme.colors.placeholderText}
      />
      <GapView length={20} />
      <AdInformation />
      <GapView length={20} />
      <LocationAndPurpose />
      <GapView length={20} />
      <PropertySizeandPricing />
      <GapView length={20} />
      <FeaturesAndAmenities />
      <GapView length={20} />
      <PropertyImagesAndVideo />
      <View style={styles(theme).footerButtons}>
        <PrimaryBtn btnStyle={styles(theme).eye}>
          <EyePrimary />
        </PrimaryBtn>
        <PrimaryBtn
          title="Save as draft"
          btnStyle={styles(theme).draft}
          textColor={theme.colors.primary}
          weight="500"
        />
        <PrimaryBtn
          title="Submit Ad"
          weight="500"
          width={100}
          onPress={() => setVisible(true)}
        />
      </View>
      <MyPopupModal
        successMessage
        visible={visible}
        message="Your Ad is submitted successfully"
        onClose={() => {
          setVisible(false);
        }}
      />
    </ScrollView>
  );
}

function CustomTable({ title, indexIcon, children }: CustomTableProps) {
  const theme = useTheme() as MyTheme;
  return (
    <View style={styles(theme).passListWrapper}>
      <View>
        <View style={styles(theme).headingStyle}>
          <View style={styles(theme).titleContainer}>
            <ListingIcon iconIndex={indexIcon} square width={33} height={33} />
            <MyText
              text={title}
              size={16}
              weight="600"
              textColor={theme.colors.negative}
            />
          </View>
        </View>
        <View style={styles().children}>{children}</View>
      </View>
    </View>
  );
}

function AdInformation() {
  const theme = useTheme() as MyTheme;
  return (
    <CustomTable title="Ad Information" indexIcon={0}>
      <View style={styles().AdInfo}>
        <ListingIcon iconIndex={1} />
        <View style={styles().AdField}>
          <RequiredText text="Title" />
          <MyInput
            placeholder={
              "Enter property title e.g. Beautiful House in DHA Phase 5"
            }
            style={styles(theme).titleInputStyle}
            inputStyle={[styles(theme).inputInnerStyle]}
            placeholderColor={theme.colors.placeholderText}
            multiline
          />
        </View>
      </View>
      <GapView length={10} />
      <View style={styles().AdInfo}>
        <ListingIcon iconIndex={2} />
        <View style={styles().AdField}>
          <RequiredText text="Description" />
          <MyInput
            placeholder={
              "Describe your property, it’s features, & your area it is in etc."
            }
            style={[styles(theme).titleInputStyle, { height: 83 }]}
            inputStyle={[
              styles(theme).inputInnerStyle,
              { alignSelf: "flex-start" },
            ]}
            placeholderColor={theme.colors.placeholderText}
            multiline
          />
        </View>
      </View>
    </CustomTable>
  );
}
function LocationAndPurpose() {
  const theme = useTheme() as MyTheme;
  const [selected, setSelected] = useState("");

  return (
    <CustomTable title="Location & Purpose" indexIcon={3}>
      <View style={styles().AdInfo}>
        <ListingIcon iconIndex={4} />
        <View style={styles().AdField}>
          <MyText textColor={theme.colors.negative}>Select Purpose</MyText>
          <View style={styles().titleContainer}>
            <TouchableOpacity
              onPress={() => {
                setSelected("sell");
              }}
              style={[
                styles(theme).tab,
                {
                  backgroundColor:
                    selected == "sell"
                      ? theme.colors.selected
                      : theme.colors.cardBg,
                },
              ]}
            >
              <SellTab />
              <MyText
                text={"Sell"}
                size={12}
                textColor={
                  selected == "sell" ? theme.colors.primary : theme.colors.text
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected("rent");
              }}
              style={[
                styles(theme).tab,
                {
                  backgroundColor:
                    selected == "rent"
                      ? theme.colors.selected
                      : theme.colors.cardBg,
                },
              ]}
            >
              <RentTab />
              <MyText
                text={"Rent"}
                size={12}
                textColor={
                  selected == "rent" ? theme.colors.primary : theme.colors.text
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles().AdField}>
        <View style={styles().titleContainer}>
          <ListingIcon iconIndex={5} />
          <MyText textColor={theme.colors.negative}>
            Select Property Type
          </MyText>
        </View>
        <TabFilter data={testData} onSelect={() => {}} wrap />
      </View>
      <GapView length={10} />
      <View style={styles().AdInfo}>
        <ListingIcon iconIndex={6} />
        <View style={{ flex: 1, paddingTop: 10, gap: 15 }}>
          <MyText textColor={theme.colors.negative}>Select City</MyText>
          <MyDropdown
            data={["Karachi", "Lahore", "Islamabad", "Hyderabad", "Quetta"]}
            onSelect={() => {}}
            style={{ width: "90%" }}
            placeholder="city"
            zIndex={10}
          />
        </View>
      </View>
      <GapView length={10} />
      <View style={styles().AdInfo}>
        <ListingIcon iconIndex={7} />
        <View style={styles().AdField}>
          <RequiredText text="Select Location" />
          <Map />
        </View>
      </View>
    </CustomTable>
  );
}
function PropertySizeandPricing() {
  const theme = useTheme() as MyTheme;
  const [n1, setn1] = useState(false);
  const [n2, setn2] = useState(false);

  return (
    <CustomTable title="Property Size and Pricing" indexIcon={8}>
      <View style={styles().AdInfo}>
        <ListingIcon iconIndex={1} />
        <View style={styles().AdField}>
          <RequiredText text="Select Purpose" />
          <MyInput
            placeholder={"Enter Unit"}
            style={styles(theme).singleInputStyle}
            inputStyle={styles(theme).inputInnerStyle}
            placeholderColor={theme.colors.placeholderText}
          />
          <MyDropdown data={[]} placeholder="Unit" onSelect={() => {}} />
        </View>
      </View>
      <View style={styles().AdInfo}>
        <ListingIcon iconIndex={2} />
        <View style={styles().AdField}>
          <RequiredText text="Amount" />
          <MyInput
            placeholder={"Enter Amount"}
            style={styles(theme).singleInputStyle}
            inputStyle={styles(theme).inputInnerStyle}
            placeholderColor={theme.colors.placeholderText}
          />
          <MyDropdown data={[]} placeholder="PKR" onSelect={() => {}} />
        </View>
      </View>
      <View style={styles().AdInfo}>
        <ListingIcon iconIndex={9} />
        <View style={styles().AdField}>
          <View style={styles().align}>
            <MyText textColor={theme.colors.negative}>
              Instalment available
            </MyText>
            <ToggleSwitch
              value={n1}
              onValueChange={() => {
                setn1(!n1);
              }}
            />
          </View>
          <MyText
            text="Enable if listing is available on instalments"
            size={11}
            textColor={theme.colors.verificationText}
          />
        </View>
      </View>
      <View style={styles().AdInfo}>
        <ListingIcon iconIndex={10} />
        <View style={styles().AdField}>
          <View style={styles().align}>
            <MyText textColor={theme.colors.negative}>
              Ready For Possession
            </MyText>
            <ToggleSwitch
              value={n2}
              onValueChange={() => {
                setn2(!n2);
              }}
            />
          </View>
          <MyText
            text="Enable if listing is available on instalments"
            size={11}
            textColor={theme.colors.verificationText}
          />
        </View>
      </View>
    </CustomTable>
  );
}

function FeaturesAndAmenities() {
  const theme = useTheme() as MyTheme;
  const [visible, setVisible] = useState(false);
  return (
    <CustomTable title="Features and Amenities" indexIcon={11}>
      <View style={styles().AdInfo}>
        <ListingIcon iconIndex={12} />
        <View style={styles().AdField}>
          <MyText textColor={theme.colors.negative}>Feature & Amenities</MyText>
          <Counter type="bed" />
          <Counter type="tub" />
          <Counter type="park" />
        </View>
      </View>
      <GapView length={10} />
      <MyText
        text="Add additional features e.g. Rooftop terrace etc."
        size={12}
        textColor={theme.colors.verificationText}
      />
      <GapView length={10} />
      <PrimaryBtn
        btnStyle={[styles().addAmenity, { borderColor: theme.colors.primary }]}
        onPress={() => setVisible(true)}
      >
        <AddIcon />
        <MyText text="Add amenity" size={10} textColor={theme.colors.primary} />
      </PrimaryBtn>
      <AmenitiesPopup
        isVisible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onSave={() => {
          setVisible(false);
        }}
      />
    </CustomTable>
  );
}

function AmenitiesPopup({ isVisible, onCancel, onSave }: AmenitiesPopupProps) {
  const theme = useTheme() as MyTheme;

  return (
    <Modal isVisible={isVisible} style={styles().modal}>
      <View style={styles(theme).contentContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => renderListItem({ item, theme })}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles().flatListContent}
          ItemSeparatorComponent={() => <GapView length={20} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 12,
          width: "100%",
          gap: 10,
          justifyContent: "flex-end",
          borderTopWidth: 1,
          borderColor: theme.colors.secondary,
          backgroundColor: theme.colors.background,
        }}
      >
        <PrimaryBtn
          title="Cancel"
          btnStyle={styles(theme).draft}
          textColor={theme.colors.primary}
          width={80}
          onPress={onCancel}
        />
        <PrimaryBtn title="Save" width={80} onPress={onSave} />
      </View>
    </Modal>
  );
}

const renderListItem = ({
  item,
  theme,
}: {
  theme: MyTheme;
  item: { iconIndex: number; title: string };
}) => {
  const svgIcons: SvgIcon = {
    0: <Swimming />,
    1: <Fitness />,
    2: <Clubhouse />,
    3: <Playground />,
    4: <Basketball />,
    5: <Rails />,
    6: <Pet />,
    7: <SecurityCam />,
    8: <Concierge />,
    9: <BusinessCentre />,
    10: <RooftopTerrace />,
    11: <Maintenance />,
    12: <Washing />,
    13: <Electricity />,
    14: <Generator />,
    15: <Wall />,
    16: <Park />,
    17: <Masjid />,
    18: <Corridor />,
    19: <Well />,
    20: <ServantArea />,
    21: <SeniorCitizenArea />,
    22: <UtilityStore />,
  };
  return (
    <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
      <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
        <MyCheckbox
          checkboxStyle={{
            width: 16,
            height: 16,
            borderColor: theme.colors.secondary,
          }}
        />
        {svgIcons[item.iconIndex]}
      </View>
      <MyText text={item.title} textColor={theme.colors.negative} />
    </View>
  );
};

function Counter({ type }: { type: "bed" | "tub" | "park" }) {
  const theme = useTheme() as MyTheme;
  const [value, setValue] = useState(1);
  return (
    <View style={styles().counter}>
      {type == "bed" && <AmenitiesBed />}
      {type == "tub" && <AmenitiesTub />}
      {type == "park" && <AmenitiesParking />}
      <View style={styles().innerCounter}>
        <Pressable
          onPress={() => {
            value != 1 ? setValue(value - 1) : console.log("abcd");
          }}
        >
          <Minus />
        </Pressable>
        <MyText size={15}>{value}</MyText>
        <Pressable
          onPress={() => {
            value != 10 ? setValue(value + 1) : console.log("abcd");
          }}
        >
          <Plus />
        </Pressable>
      </View>
    </View>
  );
}
function PropertyImagesAndVideo() {
  const theme = useTheme() as MyTheme;
  return (
    <CustomTable title="Property Images and Video" indexIcon={16}>
      <View style={styles().AdInfo}>
        <ListingIcon iconIndex={4} />
        <View style={styles().AdField}>
          <RequiredText text="Upload Images of your Property" />
        </View>
      </View>
      <GapView length={15} />
      <View
        style={[
          styles().dashed,
          {
            borderColor: theme.colors.primary,
          },
        ]}
      >
        <View style={styles().buttonContainer}>
          <PrimaryBtn title="Upload Images" width="100%" />
          <PrimaryBtn
            title="Add Video"
            btnStyle={[styles().draft, { borderColor: theme.colors.primary }]}
            textColor={theme.colors.primary}
            width="100%"
          />
        </View>
        <GapView length={10} mode="horizontal" />
        <View style={styles().list}>
          <Ticktext text="Cover all areas of your property" />
          <Ticktext text="Maximum 5 Pictures and 5 Videos can be uploaded" />
          <Ticktext text="Ads with picture got 5x more views and leads" />
          <Ticktext text="Upload good quality pictures with proper lighting" />
          <Ticktext text="The video upload feature is optional; you can choose to upload photos without including a video." />
        </View>
      </View>
    </CustomTable>
  );
}

function Ticktext({ text }: { text: string }) {
  const theme = useTheme() as MyTheme;
  return (
    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
      <TickPrimary />
      <MyText size={10} textColor={theme.colors.listText}>
        {text}
      </MyText>
    </View>
  );
}

function RequiredText({ text }: RequiredTextProps) {
  const theme = useTheme() as MyTheme;
  return (
    <View style={{ flexDirection: "row" }}>
      <MyText textColor={theme.colors.negative} text={text} />
      <MyText textColor={"#FF0000"} text=" *" />
    </View>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    conatiner: { marginTop: 27, marginBottom: 10, paddingHorizontal: 20 },
    footerButtons: {
      flexDirection: "row",
      gap: 5,
      marginTop: 40,
      alignSelf: "flex-end",
    },
    eye: {
      backgroundColor: "transparent",
      borderColor: theme?.colors.primary,
      borderWidth: 1,
      width: 30,
      height: 30,
      paddingTop: 14,
    },
    draft: {
      backgroundColor: "transparent",
      borderColor: theme?.colors.primary,
      borderWidth: 1,
    },
    headingStyle: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme?.colors.border,
    },
    formWrapper: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    passListWrapper: {
      marginHorizontal: 10,
      width: "100%",
      borderColor: theme?.colors.border,
      borderWidth: 1,
      borderRadius: 9,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    align: { flexDirection: "row", justifyContent: "space-between" },
    AdInfo: { flexDirection: "row", flex: 1, gap: 10 },

    AdField: { flex: 1, paddingTop: 10, gap: 10 },
    children: { paddingHorizontal: 15, paddingVertical: 20 },
    inputInnerStyle: {
      height: 45,
      padding: 0,
      color: theme?.colors.text,
    },
    singleInputStyle: {
      backgroundColor: theme?.colors.background,
      height: 38,
      borderColor: theme?.colors.dropdownBorder,
      borderWidth: 1,
      elevation: 0,
    },
    titleInputStyle: {
      backgroundColor: theme?.colors.background,
      width: "100%",
      height: 55,
      borderColor: theme?.colors.dropdownBorder,
      borderWidth: 1,
      elevation: 0,
      padding: 5,
    },
    tab: {
      width: 70,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme?.colors.border,
      borderRadius: 4,
      flexDirection: "row",
      gap: 5,
    },
    addAmenity: {
      width: 85,
      gap: 2,
      backgroundColor: "transparent",
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    counter: {
      flexDirection: "row",
      gap: 10,
    },
    innerCounter: {
      width: 60,
      height: 25,
      backgroundColor: theme?.dark ? theme.colors.cardBg : "#F4F5F7",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 5,
    },
    dashed: {
      borderWidth: 1,
      borderStyle: "dashed",
      paddingVertical: 20,
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    buttonContainer: {
      gap: 10,
      alignItems: "center",
      justifyContent: "center",
      width: "35%",
    },
    list: { width: "60%", paddingHorizontal: 15, gap: 5 },
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    contentContainer: {
      backgroundColor: theme?.dark
        ? theme.colors.verificationBg
        : theme?.colors.positive,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 20,
      paddingTop: 20,
      height: "70%",
    },
    flatListContent: {
      paddingTop: 2,
      paddingBottom: 20,
    },
  });
