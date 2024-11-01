import MyText from '@components/MyText';
import React from 'react';
import { StyleSheet, View, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

export interface VideoViewerProps {
  videoUri: string;
  visible: boolean;
  onClose: () => void;
}

export default function VideoViewer({
  videoUri,
  visible,
  onClose,
}: VideoViewerProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false} 
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <WebView
          source={{ uri: videoUri }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          allowsFullscreenVideo={true} 
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MyText style={styles.closeButtonText}>Close</MyText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webView: {
    flex: 1
  },
  closeButton: {
    position: 'absolute',
    top: 40, 
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 5,
    zIndex: 1,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});