import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import * as Linking from 'expo-linking';

type YouTubeRedirectProps = {
    url: string;
  };
  
  const YouTubeRedirect: React.FC<YouTubeRedirectProps> = ({ url }) => {
    useEffect(() => {
      const openYouTubeApp = async (url: string) => {
        try {
          const appUrl = url.replace('https://www.youtube.com/watch?v=', 'vnd.youtube:');
          const supported = await Linking.canOpenURL(appUrl);
          if (supported) {
            await Linking.openURL(appUrl);
          } else {
            Alert.alert('Opening in Browser', 'YouTube app is not available, opening in browser.');
            await Linking.openURL(url);
          }
        } catch (err) {
          console.error('An error occurred', err);
        }
      };
  
      openYouTubeApp(url);
    }, [url]);
  
    return null;
  };
  
  export default YouTubeRedirect;