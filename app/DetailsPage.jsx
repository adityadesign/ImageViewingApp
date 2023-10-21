import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { client } from "./HomePage";
import { A } from "@expo/html-elements";

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
    <View className="flex-1 bg-[#121212] p-4">
      {details ? (
        <View>
          <Image
            className="w-full h-[70%] mb-3 rounded-md"
            source={{ uri: details.src.large }}
            contentFit="cover"
            contentPosition="center"
            transition={500}
          />
          <ScrollView>
            <Text className="text-white font-bold text-2xl mb-3">
              {details.alt.length > 0 ? details.alt : "Details"}
            </Text>
            <Text className="text-white font-bold text-base">
              Photographer:{" "}
              <Text className="text-gray-300 font-normal text-base">
                {details.photographer}
              </Text>
            </Text>
            <DisplayLinks type={"PhotographerLink"} link={details.photographer_url} />
            <DisplayLinks type={"Image Url"} link={details.url} />
          </ScrollView>
        </View>
      ) : (
        <ActivityIndicator className="flex-1" size={"50px"} />
      )}
    </View>
  );
};

export default DetailsPage;
