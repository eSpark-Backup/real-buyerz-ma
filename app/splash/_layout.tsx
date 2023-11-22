import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { customFonts } from "../../utils/customFonts";
import { customImages } from "../../utils/customImages";
import * as Font from "expo-font";

export default function SplashLayout() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadVectors();
  }, []);

  const loadVectors = async () => {
    await Font.loadAsync(customFonts);
    await Font.loadAsync(customImages);
    setLoaded(true);
  };
  return <Slot />;
}
