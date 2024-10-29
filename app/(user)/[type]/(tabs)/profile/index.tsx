import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { MyText, MyAvatar, MyField, Variants, OverlayLoader } from "@components";
import { MyTheme } from "@types";
import { requestPermissionsMedia } from "@utils/functions";
import { AppDispatch, RootState } from "@store";
import { useDispatch, useSelector } from "react-redux";
import { ChangePassword, handleGetUserProfile, handleUpdateUserProfile, handleUserChangePassword, UserProfileData } from "./utils";
import { setUserData, UserState } from "features/user/userSlice";
import { getLoggedInUserInfo } from "app/auth/utils/authUtils";
import { showToast } from "@utils/showToast";
import useSessionManagement from "hooks/useSessionManagement";
import { storage } from "store/mmkv";
import { PreferencesData } from "../../preferences/utils";

export interface File extends Blob {
  uri: string;
  type: string;
  name: string;
  lastModified: number;
  size: number;
}

interface ProfileState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  landlineNumber: string;
  city: string;
  bio: string;
  whatsapp: string;
  country: string;
  address: string;
  isVerified: boolean;
  socialId: string;
  profileImage: string;
  profileVisibility: boolean;
  role: string;
  preferences: PreferencesData | null;
}

const initialProfileState: ProfileState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  landlineNumber: "",
  city: "",
  bio: "",
  whatsapp: "",
  country: "",
  address: "",
  isVerified: false,
  socialId: "",
  profileImage: "",
  profileVisibility: false,
  role: "",
  preferences: null,
};

