import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { client } from "./HomePage";
import { A } from "@expo/html-elements";
import { ImageBackground } from "react-native";
import { BlurView } from "expo-blur";

const DetailsPage = ({ route }) => {
  const [details, setDetails] = useState();
  useEffect(() => {
    client.photos.show({ id: route.params.id }).then((photo) => {
      setDetails(photo);
    });
  }, []);

  const DisplayLinks = ({ type, link }) => {
    return (
      <Text className="text-white font-bold text-base">
        {type}:{" "}
        <A href={link} style={{ color: "dodgerblue", fontSize: 16 }}>
          {link}
        </A>
      </Text>
    );
  };

  return (
    <View className="flex-1 bg-[#1f1f1f]">
      {details ? (
        <ImageBackground
          source={{ uri: details.src.large }}
          resizeMode="cover"
          blurRadius={10}
          style={{flex:1}}
        >
          <ScrollView>
            <View className="p-8 ">
              <Image
                className="w-full h-[450px] mb-3 rounded-md"
                source={{ uri: details.src.large }}
                contentFit="cover"
                contentPosition="center"
                transition={500}
                style={{ elevation: 10 }}
              />
              <BlurView
                intensity={50}
                className="p-4 mt-4"
                style={{ elevation: 10, borderRadius: 10, overflow: "hidden" }}
              >
                <Text className="text-white font-bold text-2xl mb-3">
                  {details.alt.length > 0 ? details.alt : "Details"}
                </Text>
                <Text className="text-white font-bold text-base">
                  Photographer: {details.photographer}
                </Text>
                <DisplayLinks
                  type={"PhotographerLink"}
                  link={details.photographer_url}
                />
                <DisplayLinks type={"Image Url"} link={details.url} />
              </BlurView>
            </View>
          </ScrollView>
        </ImageBackground>
      ) : (
        <ActivityIndicator className="flex-1" size={"50px"} />
      )}
    </View>
  );
};

export default DetailsPage;
