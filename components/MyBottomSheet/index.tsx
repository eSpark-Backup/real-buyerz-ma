import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ViewStyle,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import { MyTheme } from "@types";
import BModal from "@components/MyBottomSheet/Modal";

const BottomSheet = ({
  isVisible,
  onClose,
  bottomSheetStyles,
  children,
}: {
  isVisible: boolean;
  onClose: () => void;
  bottomSheetStyles?: ViewStyle;
  children?: React.ReactNode;
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
          <TouchableWithoutFeedback>
            <View
              style={[
                styles({ theme }).modalContent,
                bottomSheetStyles,
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
              {children}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
BottomSheet.Modal = BModal;

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