export default function ProfileSettings() {
  const theme = useTheme() as MyTheme;
  const dispatch: AppDispatch = useDispatch();
  const { userData } = useSelector<RootState, UserState>((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [statusMedia, requestPermissionMedia] = ImagePicker.useMediaLibraryPermissions();
  const [profileState, setProfileState] = useState<ProfileState>(initialProfileState);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const { updateUserInSession, updateUserIsLoggedInSession } = useSessionManagement();
  const [profileImage, setProfileImage] = useState<string>(
    userData?.profileImage || "https://i.pravatar.cc/300?img=68"
  );
  const [fileImage, setFileImage] = useState<File | null>(null)

  useEffect(() => {
    fetchAllUserProfileData();
  }, []);

  useEffect(() => {
    if (userData) {
      setProfileState((prev) => ({
        ...prev,
        ...userData,
        preferences: userData.preferences || null,
      }));
      setProfileImage(userData.profileImage)
    }

  }, [userData]);

  const handleInputChange = (name: string, value: string) => {
    setProfileState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const passList = [
    {
      variant: Variants.PASSWORD,
      list: {
        title: "Enter Old Password",
        inputs: [
          {
            id: 'oldpassword',
            placeholder: "Old Password",
            value: passwords.oldPassword || "",
            onChangeText: (text: string) => handlePasswordChange('oldPassword', text),
          },
        ],
      },
    },
    {
      variant: Variants.PASSWORD,
      list: {
        title: "Enter New Password",
        inputs: [
          {
            id: 'newpassword',
            placeholder: "New Password",
            value: passwords.newPassword || "",
            onChangeText: (text: string) => handlePasswordChange('newPassword', text),
          },
        ],
      },
    },
    {
      variant: Variants.PASSWORD,
      list: {
        title: "Confirm Password",
        inputs: [
          {
            id: 'confirmpassword',
            placeholder: "Enter Confirm Password",
            value: passwords.confirmPassword || "",
            onChangeText: (text: string) => handlePasswordChange('confirmPassword', text),
          },
        ],
      },
    },
    {
      variant: Variants.CHECK_BOX,
    },
    {
      variant: Variants.PRIMARY,
      title: "Verify",
      onPress: () => {
        if (!passwords.newPassword || !passwords.oldPassword || !passwords.confirmPassword) {
          showToast("Please enter all the fields")
          return;
        }
        if (passwords.newPassword != passwords.confirmPassword) {
          showToast("Your password doesn't matched")
          return;
        }
        handleUserChangePass()
      },
    },
  ];

  const handlePasswordChange = (name: string, value: string) => {
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createInfoList = () => [
    {
      variant: Variants.DUAL,
      list: {
        title: "First Name",
        inputs: [
          {
            id: 'firstname',
            placeholder: "Enter First Name",
            label: "First Name",
            value: profileState.firstName || "",
            onChangeText: (text: string) => {
              handleInputChange("firstName", text)
            },
          },
          {
            id: 'lastname',
            placeholder: "Enter Last Name",
            label: "Last Name",
            value: profileState.lastName || "",
            onChangeText: (text: string) => handleInputChange("lastName", text),
          },
        ],
      },
    },
    {
      variant: Variants.SINGLE,
      list: {
        title: "Email",
        inputs: [
          {
            id: 'email',
            placeholder: "Enter Email",
            value: profileState.email || "",
            onChangeText: (text: string) => handleInputChange("email", text),
          },
        ],
      },
    },
    {
      variant: Variants.SELECT,
      list: {
        title: "Mobile",
        inputs: [
          {
            id: 'mobile',
            placeholder: "+92",
            value: profileState.mobileNumber || "",
            onChangeText: (text: string) => handleInputChange("mobileNumber", text),
          },
        ],
      },
    },
    {
      variant: Variants.SINGLE,
      list: {
        title: "Landline",
        inputs: [
          {
            id: 'landline',
            placeholder: "Enter Landline",
            value: profileState.landlineNumber || "",
            onChangeText: (text: string) => handleInputChange("landlineNumber", text),
          },
        ],
      },
    },
    {
      variant: Variants.SELECT,
      list: {
        title: "Whatsapp",
        inputs: [
          {
            id: 'whatsapp',
            placeholder: "+92",
            value: profileState.whatsapp || "",
            onChangeText: (text: string) => handleInputChange("whatsapp", text),
          },
        ],
      },
    },
    {
      variant: Variants.SINGLE,
      list: {
        title: "Country",
        inputs: [
          {
            id: 'country',
            placeholder: "Enter Country",
            value: profileState.country || "",
            onChangeText: (text: string) => handleInputChange("country", text),
          },
        ],
      },
    },
    {
      variant: Variants.SELECTOR,
      list: {
        title: "City",
        inputs: [
          {
            id: 'city',
            placeholder: "Select City",
            value: profileState.city || "",
            onChangeText: (text: string) => {
              handleInputChange("city", text)
            },
          },
        ],
      },
    },
    {
      variant: Variants.SINGLE,
      list: {
        title: "Address",
        inputs: [
          {
            id: 'address',
            placeholder: "Add Address",
            value: profileState.address || "",
            onChangeText: (text: string) => handleInputChange("address", text),
          },
        ],
      },
    },
    {
      variant: Variants.MULTI_LINE,
      list: {
        title: "Bio",
        inputs: [
          {
            id: 'bio',
            placeholder: "Add Bio",
            value: profileState.bio || "",
            onChangeText: (text: string) => handleInputChange("bio", text),
          },
        ],
      },
    },
    {
      variant: Variants.PRIMARY,
      title: "Save Changes",
      onPress: () => {
        updateUserProfileData()
      },
    },
  ];


  const mergeUserRoleWithProfile = (profileData: UserProfileData, role: string): UserProfileData => {
    return { ...profileData, role };
  };

  const handleUpdateProfilePic = async () => {
    const res = await requestPermissionsMedia(statusMedia, requestPermissionMedia, true);
    if (!res) return;
    const file: File = {
      uri: res[0].uri,
      type: res[0].mimeType || 'image/jpeg',
      name: res[0].fileName || 'profile.jpg',
      lastModified: Date.now(),
      size: res[0].fileSize || 0
    };
    setProfileImage(res[0].uri)
    setFileImage(file);
  };

  const fetchAllUserProfileData = async () => {
    try {
      const response = await handleGetUserProfile();
      if (response.data) {
        const userInfo = getLoggedInUserInfo();
        const userProfileData = mergeUserRoleWithProfile(response.data, userInfo?.user?.role || "user");
        setProfileImage(response.data.profileImage)
        dispatch(setUserData(userProfileData));
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const updateUserProfileData = async () => {
    setLoading(true)
    try {
      const response = await handleUpdateUserProfile(getUserProfileData(), fileImage);
      setLoading(false)
      const userData = response.data
      if (userData) {
        showToast("User profile updated successfully", 'success')
        const userInfo = getLoggedInUserInfo();
        const userProfileData = mergeUserRoleWithProfile(userData, userInfo?.user?.role || "user");
        dispatch(setUserData(userProfileData));
        updateUserInSession(userProfileData, storage.getString("userToken")||"");
        setProfileImage(userData.profileImage)
      }
      else {
        showToast(response.message || "User profile updation Failed", 'error')
      }
    } catch (error) {
      setLoading(false)
      showToast("Something went wrong", 'error')
    }
  };

  const handleUserChangePass = async () => {
    setLoading(true)
    const userObject: ChangePassword = {
      password: passwords.newPassword,
      oldPassword: passwords.oldPassword,
    };
    const response = await handleUserChangePassword(userObject);
    if (response.status) {
      setLoading(false)
      showToast(response.message || "Password Successfully Changed", 'success');
    } else {
      setLoading(false)
      showToast(
        response.message || 'Sign in failed',
        'error',
      )
    };
  }

  const getUserProfileData = (): UserProfileData => {
    return {
      id: profileState.id,
      firstName: profileState.firstName,
      lastName: profileState.lastName,
      email: profileState.email,
      mobileNumber: profileState.mobileNumber,
      landlineNumber: profileState.landlineNumber,
      city: profileState.city,
      bio: profileState.bio,
      whatsapp: profileState.whatsapp,
      country: profileState.country,
      address: profileState.address,
      isVerified: profileState.isVerified,
      socialId: profileState.socialId,
      profileImage: profileState.profileImage,
      profileVisibility: profileState.profileVisibility,
      role: profileState.role,
      preferences: profileState.preferences || null,
    };
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <OverlayLoader isShow={loading} />
      <View style={styles(theme).container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleUpdateProfilePic}
          style={styles(theme).avatarWrapper}
        >
          <MyAvatar imageUrl={{ uri: profileImage }} size={85} edit={true} />
        </TouchableOpacity>
        <View style={styles(theme).infoListWrapper}>
          <View>
            <View style={styles(theme).headingStyle}>
              <MyText
                text="Information"
                size={16}
                weight="600"
                textColor={theme.colors.negative}
              />
            </View>
            <View style={styles(theme).formWrapper}>
              {createInfoList().map((item, index) => (
                <View style={{ marginTop: 3 }} key={index}>
                  <MyField
                    key={index}
                    variant={item.variant}
                    list={item.list}
                    onPress={item.onPress}
                    title={item.title}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles(theme).passListWrapper}>
          <View>
            <View style={styles(theme).headingStyle}>
              <MyText
                text="Password Settings"
                size={16}
                weight="600"
                textColor={theme.colors.negative}
              />
            </View>
            <View style={styles(theme).formWrapper}>
              {passList.map((item, index) => (
                <View style={{ marginTop: 3 }} key={index}>
                  <MyField
                    key={index}
                    variant={item.variant}
                    list={item.list}
                    onPress={item.onPress}
                    title={item.title}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 26,
      paddingHorizontal: 20,
    },
    avatarWrapper: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e0e0e0",
      width: 80,
      height: 80,
      borderRadius: 60,
      overflow: "hidden",
      alignSelf: "center",
      marginVertical: 20,
    },
    infoListWrapper: {
      marginTop: 20,
      borderColor: theme?.colors.border,
      borderWidth: 1,
      borderRadius: 9,
    },
    passListWrapper: {
      marginTop: 30,
      borderColor: theme?.colors.border,
      borderWidth: 1,
      borderRadius: 9,
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
  });