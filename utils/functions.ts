import { SavedLeadsItem } from "app/(user)/[type]/(tabs)/home/utils";
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

function isImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url);
}

function isSavedLeadsItem(item: any): item is SavedLeadsItem {
  return item && typeof item === "object" && "property" in item;
}

function createUrlParams(filter: Record<string, string | null>): string {
  const params = new URLSearchParams(
    Object.entries(filter)
      .filter(([_, value]) => value !== null && value !== "")
      .map(([key, value]) => [key, value as string])
  );
  return params.toString() ? `?${params.toString()}` : "";
}

export {
  requestPermissionsMedia,
  isImageUrl,
  createUrlParams,
  isSavedLeadsItem,
};
