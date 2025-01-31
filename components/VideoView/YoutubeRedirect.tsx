import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { MyText } from '@components';
import YouTubeIframe from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';
import { MyTheme } from '@types';

interface VideoListProps {
  videos: string[];
  theme: MyTheme;
}

const YouTubeRedirect: React.FC<VideoListProps> = ({ videos, theme }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const thumbs = videos.reduce((acc, video) => {
      const videoId = getYouTubeVideoId(video);
      return {
        ...acc,
        [video]: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      };
    }, {});
    setThumbnails(thumbs);
  }, [videos]);

  const getYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const renderVideoItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      onPress={() => setSelectedVideo(item)}
      style={styles.thumbnailContainer}
    >
      <Image
        source={{ uri: thumbnails[item] }}
        style={styles.thumbnail}
      />
      <View style={styles.playIconContainer}>
        <Ionicons name="play-circle" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      
      {selectedVideo ? (
        <View style={styles.youtubeContainer}>
          <YouTubeIframe
            videoId={getYouTubeVideoId(selectedVideo)}
            height={200}
            play
            onError={(e) => console.log('YouTube Player Error:', e)}
          />
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedVideo(null)}
          >
            <Ionicons name="close-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={videos}
          renderItem={renderVideoItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '4%',
    paddingHorizontal: 15,
    rowGap: 6,
    borderTopWidth: 1,
  },
  listContainer: {
    paddingVertical: 10,
  },
  thumbnailContainer: {
    marginRight: 10,
    position: 'relative',
  },
  thumbnail: {
    width: 160,
    height: 90,
    borderRadius: 8,
  },
  playIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -15 },
      { translateY: -15 }
    ],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  youtubeContainer: {
    position: 'relative',
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
export default YouTubeRedirect;