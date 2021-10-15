import React, { useRef } from "react";
import {
	ScrollView,
	FlatList,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { Animated } from "react-native";
import { type } from "../store";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function Dashboard(props) {
	console.log(props, "propsing");
	const navigation = useNavigation();
	const scale = useRef(new Animated.Value(1)).current;

	const moveUp = () => {
		Animated.timing(scale, {
			toValue: 1.2,
			duration: 50,
			useNativeDriver: true,
		}).start(() => scaleDown());
	};

	const scaleDown = () => {
		Animated.timing(scale, {
			toValue: 1.2,
			duration: 50,
			useNativeDriver: true,
		}).start(() => clickHandle());
	};

	const clickHandle = () => {
		console.log(navigation, "navigation props");
		navigation.navigate("Deck", { id: props.id });
	};

	const deleteCard = () => {
		Alert.alert("Warning", "do you wish to delete this deck?", [
			{
				text: "yes",
				onPress: () =>
					props.dispatch({
						type: type.DELETE_DECK,
						id: props.id,
					}),
			},
			{ text: "no" },
		]);
	};

	return (
		<TouchableWithoutFeedback onPress={() =>{moveUp()}}>
			<Animated.View style={[styles.card, { transform: [{ scale: scale }] }]}>
				<TouchableOpacity onPress={deleteCard}>
					<Text>{props.name}</Text>
					<Text>{props.numberofCards} cards</Text>
				</TouchableOpacity>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
}

function Card(props) {
	console.log(props.decks, "cardss");
	const { decks } = props;

	const navigation = useNavigation();

	

	return (
		<ScrollView>
			{Object.keys(decks).map((deck, i) => {
				return (
					<Dashboard
						key={i}
						name={decks[deck].title}
						numberofCards={decks[deck].cards.length}
						id={decks[deck].id}
						navigation={props.navigation}
					/>
					// <TouchableWithoutFeedback
					//  key={i} onPress={() => {moveUp}}
					//  id={decks[deck].id}
					//  >
					// 	<Animated.View
							
					// 		style={[styles.card, { transform: [{ scale: scale }] }]}
					// 	>
					// 		<Text>{decks[deck].title}</Text>
					// 		<Text>{decks[deck].cards.length}</Text>
					// 	</Animated.View>
					// </TouchableWithoutFeedback>
					// <Dashboard
					// 	key={i}
					// 	// name={decks[deck].cards.title}
					// 	numberofCards={decks[deck].cards.length}
					// 	id={decks[deck].id}
					// 	navigation={props.navigation}
					// />
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
	},
	card: {
		margin: 10,
		backgroundColor: "white",
		width: "100%.",
		height: 250,
		borderRadius: 5,
		/* box shadow */
		shadowColor: "#adb5bd",
		shadowOffset: { width: 0, height: 0.2 },
		shadowOpacity: 0.8,
		shadowRadius: 5,
		elevation: 5,
		/* center content */
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

const mapStateToProps = (state) => {
	return {
		decks: state,
	};
};
export default connect(mapStateToProps)(Card);
