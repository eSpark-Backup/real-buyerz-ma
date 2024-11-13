import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import MyText from '@components/MyText';
import { MyTheme } from '@types';

interface ImageViewerProps {
  imageUri: string;
  title?: string;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  imageUri,
  title,
  onClose,
}) => {
  const theme = useTheme() as MyTheme;
  const images = [{ uri: imageUri }];
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <ImageViewing
        images={images}
        imageIndex={0}
        visible={true}
        onRequestClose={onClose}
        backgroundColor="black"
        presentationStyle="overFullScreen"
        doubleTapToZoomEnabled={true}
        swipeToCloseEnabled={true}
        HeaderComponent={({ imageIndex }) => (
          <SafeAreaView>
            <View style={styles.header}>
              {title && (
                <MyText
                  text={title}
                  size={16}
                  weight="600"
                  textColor="#FFFFFF"
                />
              )}
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 1000,
  },
  header: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageViewer;