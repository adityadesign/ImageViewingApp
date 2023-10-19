import React from "react";
import { Text, View } from "react-native";
import { createClient } from "pexels";
import { API_KEY } from "@env";

const HomePage = () => {
  return (
    <View className="flex-1">
      <Text style={{ color: "black" }}>HomePage</Text>
    </View>
  );
};

export default HomePage;
