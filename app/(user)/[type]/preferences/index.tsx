import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";

import { MyTheme } from "@types";
import { MyInput, MyText, PreferencesList, PrimaryBtn } from "@components";
import { handleSavePreferences, PreferencesData } from "./utils";
import { showToast } from "@utils/showToast";
import { getLoggedInUserInfo } from "app/auth/utils/authUtils";
import { UserProfileData } from "../(tabs)/profile/utils";
import { AppDispatch, RootState } from "@store";
import { useDispatch } from "react-redux";
import { setUserData, UserState } from "features/user/userSlice";
import useSessionManagement from "hooks/useSessionManagement";
import { useSelector } from "react-redux";
import { storage } from "store/mmkv";

export default function Preferences() {
  const theme = useTheme() as MyTheme;
  const dispatch: AppDispatch = useDispatch();
  const { updateUserInSession, updateUserIsLoggedInSession } = useSessionManagement();
  const { userData } = useSelector<RootState, UserState>((state) => state.user);

  const [preferences, setPreferences] = useState<PreferencesData>({
    emailNotification: false,
    newsLetter: false,
    automatedReport: false,
    currency: "PKR",
    areaUnit: "Sq. Ft.",
  });

  useEffect(() => {
    console.log(`userData ${JSON.stringify(userData)}`)
    if (userData) {
      const { emailNotification = false, newsLetter = false, automatedReport = false, currency = "PKR", areaUnit = "Sq. Ft." } = userData.preferences as PreferencesData || preferences;
      setPreferences({
        emailNotification,
        newsLetter,
        automatedReport,
        currency,
        areaUnit,
      });
      console.log(`preferences ${JSON.stringify(userData)}`)
    }
  }, [userData]);


  const listData = [
    {
      title: "Dark Theme",
      value: false,
      indexIcon: 0,
      subtitle: "Enable dark mode throughout the app",
      key: "darkTheme",
    },
    {
      title: "Email Notification",
      value: preferences.emailNotification,
      indexIcon: 1,
      subtitle: "Allow to receive email notification",
      key: "emailNotification",
    },
    {
      title: "NewsLetters",
      value: preferences.newsLetter,
      indexIcon: 2,
      subtitle: "Allow to stay updated & receive newsLetter",
      key: "newsLetter",
    },
    {
      title: "Automated Reports",
      value: preferences.automatedReport,
      indexIcon: 3,
      subtitle: "Allow to send us reports automatically in case of any issue.",
      key: "automatedReport",
    },
  ];


  const mergeUserRoleWithProfile = (profileData: UserProfileData, preferences: PreferencesData): UserProfileData => {
    return { ...profileData, preferences: { ...profileData.preferences, ...preferences }, };
  };

  const handleToggleChange = (key: string, newValue: boolean) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [key]: newValue,
    }));
  };


  const savePreferences = async () => {
    console.log(`Request ${JSON.stringify(preferences)}`)
    const response = await handleSavePreferences(preferences);
    if (response.status && response.preferencesResponse) {
      const { emailNotification, newsLetter, automatedReport, currency, areaUnit } = response.preferencesResponse.response.data;
      console.log(`Response ${JSON.stringify(response)}`)
      setPreferences({
        emailNotification,
        newsLetter,
        automatedReport,
        currency,
        areaUnit,
      });
      const userData = storage.getString("userData");
      const userProfile = userData ? (JSON.parse(userData) as UserProfileData) : null;
      const userProfileData = userProfile ? mergeUserRoleWithProfile(userProfile, preferences) : null;

      console.log(`Data Gaya ${JSON.stringify(userProfileData)}`)
      dispatch(setUserData(userProfileData));
      updateUserInSession(userProfileData, storage.getString("userToken") || "");
      showToast("Preferences saved successfully", 'success')
    } else {
      showToast(response.message || "Failed to save preferences", 'error')
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles(theme).wrapper}>
        <MyText
          text="Preferences"
          weight="600"
          size={16}
          style={styles(theme).text}
        />
        <View style={styles(theme).ListItemWrapper}>
          {listData.map((item, index) => {
            console.log(`key: ${item.key} value: ${item.value}`)
            console.log(`list ${JSON.stringify(listData)}`)
            return <PreferencesList
              title={item.title}
              value={item.value}
              onToggleChange={(k, val) => {
                handleToggleChange(item.key, val);
              }}
              index={index}
              key={index}
              indexIcon={item.indexIcon}
              subtitle={item.subtitle}
            />
          })}
        </View>
        <View style={{ rowGap: 10, padding: 6 }}>
          <MyText text="Currency" />
          <MyInput
            style={styles(theme).inputContainer}
            inputStyle={styles(theme).inputStyle}
            placeholder="PKR"
            placeholderColor={theme.colors.placeholderText}
            text={preferences.currency}
            editable={false}
          />

          <MyText text="Area Unit" />
          <MyInput
            style={styles(theme).inputContainer}
            inputStyle={styles(theme).inputStyle}
            placeholder="Sq. Ft."
            placeholderColor={theme.colors.placeholderText}
            text={preferences.areaUnit}
            editable={false}
          />
          <PrimaryBtn
            title="Save Changes"
            textColor="#ffffff"
            labelStyle={{ fontSize: 12 }}
            btnStyle={{ marginTop: 5, alignSelf: "flex-start" }}
            onPress={savePreferences}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    text: {
      paddingLeft: 8,
    },
    ListItemWrapper: {
      marginTop: 15,
    },
    inputContainer: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderRadius: 5.98,
      flexDirection: "row",
      elevation: 0,
      width: "100%",
      borderColor: theme?.colors.border,
    },
    inputStyle: {
      padding: 0,
      fontSize: 14,
      fontWeight: "300",
      color: theme?.colors.placeholderText,
    },
  });