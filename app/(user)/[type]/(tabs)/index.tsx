import { Redirect, useLocalSearchParams } from "expo-router";

import { UserType } from "@types";

export default function Tabs() {
  const { type } = useLocalSearchParams<{ type: UserType }>();

  return <Redirect href={`(user)/${type}/(tabs)/home`} />;
}
