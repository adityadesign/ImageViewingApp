import React, { useContext, useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Text,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { createClient } from "pexels";
import { API_KEY } from "@env";
import { AppContext } from "./Context";

const client = createClient(API_KEY);

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isSearch = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState();
  const [defaultData, setDefaultData] = useState();

  useEffect(() => {
    setIsLoading(true);
    client.photos.curated({ per_page: 10 }).then((photos) => {
      setData(photos);
      setIsLoading(false);
      setDefaultData(photos);
    });
  }, []);

  useEffect(() => {
    if (searchText.length === 0) {
      setData(defaultData);
      return;
    }
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

  const Item = ({ item }) => {
    return (
      <TouchableOpacity className="w-[50%] p-1">
        <Image
          className="h-[270px] w-[100%] rounded-md"
          source={{ uri: item.src.medium }}
          contentFit="cover"
          contentPosition="center"
          transition={500}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 ">
      {isSearch && (
        <TextInput
          className="border-[1px] bg-white mx-4 mt-4 rounded-md p-1 border-gray-400"
          onChangeText={setSearchText}
          value={searchText}
          autoFocus={true}
          placeholder="Search"
        />
      )}
      {isLoading ? (
        <ActivityIndicator className="flex-1" size={"50px"} />
      ) : (
        <>
          {data && (
            <>
              <FlatList
                className="m-3"
                data={data.photos}
                numColumns={2}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item.id}
              />
              {data !== defaultData && (
                <View className="flex-row justify-center gap-5 mb-3">
                  <TouchableOpacity
                    onPress={() => [setPageNumber(1), setIsLoading(true)]}
                  >
                    <Text>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => [setPageNumber(2), setIsLoading(true)]}
                  >
                    <Text>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => [setPageNumber(3), setIsLoading(true)]}
                  >
                    <Text>3</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => [setPageNumber(4), setIsLoading(true)]}
                  >
                    <Text>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => [setPageNumber(5), setIsLoading(true)]}
                  >
                    <Text>5</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default HomePage;
