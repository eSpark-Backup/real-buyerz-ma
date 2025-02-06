import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ListRenderItem,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { storage } from "store/mmkv";
import { Card, MyFab, MyInput, MyText, OverlayLoader } from "@components";
import { ChatScreenParams, MyTheme } from "@types";
import { SendFlag } from "@assets/images";
import { DarkTheme } from "@theme";
import { useLocalSearchParams } from "expo-router";
import {
  ChatDetails,
  File,
  handleAllUserChats,
  handleChatAttachments,
  handleChatDetails,
  UserAllChats,
} from "./utils";
import { UserProfileData } from "../(tabs)/profile/utils";
import {
  IncomingMessage,
  useChatSocket,
} from "@components/SocketProvider/chat";
import { TextInput } from "react-native-gesture-handler";
import { showToast } from "@utils/showToast";

const DEFAULT_AVATAR = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";
const WINDOW_WIDTH = Dimensions.get("window").width;
const IMAGE_WIDTH = WINDOW_WIDTH * 0.6;

const isSameDay = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export default function ChatScreen() {
  const theme = useTheme() as MyTheme;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [chatDetails, setChatDetails] = useState<ChatDetails>();
  const [allUserChats, setAllUserChats] = useState<UserAllChats[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { chatId, url, name } = useLocalSearchParams<ChatScreenParams>();
  const userData = storage.getString("userData");
  const typingTimeoutRef = useRef<any>(null);
  const userProfile = userData
    ? (JSON.parse(userData) as UserProfileData)
    : null;

  const [isUserTyping, setTypingUser] = useState<boolean>(false);
  const currentUserChatId = userProfile?.chatId;
  const {
    sendMessage,
    newMessageReceived,
    startTyping,
    stopTyping,
    newMessageAlertReceived,
    startTypingReceived,
  } = useChatSocket();

  const mapIncomingMessage = (incomingMsg: IncomingMessage): UserAllChats => {
    return {
      _id: incomingMsg.message._id,
      content: incomingMsg.message.content,
      sender: {
        _id: incomingMsg.message.sender._id,
        name: incomingMsg.message.sender.name,
        avatar: {
          url: DEFAULT_AVATAR,
        },
      },
      attachments: [],
      chat: incomingMsg.message.chat,
      createdAt: incomingMsg.message.createdAt,
      updatedAt: "",
      __v: 0,
    };
  };

  useEffect(() => {
    console.log("Receive Chat ID " + chatId);
    resetCount();
    setIsLoading(true);
    fetchChatDetails();
    fetchUserAllChats();
  }, []);

  useEffect(() => {
    if (newMessageAlertReceived) {
      resetCount();
    }
  }, [newMessageAlertReceived]);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to upload images!");
      }
    })();
  }, []);

  useEffect(() => {
    if (newMessageReceived && "message" in newMessageReceived) {
      console.log("New Message Received:", JSON.stringify(newMessageReceived));
      const mappedMessage = mapIncomingMessage(
        newMessageReceived as IncomingMessage
      );
      setAllUserChats((prevChats) => [...prevChats, mappedMessage]);
    }
  }, [newMessageReceived]);

  const resetCount = () => {
    let alertCount = new Map<string, number>(
      JSON.parse(storage.getString("alertCount") || "[]")
    );
    if (alertCount.has(chatId)) {
      alertCount.set(chatId, 0);
    }
    storage.set("alertCount", JSON.stringify([...alertCount]));
  };

  const TypingIndicator = () => {
    if (startTypingReceived && !isUserTyping) {
      return (
        <View style={styles(theme).typingIndicatorContainer}>
          <MyText text={`${name} is typing...`} size={12} textColor="#888" />
        </View>
      );
    } else {
      return null;
    }
  };

  const handleTyping = (text: string) => {
    setNewMessage(text);
    setTypingUser(true);
    startTyping(ChatTyping(chatDetails?._id ?? "", chatDetails?.members ?? []));
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      stopTyping(
        ChatTyping(chatDetails?._id ?? "", chatDetails?.members ?? [])
      );
      setTimeout(() => {
        setTypingUser(false);
      }, 500);
    }, 2000);
  };

  const fetchChatDetails = async () => {
    const result = await handleChatDetails(chatId);
    if (result.status && result.chatDetails) {
      setChatDetails(result.chatDetails);
    }
  };

  const fetchUserAllChats = async () => {
    try {
      const result = await handleAllUserChats(chatId);
      // console.log("All User Chats " + JSON.stringify(result));
      if (result.status && result.userAllChats) {
        setAllUserChats(result.userAllChats);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await fetchUserAllChats();
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible((prev) => !prev);
  }, []);

  const Header: React.FC = () => (
    <View style={styles(theme).header}>
      <View style={styles(theme).headerContent}>
        <Image
          source={{
            uri: url || DEFAULT_AVATAR,
          }}
          style={styles(theme).headerAvatar}
        />
        <MyText
          text={name || "Chat"}
          size={18}
          weight="400"
          textColor={theme?.colors.negative}
        />
      </View>
      <TouchableOpacity onPress={toggleDropdown}>
        <Entypo
          name="dots-three-vertical"
          size={18}
          color={theme?.colors.negative}
        />
      </TouchableOpacity>
    </View>
  );

  const renderMessage: ListRenderItem<UserAllChats> = ({ item, index }) => {
    const isMe = item.sender._id === currentUserChatId;
    const isPreviousMsgSame =
      index > 0 && allUserChats[index - 1]?.sender._id === item.sender._id;
    const hasAttachments = item.attachments && item.attachments.length > 0;

    const showDateDivider = () => {
      if (index === 0) return true;
      const previousMsg = allUserChats[index - 1];
      return !isSameDay(previousMsg.createdAt, item.createdAt);
    };

    return (
      <>
        {showDateDivider() && <DateDivider date={item.createdAt} />}
        <View
          style={[
            styles(theme).content,
            {
              paddingVertical: isPreviousMsgSame ? 0 : undefined,
            },
          ]}
        >
          {!isMe && !isPreviousMsgSame ? (
            <Image
              source={{ uri: item.sender.avatar.url }}
              style={styles(theme).messageAvatar}
            />
          ) : (
            <View style={styles(theme).avatarPlaceholder} />
          )}
          <View
            style={[
              styles(theme).messageContainer,
              isMe && styles(theme).messageContainerReverse,
            ]}
          >
            <View
              style={[
                isMe ? styles(theme).outgoing : styles(theme).incoming,
                hasAttachments && styles(theme).messageWithImage,
              ]}
            >
              {hasAttachments && (
                <Image
                  source={{ uri: item.attachments[0].url }}
                  style={styles(theme).attachmentImage}
                  resizeMode="cover"
                />
              )}
              {item.content.trim() !== "" && (
                <MyText
                  text={item.content}
                  weight="400"
                  size={12}
                  style={{
                    textAlign: isMe ? "right" : "left",
                    marginTop: hasAttachments ? 8 : 0,
                  }}
                  textColor={DarkTheme.colors.chat}
                />
              )}
            </View>
          </View>
        </View>
      </>
    );
  };

  const DateDivider: React.FC<{ date: string }> = ({ date }) => {
    const formatDate = (dateString: string) => {
      const messageDate = new Date(dateString);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (isSameDay(dateString, today.toISOString())) {
        return "Today";
      } else if (isSameDay(dateString, yesterday.toISOString())) {
        return "Yesterday";
      } else {
        return messageDate.toLocaleDateString();
      }
    };

    return (
      <View style={styles(theme).dateDivider}>
        <Card.Divider />
        <MyText
          text={formatDate(date)}
          textColor="#969696"
          size={10}
          style={{ paddingHorizontal: 10 }}
        />
        <Card.Divider />
      </View>
    );
  };

  const ChatMessage = (id: string, members: string[], text: string) => ({
    chatId: id,
    members: members,
    messages: text,
  });
  const ChatTyping = (id: string, members: string[]) => ({
    chatId: id,
    members: members,
  });

  const Dropdown: React.FC = () => (
    <View style={styles(theme).dropdown}>
      {["Mark as Unread", "Block", "Delete", "Archive"].map((text) => (
        <TouchableOpacity
          key={text}
          style={styles(theme).dropdownItem}
          onPress={() => console.log(text)}
        >
          <MyText size={12} text={text} />
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleSendMessage = () => {
    if (newMessage.length <= 0) {
      alert("Please write a message");
      return;
    }
    sendMessage(
      ChatMessage(
        chatDetails?._id ?? "",
        chatDetails?.members ?? [],
        newMessage
      )
    );
    setNewMessage("");
  };

  const Footer: React.FC = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View style={styles(theme).footer}>
        <View style={styles(theme).inputWrapper}>
          <MyFab
            items={[
              {
                key: "1",
                icon: "image-area",
                onPress: handleImageSelection,
              },
            ]}
          />
          <TextInput
            placeholder="Write Message"
            style={styles(theme).inputContainer}
            onChangeText={handleTyping}
            value={newMessage}
            multiline
            autoFocus={false}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSendMessage}
          style={styles(theme).sendButton}
        >
          <SendFlag />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  const handleImageSelection = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        const file: File = {
          uri: selectedImage.uri,
          type: selectedImage.type || "image/jpeg",
          name: selectedImage.fileName || "image.jpg",
          lastModified: Date.now(),
          size: selectedImage.fileSize || 0,
        };

        handleSendAttachment(file);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      alert("Error selecting image. Please try again.");
    }
  };

  const handleSendAttachment = async (file: File) => {
    try {
      const response = await handleChatAttachments(chatId || "", file);
      const userData = response.data;
      if (userData) {
        showToast("Attachments Send");
      } else {
        showToast(response.message || "User profile updation Failed", "error");
      }
    } catch (error) {
      showToast("Something went wrong", "error");
    }
  };

  const LoadingIndicator = () => (
    <View style={styles(theme).loadingIndicator}>
      <ActivityIndicator size="small" color={theme?.colors.primary} />
    </View>
  );

  return (
    <View style={styles(theme).container}>
      <OverlayLoader isShow={loading} />
      <Card radius={9} style={styles(theme).card}>
        {allUserChats.length > 0 && (
          <>
            <Header />
            <FlatList
              data={allUserChats}
              showsVerticalScrollIndicator={true}
              renderItem={renderMessage}
              keyExtractor={(item, index) => `${item._id}-${index}`}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={theme?.colors.primary}
                />
              }
              inverted={false}
              ListFooterComponent={isLoadingMore ? <LoadingIndicator /> : null}
              initialNumToRender={15}
              maxToRenderPerBatch={10}
              windowSize={10}
            />
            <TypingIndicator />
            <Footer />
          </>
        )}
        {isDropdownVisible && <Dropdown />}
      </Card>
    </View>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingVertical: 2,
      flex: 1,
    },
    card: {
      height: "100%",
    },
    typingIndicatorContainer: {
      marginStart: 24,
      marginEnd: 24,
      backgroundColor: theme?.colors.background,
    },
    typingContainer: {
      position: "absolute",
      bottom: 10,
      left: 15,
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 5,
      borderRadius: 5,
    },
    header: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: theme?.colors.border,
    },
    headerContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerAvatar: {
      width: 35,
      height: 35,
      borderRadius: 35,
      marginRight: 20,
    },
    content: {
      width: "100%",
      flexDirection: "row",
      padding: 20,
    },
    messageAvatar: {
      width: 25,
      height: 25,
      borderRadius: 25,
      marginRight: 10,
    },
    avatarPlaceholder: {
      width: 25,
      height: 25,
      borderRadius: 25,
      marginRight: 10,
    },
    messageContainer: {
      flex: 1,
      alignItems: "flex-start",
    },
    messageContainerReverse: {
      flexDirection: "row-reverse",
    },
    incoming: {
      padding: 10,
      borderRadius: 10,
      borderTopLeftRadius: 0,
      backgroundColor: "#F1F1F1",
      maxWidth: "80%",
    },
    outgoing: {
      padding: 10,
      borderRadius: 10,
      borderBottomRightRadius: 0,
      backgroundColor: "#FFEEE7",
      maxWidth: "80%",
    },
    messageWithImage: {
      padding: 4,
    },
    attachmentImage: {
      width: IMAGE_WIDTH,
      height: IMAGE_WIDTH * 0.75,
      borderRadius: 8,
    },
    dateDivider: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      height: 60,
      marginVertical: 3,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 50,
      borderColor: theme?.colors.border,
    },
    inputContainer: {
      flexDirection: "row",
      backgroundColor: "transparent",
      paddingHorizontal: 0,
      borderRadius: 0,
      alignItems: "flex-start",
      elevation: 0,
      flex: 1,
      maxHeight: 100,
    },
    inputStyle: {
      color: theme?.colors.placeholderText,
      padding: 0,
      fontSize: 14,
      fontWeight: "300",
      fontFamily: "Inter",
      height: 20,
    },
    sendButton: {
      flex: 0.1,
      marginLeft: 12,
    },
    dropdown: {
      position: "absolute",
      top: 43,
      right: 10,
      backgroundColor: theme?.colors.background,
      borderRadius: 5,
      elevation: 3,
      width: 125,
    },
    dropdownItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: theme?.colors.border,
    },
  });