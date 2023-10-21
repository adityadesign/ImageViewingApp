import { TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomePage from "./app/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { AppContext } from "./app/Context";

const Stack = createNativeStackNavigator();

export default function App() {
  const [menuSelected, setMenuSelected] = useState(false);
  const [searchSelected, setSearchSelected] = useState(false);

  const handleChange = (type) => {
    if (type === "menu") setMenuSelected((prev) => !prev);
    else if (type === "search") setSearchSelected((prev) => !prev);
  };

  const NavIcons = ({ type }) => {
    return (
      <TouchableOpacity onPress={() => handleChange(type)} className="my-3">
        {searchSelected && type === "search" ? (
          <AntDesign name="up" size={24} color="white" />
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
                headerBackVisible: false,
                headerStyle: { backgroundColor: "#1f1f1f" },
                headerTitleStyle: { fontSize: 22 },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}
