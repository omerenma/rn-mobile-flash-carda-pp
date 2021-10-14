import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import deck from "./store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "./logger";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import DeckView from "./components/DeckView";
import CreateDecks from "./components/CreateDecks";
import Deck from "./components/Deck";
import AddCard from "./components/AddCardsToDeck";
import Quiz from "./components/Quize";
import Results from "./components/Result";

const middleware = applyMiddleware(thunk, logger);

const store = createStore(deck, middleware);
console.log(store.getState(), "store");

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigation() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "New Deck") {
						iconName = focused ? "add-circle" : "add-circle-sharp";
					}
					return <Ionicons name={iconName} size={size} color={color} />;
				},

				tabBarActiveTintColor: "rgb(33, 150, 243)",
				tabBarInactiveTintColor: "gray",
			})}
		>
			<Tab.Screen name="Home" component={DeckView} />
			<Tab.Screen name="New Deck" component={CreateDecks} />
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="TabNav"
						component={TabNavigation}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Deck"
						component={Deck}
						options={{ headerShown: false }}
					/>

					<Stack.Screen
						name="AddCard"
						component={AddCard}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Quiz"
						component={Quiz}
						options={{ headerShown: false }}
					/>

					<Stack.Screen
						name="Result"
						component={Quiz}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
