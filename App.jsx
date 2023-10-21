import { TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomePage from "./app/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { AppContext } from "./app/Context";
import DetailsPage from "./app/DetailsPage";

//for navigation if needed.
const Stack = createNativeStackNavigator();

export default function App() {
  //variables for search and hamburger icons.
  const [menuSelected, setMenuSelected] = useState(false);
  const [searchSelected, setSearchSelected] = useState(false);

  //handling the change of state when a specific button is clicked.
  const handleChange = (type) => {
    if (type === "menu") setMenuSelected((prev) => !prev);
    else if (type === "search") setSearchSelected((prev) => !prev);
  };

  //to display the icons on either side of the header which takes type as a parameter.
  const NavIcons = ({ type }) => {
    return (
      <TouchableOpacity onPress={() => handleChange(type)}>
        {searchSelected && type === "search" ? (
          <AntDesign name="up" size={24} color="white" />    //when search is clicked the icon needs to be changed to 'up'
        ) : (
          <Feather name={`${type}`} size={24} color="white" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <AppContext.Provider value={searchSelected}>
        <StatusBar style="light" backgroundColor="#121212" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{
                headerLeft: () => <NavIcons type="menu" />,
                headerTitleAlign: "center",
                headerTitle: "Imager",
                headerRight: () => <NavIcons type="search" />,
                statusBarStyle: "dark",
                headerTintColor: "white",
                headerStyle: { backgroundColor: "#1f1f1f" },
                headerTitleStyle: { fontSize: 22 },
              }}
            />
            <Stack.Screen 
              name="Details"
              component={DetailsPage}
              options={{
                headerStyle: { backgroundColor: "#1f1f1f" },
                headerTintColor: "white",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}
