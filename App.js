import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "./colors";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}
