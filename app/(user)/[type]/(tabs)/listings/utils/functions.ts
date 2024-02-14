import * as ImagePicker from "expo-image-picker";

const requestPermissionsMedia = async (
  status: ImagePicker.MediaLibraryPermissionResponse | null,
  requestPermission: () => Promise<ImagePicker.MediaLibraryPermissionResponse>
) => {
  if (!status?.granted) {
    const { status } = await requestPermission();
    console.log("res", status);
    return await handleGetImages(status);
  } else if (status.granted) {
    console.log("status", status);
    return await handleGetImages(status.status);
  }
};

const handleGetImages = async (status: ImagePicker.PermissionStatus) => {
  if (status === "granted") {
    const mediaRes = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    return mediaRes.assets;
  } else {
    console.log("Not Granted Permissions");
  }
};

export { requestPermissionsMedia };
