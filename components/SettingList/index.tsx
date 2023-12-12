import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import {
  ArrowRight,
  FeedBackIcon,
  LogoutIcon,
  NotificationIcon,
  PreferencesIcon,
  PrivacyPolicyIcon,
  TermConditionsIcon,
} from "@assets/images/svg";
import { toggleTheme } from "features/themeSlice";
import MyText from "../MyText";
import { ToggleSwitch } from "../MySwitch";

export interface IList {
  title: string;
  indexIcon: number;
}

interface SvgIcon {
  [key: number]: any;
}

export default function InboxList({ title, indexIcon }: IList) {
  const dispatch = useDispatch();
  const [switchValue, setSwitchValue] = useState(false);

  const svgIcons: SvgIcon = {
    0: <NotificationIcon />,
    1: <PreferencesIcon />,
    2: <FeedBackIcon />,
    3: <PrivacyPolicyIcon />,
    4: <TermConditionsIcon />,
    5: <LogoutIcon />,
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.dflex}>
        <View style={styles.avatarStyle}>
          {svgIcons[indexIcon]}
          <View style={styles.textStyle}>
            <MyText text={title} size={16} weight="500" />
          </View>
        </View>

        <View style={styles.dateTimeStyle}>
          {indexIcon === 0 && (
            <ToggleSwitch
              value={switchValue}
              onValueChange={() => {
                dispatch(toggleTheme(!switchValue ? "Dark" : "Default"));
                setSwitchValue(!switchValue);
              }}
            />
          )}
          {indexIcon !== 0 && indexIcon !== 5 && <ArrowRight />}
        </View>
      </View>
      {indexIcon !== 5 && <View style={styles.divider} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  dflex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 5,
  },
  avatarStyle: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 3,
  },
  textStyle: {
    marginLeft: 10,
  },
  dateTimeStyle: {
    flex: 1,
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingRight: 15,
  },
  circle: {
    backgroundColor: "#126FAA",
    borderRadius: 25,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    marginTop: 3,
  },
  countStyle: {
    backgroundColor: "#FFF9F6",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  divider: {
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 1,
    width: "100%",
    margin: "auto",
  },
});
