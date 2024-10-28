import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import ToggleSwitch from "../MySwitch/toggleSwitch";
import MyText from "../MyText";
import { toggleTheme } from "features/themeSlice";
import useSessionManagement from "hooks/useSessionManagement";
import { storage } from "store/mmkv";

export interface PList {
  title: string;
  value: boolean;
  subtitle: string;
  indexIcon: number;
  index: number;
  onPress?: () => void;
  onToggleChange: (key: string, value: boolean) => void;
}

export default function PreferencesList({
  title,
  value,
  subtitle,
  indexIcon,
  index,
  onPress,
  onToggleChange
}: PList) {
  const [switchValue, setSwitchValue] = useState<boolean>(
    storage.getBoolean("theme") ? true : false
  );
  const [toggleValue, setToggleValue] = useState(value);
  const { updateThemeInSession } = useSessionManagement();

  const handleToggleValue = (key: number, value:boolean) => {
    onToggleChange?.(key.toString(), value); 
  };

  useEffect(() => {
    setToggleValue(value)
  }, [value])

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.dflex} onPress={onPress}>
        <View style={styles.textStyle}>
          <MyText text={title} size={14} />
          <MyText text={subtitle} size={12} textColor="#666666" />
        </View>

        <View style={styles.dateTimeStyle}>
          {indexIcon === 0 && (
            <ToggleSwitch
              value={switchValue}
              onValueChange={(val) => {
                console.log("switch value before: ", switchValue);
                setSwitchValue(!switchValue);
                updateThemeInSession(switchValue ? "Default" : "Dark");
                console.log("switch value after: ", switchValue);
              }}
            />
          )}
          {indexIcon !== 0 && indexIcon !== 4 && (
            <ToggleSwitch
              value={toggleValue}
              onValueChange={(val) => {
                // console.log("toggle");
                handleToggleValue(index, val);
              }}
            />
          )}
        </View>
      </Pressable>
      {indexIcon !== 4 && <View style={styles.divider} />}
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
  },

  textStyle: {
    marginLeft: 10,
    rowGap: 5,
    width: "70%",
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
  divider: {
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: "1.5%",
  },
});
