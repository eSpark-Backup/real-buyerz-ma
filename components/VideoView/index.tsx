import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  url: string;
  visible: boolean;
  onRequestClose?(): void;
}

export default function VideoView({ url, visible, onRequestClose }: Props) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  console.log("status", status);

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <Ionicons
          name="close-outline"
          color={"#ffffff"}
          size={26}
          style={{ alignSelf: "flex-end", marginRight: 15, marginTop: 15 }}
          onPress={onRequestClose}
        />
        <View style={styles.vidContainer}>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: url,
            }}
            shouldPlay={true}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  vidContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    height: 300,
    width: "100%",
  },
});
