import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import { MyTheme } from "@types";

const BottomSheet = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0));
  const slideAnim = useRef(new Animated.Value(1));
  const [isModalVisible, setIsModalVisible] = useState(isVisible);
  const theme = useTheme() as MyTheme;

  useEffect(() => {
    if (isVisible) {
      setIsModalVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim.current, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim.current, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim.current, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim.current, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setIsModalVisible(false));
    }
  }, [isVisible, fadeAnim, slideAnim]);

  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal
      animationType="none"
      statusBarTranslucent
      transparent={true}
      visible={isModalVisible}
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          styles({ theme }).modalContainer,
          { opacity: fadeAnim.current },
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Animated.View
            style={[
              styles({ theme }).modalContent,
              {
                transform: [
                  {
                    translateY: slideAnim.current.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 300],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text>Bottom Sheet Content Goes Here</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;

const styles = ({ theme }: { theme?: MyTheme }) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: theme?.colors.background,
      minHeight: 50,
      width: "100%",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  });
