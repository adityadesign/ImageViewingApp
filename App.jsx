import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomePage from "./app/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons"

const Stack = createNativeStackNavigator();

export default function App() {
  const NavIcons = ({ type }) => {
    return (
      <TouchableOpacity>
        <Feather name={`${type}`} size={24} color="black" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{
              headerLeft: () => <NavIcons type="menu" />,
              headerTitleAlign: "center",
              headerTitle: "Imager",
              headerRight: () => <NavIcons type="search" />,
              statusBarStyle: 'dark',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
