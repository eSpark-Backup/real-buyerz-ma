import React, { useState, useRef, useEffect } from "react";
import { Animated, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type MaterialIconName = keyof typeof MaterialCommunityIcons.glyphMap;

const MyFab = ({
  items,
  animationDuration = 300,
}: {
  items: { key: string; icon: MaterialIconName; onPress?: () => void }[];
  animationDuration?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const opacityValue = useRef(new Animated.Value(0)).current;
  const rotationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: isExpanded ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(rotationValue, {
        toValue: isExpanded ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isExpanded]);

  const animateAndToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const rotateIcon = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-45deg"],
  });

  const renderFabIcon = () => (
    <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
      <MaterialCommunityIcons name="plus" size={25} color="#ffffff" />
    </Animated.View>
  );

  const renderStackItems = () => {
    return (
      <Animated.View
        style={{
          opacity: opacityValue,
          position: "absolute",
          transform: [
            {
              translateY: rotationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [5 * -items.length, -18 * items.length],
              }),
            },
          ],
        }}
      >
        {items.map((item) => (
          <View key={item.key} style={{ bottom: 10, marginBottom: 10 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={item.onPress}
              disabled={!isExpanded}
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#9B9B9B",
                borderRadius: 30,
                height: 25,
                width: 25,
              }}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={15}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>
        ))}
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
      }}
    >
      {renderStackItems()}
      <TouchableOpacity
        activeOpacity={1}
        onPress={animateAndToggle}
        style={{
          backgroundColor: "#9B9B9B",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 30,
        }}
      >
        {renderFabIcon()}
      </TouchableOpacity>
    </View>
  );
};

export default MyFab;
