import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, FlatList,RefreshControl } from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  router,
  useLocalSearchParams,
  useGlobalSearchParams,
  useFocusEffect,
} from "expo-router";

import { ReloadIcon } from "@assets/images";
import { MyText, InboxList, Card } from "@components";
import { MyTheme, UserType } from "@types";
import { useSocket } from "@components/SocketProvider";
import { Chat, handleGetChats } from "./utils";
import { storage } from "store/mmkv";
import { useChatSocket } from "@components/SocketProvider/chat";

const Inbox: React.FC = () => {
  const theme = useTheme() as MyTheme;
  const [tab, setTab] = useState("inbox");
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [alertCounts, setAlertCounts] = useState<Map<string, number>>(
    new Map()
  );
  const params = useGlobalSearchParams<{ type: UserType }>();
  const { refetchChats } = useSocket();
  const { newMessageAlertReceived } = useChatSocket();

  useFocusEffect(
    useCallback(() => {
      fetchChats();
      loadAlertCounts();
    }, [])
  );

  useEffect(() => {
    if (refetchChats) fetchChats();
  }, [refetchChats]);

  useEffect(() => {
    if (newMessageAlertReceived) {
      fetchChats();
      loadAlertCounts();
    }
  }, [newMessageAlertReceived]);

  const fetchChats = async (newPage: number = 1, isRefreshing = false) => {
    if (newPage > totalPages) return;

    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setIsLoading(true);
    }
    const result = await handleGetChats(newPage);
    console.log("Chats " + JSON.stringify(result));
    if (result.status && result.chats) {
      setChats((prevChats) => {
        const newChats = result?.chats?.Chats || [];
        const mergedChats = [...prevChats, ...newChats];
        const uniqueChats = Array.from(
          new Map(mergedChats.map((chat) => [chat._id, chat])).values()
        );
        return uniqueChats;
      });
    }
    setPage(result?.chats?.currentPage || newPage);
    setTotalPages(result?.chats?.totalPages || 1);
    if (isRefreshing) {
      setRefreshing(false);
    } else {
      setIsLoading(false);
    }
  };

  const handleTab = (buttonName: string) => {
    if (tab !== buttonName) {
      setTab(buttonName);
    }
  };

  const onRefresh = () => {
    if (page < totalPages) {
      fetchChats(page + 1, true);
    }
  };

  const loadAlertCounts = () => {
    const storedAlerts = JSON.parse(storage.getString("alertCount") || "[]");
    setAlertCounts(new Map<string, number>(storedAlerts));
  };

  const handleRefresh = () => {
    fetchChats();
    loadAlertCounts();
  };

  return (
    <View style={styles(theme).wrapper}>
      <View style={styles(theme).card}>
        <View style={styles(theme).tabRow}>
          <View style={styles(theme).tabsStyle}>
            <TouchableOpacity activeOpacity={1} onPress={handleRefresh}>
              <ReloadIcon />
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  styles(theme).singleTab,
                  tab === "inbox" ? styles(theme).selectedTab : null,
                ]}
                onPress={() => handleTab("inbox")}
              >
                <MyText
                  text="Inbox"
                  size={17}
                  textColor={
                    tab === "inbox" ? theme.colors.primary : theme.colors.text
                  }
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => handleTab("archive")}
              style={[
                styles(theme).singleTab,
                tab === "archive" ? styles(theme).selectedTab : null,
              ]}
            >
              <MyText
                text="Archive"
                size={17}
                textColor={
                  tab === "archive" ? theme.colors.primary : theme.colors.text
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        {tab === "inbox" && (
          <FlatList
            data={chats}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={fetchChats}
                tintColor={theme?.colors.primary}
              />
            }
            onEndReached={onRefresh}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <MyText
                  text={isLoading ? "Loading chats..." : "No chats found"}
                />
              </View>
            )}
            renderItem={({ item, index }) => {
              const unreadCount = alertCounts.get(item._id) || 0;
              return (
                <InboxList
                  key={item._id}
                  title={item.members.name}
                  subTitle={`${item.lastMessage.content}`}
                  count={unreadCount > 0 ? unreadCount.toString() : ""}
                  avatarUrl={
                    item.members.avatar.url ??
                    "https://picsum.photos/id/151/130"
                  }
                  time={new Date(item.updatedAt).toLocaleTimeString()}
                  onPress={() =>
                    router.navigate({
                      pathname: `(user)/${params?.type!}/inbox/chat`,
                      params: {
                        chatId: item._id,
                        name: item.members.name,
                        url:
                          item.members.avatar.url ??
                          "https://picsum.photos/id/151/130",
                      },
                    })
                  }
                />
              );
            }}
            ItemSeparatorComponent={() => (
              <Card.Divider style={{ width: "85%", alignSelf: "center" }} />
            )}
          />
        )}
        {tab === "archive" && <MyText text="Archive" />}
      </View>
    </View>
  );
};

export default Inbox;

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      height: "100%",
    },
    card: {
      borderRadius: 15,
      borderColor: theme?.colors.border,
      height: "100%",
      borderWidth: 1,
      padding: 0,
      overflow: "hidden",
    },
    tabRow: {
      paddingTop: 8,
      paddingStart: 4,
      borderBottomColor: theme?.colors.border,
      borderBottomWidth: 1,
    },
    tabsStyle: {
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      width: "60%",
      paddingHorizontal: 15,
    },
    singleTab: {
      height: 40,
      justifyContent: "center",
    },
    selectedTab: {
      borderBottomColor: theme?.colors.primary,
      borderBottomWidth: 2,
      paddingBottom: 4,
    },
    tabColor: {
      color: theme?.colors.primary,
    },
  });
