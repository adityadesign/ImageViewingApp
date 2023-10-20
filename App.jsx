import { TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomePage from "./app/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

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
      <TouchableOpacity onPress={() => handleChange(type)}>
        <Feather name={`${type}`} size={24} color="black" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomePage}
            initialParams={menuSelected}
            options={{
              headerLeft: () => <NavIcons type="menu" />,
              headerTitleAlign: "center",
              headerTitle: "Imager",
              headerRight: () => <NavIcons type="search" />,
              statusBarStyle: "dark",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
