import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import Card from "../Card";
import MyText from "../MyText";
import { LeftIconCarousel, RightIconCarousel } from "@assets/images/svg";

interface ICustomSlider {
  images: string[];
  title: string;
}

const CustomSlider = ({ images, title }: ICustomSlider) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <Card>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: images[currentIndex] }}
          resizeMode="cover"
          style={styles.sliderTrack}
        >
          <View style={styles.dFlex}>
            <TouchableOpacity onPress={handleNext}>
              <LeftIconCarousel />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext}>
              <RightIconCarousel />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.textStyle}>
        <MyText text={title} size={16} weight="600" />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  sliderTrack: {
    height: 228,
    backgroundColor: "#ddd",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  nextButton: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 25,
  },

  textStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingVertical: 10,
  },
  dFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    margin: "auto",
  },
});

export default CustomSlider;
