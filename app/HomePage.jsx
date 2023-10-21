import React, { useContext, useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  TextInput,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { createClient } from "pexels";
import { API_KEY } from "@env";
import { AppContext } from "./Context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

//Using API_KEY to authenticate with the Pexels API
export const client = createClient(API_KEY);

const HomePage = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isSearch = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState();
  const [defaultData, setDefaultData] = useState(); //this is used when the searchText is empty.

  //Get the data from the API when the app loads for the first time and only runs one time.
  useEffect(() => {
    setIsLoading(true);
    client.photos.curated({ per_page: 10 }).then((photos) => {
      setData(photos);
      setIsLoading(false);
      setDefaultData(photos);
    });
  }, []);

  //Debounce method for getting the data from the API for search queries, which runs only when searchText or pageNumber is changed.
  useEffect(() => {
    //When the searchText is empty assign the defaultData to display the data instead of empty screen.
    if (searchText.length === 0) {
      setData(defaultData);
      return;
    }
    //Debounce method
    const timer = setTimeout(() => {
      if (searchText.length > 0) {
        setIsLoading(true);
        try {
          client.photos
            .search({ query: searchText, per_page: 10, page: pageNumber })
            .then((photos) => {
              setData(photos);
              setIsLoading(false);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText, pageNumber]);

  //Function to display the single image, used inside the map function.
  const Item = ({ item }) => {
    return (
      <TouchableOpacity className="w-[50%] p-1 relative" style={styles.image} onPress={()=> navigation.navigate('Details', {id: item.id})}>
        <LinearGradient
          colors={["transparent", "black"]}
          className="rounded-md"
        >
          <Image
            className="h-[270px] w-[100%] rounded-md opacity-80 -z-10"
            source={{ uri: item.src.medium }}
            contentFit="cover"
            contentPosition="center"
            transition={500}
          />
        </LinearGradient>
        <View className="absolute bottom-4 left-3 drop-shadow-md w-[100%]">
          {/* <Text className="text-white font-bold text-[16px]">Artist:</Text> */}
          <Text className="text-gray-400 py-1">{item.photographer}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-[#121212]">
      {/* Text input for search which only appears when search icon is clicked. */}
      {isSearch && (
        <View className="border-[1px] bg-white mx-4 mt-4 rounded-md p-1 border-gray-400 flex-row justify-between">
          <TextInput
            className="flex-1"
            onChangeText={(text) => [setSearchText(text), setPageNumber(1)]}
            value={searchText}
            placeholder="Search"
          />
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Ionicons name="close-circle-sharp" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}

      {/* Display the searchText if its available */}
      <View className="mx-4 mt-4">
        <Text className="text-white font-semibold text-lg">
          {searchText.length > 0 ? "Searched" : "Curated"} Images:
          {searchText.length > 0 && searchText}
        </Text>
      </View>

      {isLoading ? (
        <ActivityIndicator className="flex-1" size={"50px"} />
      ) : (
        <>
          {data && (
            <ScrollView>
              <View className="flex-row flex-wrap mx-2 mt-3">
                {data?.photos.map((item) => {
                  return <Item item={item} key={item?.id} />;
                })}
                {data !== defaultData && (
                  <View className="flex-row justify-evenly w-[100%] mb-3 mt-1">
                    <TouchableOpacity
                      className="flex-row"
                      onPress={() => [
                        setPageNumber((prev) => prev - 1),
                        setIsLoading(true),
                      ]}
                      disabled={pageNumber === 1}
                    >
                      <MaterialIcons
                        name="navigate-before"
                        size={20}
                        color={`${pageNumber === 1 ? "grey" : "white"}`}
                      />
                      <Text
                        className={`text-white ${
                          pageNumber === 1 && "text-gray-500"
                        }`}
                      >
                        Prev
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-row"
                      onPress={() => [
                        setPageNumber((prev) => prev + 1),
                        setIsLoading(true),
                      ]}
                    >
                      <Text className="text-white">Next</Text>
                      <MaterialIcons
                        name="navigate-next"
                        size={20}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default HomePage;

// for only adding elevation property for image cards.
const styles = StyleSheet.create({
  image: {
    elevation: 10,
  },
});
