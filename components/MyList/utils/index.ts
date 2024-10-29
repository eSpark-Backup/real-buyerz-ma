import { showToast } from "@utils/showToast";
import { handleSaveFavoriteProperty } from "app/(user)/[type]/favourites/utils";

export const addFavorite = async (propertyId: string) => {
    try {
        const result = await handleSaveFavoriteProperty(propertyId);
        if (result.status) {
            showToast(result.message || "Added to Favorite")
        } else {
            showToast(result.message || "Failed to add favorite")
        }
    } catch (err) {
        console.error(err);
    }
};