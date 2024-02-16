import * as ImagePicker from "expo-image-picker";

const requestPermissionsMedia = async (
  status: ImagePicker.MediaLibraryPermissionResponse | null,
  requestPermission: () => Promise<ImagePicker.MediaLibraryPermissionResponse>,
  profile?: boolean
) => {
  if (!status?.granted) {
    const { status } = await requestPermission();
    console.log("res", status);
    return await handleGetImages(status, profile);
  } else if (status.granted) {
    console.log("status", status);
    return await handleGetImages(status.status, profile);
  }
};

const handleGetImages = async (
  status: ImagePicker.PermissionStatus,
  profile?: boolean
) => {
  if (status === "granted") {
    const mediaRes = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: profile ? false : true,
      mediaTypes: profile
        ? ImagePicker.MediaTypeOptions.Images
        : ImagePicker.MediaTypeOptions.All,
    });
    return mediaRes.assets;
  } else {
    console.log("Not Granted Permissions");
  }
};

export { requestPermissionsMedia };
