import { api } from "api";
import { PropertyItem } from "../../(tabs)/home/utils";

export interface Amenity {
  name: string;
  count: number;
  imageUrl: string;
}

interface PropertyResponse {
  success: boolean;
  message: string;
  response: {
    timestamp_ms: number;
    data: any;
  };
}

export interface ReqPropertyData {
  propertyID: string;
  propertyName: string;
  propertySubTypeId: string;
  propertyPrice: string;
  propertyArea: string;
  purpose: string;
  propertyAddress: string;
  propertyCity: string;
  propertyZip: string;
  propertyDescription: string;
  longitude: string;
  latitude: string;
  image: ImageFile[];
  video: [];
  propertyStatus: boolean;
  amenity: [];
  amenities: string;
}

interface ReqDraftData {
  propertyID: string;
  propertyName: string;
  propertySubTypeId: string;
  propertyPrice: string;
  propertyArea: string;
  purpose: string;
  propertyAddress: string;
  propertyCity: string;
  propertyZip: string;
  propertyDescription: string;
  longitude: string;
  latitude: string;
  image: { url: string }[];
  imageKeys: string[];
  video: [];
  propertyStatus: boolean;
  amenity: string[];
  amenities?: string;
}

export interface ImageFile extends Blob {
  uri: string;
  type: string;
  name: string;
}

const handleCreatePropertiesAndProposal = async (
  reqPropertyData: ReqPropertyData,
  type: string
): Promise<{
  status: boolean;
  data?: PropertyResponse;
  message?: string;
}> => {
  try {
    let requestData: any = {};
    const formData = new FormData();
    Object.keys(reqPropertyData).forEach((key) => {
      const value = reqPropertyData[key as keyof ReqPropertyData];
      if (type === "user") {
        if (key === "propertyID" || key === "image" || key === "video") {
          return;
        }
        requestData[key] = value;
      } else {
        if (key === "propertyID") {
          formData.append("userPropertyId", value as string);
        } else if (key === "image") {
          const images = value as ImageFile[];
          images.forEach((image) => {
            formData.append("image", image);
          });
        } else if (key === "video") {
          const videos = value as string[];
          videos.forEach((video) => {
            if (video.trim() !== "") formData.append("video", video);
          });
        } else if (key === "amenity") {
          const amenities = value as Amenity[];
          formData.append("amenity", JSON.stringify(amenities));
        } else if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}`, item);
          });
        } else {
          formData.append(key, value as string);
        }
      }
    });
    console.log(`formData ${JSON.stringify(formData)}`);

    const endpoint =
      type === "user"
        ? "/userProperty"
        : reqPropertyData?.propertyID &&
          reqPropertyData.propertyID.trim() !== ""
        ? `/bidding/singleProperty`
        : "/property";
    console.log(`endPoint ${endpoint}`);
    const { data } =
      type === "user"
        ? await api.post<PropertyResponse>(endpoint, requestData)
        : await api.post<PropertyResponse>(endpoint, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
    console.log("API Response:", data);

    if (data?.success) {
      return {
        status: true,
        data: data,
      };
    }

    return { status: false, message: data?.message };
  } catch (error) {
    console.error("API Error:", error);
    return { status: false, message: "An error occurred." };
  }
};

const handleDraftProperty = async (
  propertyItem: PropertyItem,
  property: ReqDraftData,
  type?: string
): Promise<{
  status: boolean;
  properties?: PropertyResponse;
  message?: string;
}> => {
  try {
    const { propertyID, amenities, ...restProperty } = property;
    const propertySubType = Array.isArray(propertyItem.propertyType?.subTypes)
      ? propertyItem.propertyType.subTypes.length
        ? propertyItem.propertyType.subTypes[0].typeName
        : ""
      : propertyItem.propertyType?.subTypes?.typeName || "";

    const formData = new FormData();
    formData.append("propertyCity", property.propertyCity || "");
    formData.append("propertySubTypeId", property.propertySubTypeId || "");
    formData.append("propertyName", property.propertyName || "");
    formData.append("propertyArea", property.propertyArea?.toString() || "");
    formData.append("propertyStatus", "false");
    formData.append("propertyDescription", property.propertyDescription || "");
    formData.append("latitude", property.latitude?.toString() || "");
    formData.append("longitude", property.longitude?.toString() || "");
    formData.append("propertyZip", property.propertyZip || "");
    formData.append("propertyType", propertyItem.propertyType.typeName || "");
    formData.append("propertyPrice", property.propertyPrice?.toString() || "");
    formData.append("subType", propertySubType);
    formData.append("purpose", property.purpose || "");
    formData.append("propertyAddress", property.propertyAddress || "");

    // Append amenities as JSON string
    if (Array.isArray(property.amenity)) {
      formData.append("amenity", JSON.stringify(property.amenity));
    }
    
    if (Array.isArray(property.video)) {
      formData.append("video", property.video.join(","));
    } else if (property.video) {
      formData.append("video", property.video);
    }

    if (Array.isArray(property.imageKeys)) {
      formData.append("imageKeys", property.imageKeys.join(","));
    } else if (property.imageKeys) {
      formData.append("imageKeys", property.imageKeys);
    }
    if (Array.isArray(property.image)) {
      const imageUrls = property.image.map(img => img.url).join(",");
      formData.append("image", imageUrls);
    }

    const endpoint =
      type?.trim() === "agent"
        ? `/property/${property.propertyID}`
        : `/userProperty/${property.propertyID}`;

    const { data } = await api.put<PropertyResponse>(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Draft data:", JSON.stringify(data));

    if (data?.response?.data) {
      return {
        status: true,
        properties: data,
      };
    }
    return { status: false, message: data?.message };
  } catch (error) {
    console.log("Error:", JSON.stringify(error));
    return { status: false, message: "An error occurred." };
  }
};

export { handleCreatePropertiesAndProposal, handleDraftProperty, ReqDraftData };
