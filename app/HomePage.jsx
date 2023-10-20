import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View, FlatList } from "react-native";
import { Image } from "expo-image";
import { createClient } from "pexels";
import { API_KEY } from "@env";

const client = createClient(API_KEY);
const query = "Nature";

const HomePage = () => {
  const [data, setData] = useState({
    next_page:
      "https://api.pexels.com/v1/search/?page=2&per_page=10&query=Nature",
    page: 1,
    per_page: 10,
    photos: [
      {
        alt: "Tall majestic palm trees on green hills",
        avg_color: "#A39A86",
        height: 4912,
        id: 6590699,
        liked: false,
        photographer: "Alexis Ricardo Alaurin",
        photographer_id: 1507405,
        photographer_url: "https://www.pexels.com/@alexisricardoalaurin",
        src: [Object],
        url: "https://www.pexels.com/photo/tall-majestic-palm-trees-on-green-hills-6590699/",
        width: 3264,
      },
      {
        alt: "Shiny Water Surface",
        avg_color: "#2F302A",
        height: 2489,
        id: 13284758,
        liked: false,
        photographer: "stayhereforu",
        photographer_id: 216201233,
        photographer_url: "https://www.pexels.com/@stayhereforu-216201233",
        src: [Object],
        url: "https://www.pexels.com/photo/shiny-water-surface-13284758/",
        width: 3766,
      },
      {
        alt: "Close-Up Photograph of Green Leaves",
        avg_color: "#4B6A40",
        height: 6000,
        id: 12879014,
        liked: false,
        photographer: "Sean Valentine",
        photographer_id: 1694877,
        photographer_url: "https://www.pexels.com/@seanrvalentine",
        src: [Object],
        url: "https://www.pexels.com/photo/close-up-photograph-of-green-leaves-12879014/",
        width: 4000,
      },
      {
        alt: "Dolphins swimming underwater",
        avg_color: "#3E8FAA",
        height: 4000,
        id: 9638689,
        liked: false,
        photographer: "Kammeran Gonzalez-Keola",
        photographer_id: 3137381,
        photographer_url:
          "https://www.pexels.com/@kammeran-gonzalez-keola-3137381",
        src: [Object],
        url: "https://www.pexels.com/photo/dolphins-swimming-underwater-9638689/",
        width: 6000,
      },
      {
        alt: "Couple of Green Cheeked Parakeets",
        avg_color: "#66753A",
        height: 4255,
        id: 14934612,
        liked: false,
        photographer: "Marcelo Chagas",
        photographer_id: 861665,
        photographer_url: "https://www.pexels.com/@marcelochagas",
        src: [Object],
        url: "https://www.pexels.com/photo/couple-of-green-cheeked-parakeets-14934612/",
        width: 2837,
      },
      {
        alt: "Water around Rocks on Shore",
        avg_color: "#42575A",
        height: 5163,
        id: 16776159,
        liked: false,
        photographer: "Nathan Tran",
        photographer_id: 292691073,
        photographer_url: "https://www.pexels.com/@nathan-tran-292691073",
        src: [Object],
        url: "https://www.pexels.com/photo/water-around-rocks-on-shore-16776159/",
        width: 3872,
      },
      {
        alt: "Clouds over Mountains",
        avg_color: "#96A0AA",
        height: 6000,
        id: 16059681,
        liked: false,
        photographer: "Adrien Olichon",
        photographer_id: 1257089,
        photographer_url: "https://www.pexels.com/@adrien-olichon-1257089",
        src: [Object],
        url: "https://www.pexels.com/photo/clouds-over-mountains-16059681/",
        width: 4000,
      },
      {
        alt: "A House on a Hill between Trees in the Countryside ",
        avg_color: "#4D5444",
        height: 5184,
        id: 17676464,
        liked: false,
        photographer: "Octavian Iordache",
        photographer_id: 4847051,
        photographer_url: "https://www.pexels.com/@octavian",
        src: [Object],
        url: "https://www.pexels.com/photo/a-house-on-a-hill-between-trees-in-the-countryside-17676464/",
        width: 3456,
      },
      {
        alt: "Close up of Pink Flowers",
        avg_color: "#8C584D",
        height: 3872,
        id: 16948299,
        liked: false,
        photographer: "jasmin chew",
        photographer_id: 3315593,
        photographer_url: "https://www.pexels.com/@majesticaljasmin",
        src: [Object],
        url: "https://www.pexels.com/photo/close-up-of-pink-flowers-16948299/",
        width: 2581,
      },
      {
        alt: "River Flowing in Green Valley",
        avg_color: "#838F79",
        height: 7008,
        id: 17038848,
        liked: false,
        photographer: "Yunus Tuğ",
        photographer_id: 2618302,
        photographer_url: "https://www.pexels.com/@yunustug",
        src: [Object],
        url: "https://www.pexels.com/photo/river-flowing-in-green-valley-17038848/",
        width: 4672,
      },
    ],
    total_results: 8000,
  });
  // useEffect(() => {
  //   client.photos.search({ query, per_page: 10 }).then((photos) => {
  //     setData(photos);
  //   });
  // }, []);

  const Item = ({ item }) => {
    return (
      <TouchableOpacity className="w-[50%] p-1">
        <Image
          className="h-[270px] w-[100%] rounded-md"
          source="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
          // source={{ uri: item.src.tiny }}
          contentFit="cover"
          transition={500}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 ">
      {data.photos && (
        <FlatList
          className="m-3"
          data={data.photos}
          numColumns={2}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default HomePage;
