import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Easing,
} from "react-native";
import { createThumbnail } from "react-native-create-thumbnail";
import { Ionicons } from "@expo/vector-icons";
import YouTubeIframe from "react-native-youtube-iframe";

import Card from "../Card";
import MyText from "../MyText";
import { LeftIconCarousel, RightIconCarousel } from "@assets/images/svg";
import { MyTheme } from "@types";
import { useTheme } from "@react-navigation/native";

interface MediaItem {
  uri: string;
  type: "image" | "video";
  thumbnailUri?: string;
}

interface ICustomSlider {
  images: MediaItem[];
  title: string;
}

const CustomSlider = ({ images, title }: ICustomSlider) => {
  const theme = useTheme() as MyTheme;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [showVideoViewer, setShowVideoViewer] = useState(false);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    fetchThumbnails();
  }, [images]);

  const fetchThumbnails = async () => {
    const videoItems = images.filter((item) => item.type === "video");
    if (videoItems.length === 0) {
      console.log("No video items to process for thumbnails.");
      return;
    }

    const generatedThumbnails = await Promise.all(
      images.map(async (item) => {
        if (item.type === "video") {
          const validVideoUri = await validateVideoUri(item.uri);
          console.log("Valid video URI:", validVideoUri);
          if (validVideoUri) {
            if (
              validVideoUri.includes("youtube.com") ||
              validVideoUri.includes("youtu.be")
            ) {
              const youtubeThumbnailUrl = getYouTubeThumbnailUrl(validVideoUri);
              console.log("YouTube thumbnail URL:", youtubeThumbnailUrl);
              return youtubeThumbnailUrl;
            }
            const thumbnailPath = await generateThumbnail(validVideoUri);
            console.log(
              "Generated thumbnail path for URI:",
              validVideoUri,
              thumbnailPath
            );
            return thumbnailPath;
          } else {
            console.warn("Invalid video URI:", item.uri);
          }
        }
        return null;
      })
    );
    console.log("Generated Thumbnails:", generatedThumbnails);
    setThumbnails(generatedThumbnails as string[]);
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleNext = () => {
    if (images.length === 0) return;
    fadeOut();
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      fadeIn();
    }, 150);
  };

  const validateVideoUri = async (uri: string) => {
    return uri.startsWith("http") ? uri : null;
  };

  const handlePrev = () => {
    if (images.length === 0) return;
    fadeOut();
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      fadeIn();
    }, 150);
  };

  const handleMediaPress = () => {
    const currentMedia = images[currentIndex];
    if (currentMedia.type === "image") {
      setShowImageViewer(true);
    } else if (currentMedia.type === "video") {
      setShowVideoViewer(true);
    }
  };

  const handleCloseVideo = () => {
    setShowVideoViewer(false);
  };

  const currentMedia = images[currentIndex];

  console.log("currentMedia " + JSON.stringify(currentMedia));
  const imageUri =
    currentMedia.type === "video" && thumbnails[currentIndex]
      ? thumbnails[currentIndex]
      : currentMedia.uri;

  if (images.length === 0) return null;

  return (
    <Card>
      <View style={styles(theme).container}>
        {!showVideoViewer ? (
          <TouchableOpacity activeOpacity={0.9} onPress={handleMediaPress}>
            <Animated.View style={{ opacity: fadeAnim }}>
              <ImageBackground
                source={{ uri: imageUri }}
                resizeMode="cover"
                style={styles(theme).sliderTrack}
              >
                {currentMedia.type === "video" && (
                  <View style={styles(theme).playIconContainer}>
                    <Ionicons name="play-circle" size={48} color="white" />
                  </View>
                )}
                <View style={styles(theme).dFlex}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handlePrev}
                    style={styles(theme).arrowButton}
                  >
                    {LeftIconCarousel ? <LeftIconCarousel /> : null}
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleNext}
                    style={styles(theme).arrowButton}
                  >
                    {RightIconCarousel ? <RightIconCarousel /> : null}
                  </TouchableOpacity>
                </View>
                <View style={styles(theme).paginationContainer}>
                  {images.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles(theme).paginationDot,
                        index === currentIndex &&
                          styles(theme).paginationDotActive,
                      ]}
                    />
                  ))}
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity>
        ) : (
          <View style={styles(theme).videoContainer}>
            <YouTubeIframe
              videoId={getYouTubeVideoId(currentMedia.uri)}
              height={228}
              play
              onError={(e) => console.log("Error playing video", e)}
              onChangeState={(state) =>
                console.log("Video state changed:", state)
              }
            />
            <TouchableOpacity
              style={styles(theme).closeButton}
              onPress={handleCloseVideo}
            >
              <Ionicons name="close-circle" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles(theme).textStyle}>
        <MyText text={title} size={16} weight="600" />
      </View>
    </Card>
  );
};

const generateThumbnail = async (videoUri: string) => {
  try {
    console.log("Generating thumbnail for:", videoUri);
    const { path } = await createThumbnail({
      url: videoUri,
      timeStamp: 1000,
    });
    return path;
  } catch (error) {
    console.error("Error generating thumbnail:", error);
    return null; // Returning null will be handled in fetchThumbnails
  }
};

const getYouTubeThumbnailUrl = (videoUrl: string) => {
  const videoId = videoUrl.split("v=")[1].split("&")[0];
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

const getYouTubeVideoId = (videoUrl: string) => {
  return videoUrl.split("v=")[1].split("&")[0];
};

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: theme?.colors.background,
    },
    sliderTrack: {
      height: 228,
      backgroundColor: theme?.colors.background,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    },
    closeButton: {
      position: "absolute",
      top: 12,
      right: 1,
      borderRadius: 16,
      padding: 5,
    },
    textStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      backgroundColor: theme?.colors.background,
    },
    dFlex: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      position: "absolute",
      top: "50%",
      transform: [{ translateY: -20 }],
      paddingHorizontal: 10,
    },
    playIconContainer: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: 50,
      padding: 15,
      zIndex: 2,
    },
    arrowButton: {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: 25,
      padding: 10,
    },
    paginationContainer: {
      position: "absolute",
      bottom: 15,
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      marginHorizontal: 4,
    },
    paginationDotActive: {
      backgroundColor: "white",
      width: 10,
      height: 10,
    },
    videoContainer: {
      height: 228,
      backgroundColor: theme?.colors.background,
      borderRadius: 5,
      overflow: "hidden",
    },
  });

export default CustomSlider;
