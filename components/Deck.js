import React, { useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	Animated,
	TouchableWithoutFeedback,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { type } from "../store";

function RecievedDeck(props) {
	const link = props.linkTo;
	const navigation = useNavigation();
	const scale = useRef(new Animated.Value(1)).current;
	const scaleUp = () => {
		Animated.timing(scale, {
			toValue: 1.3,
			duration: 1000,
			useNativeDriver: true,
		}).start(() => scaleDown());
	};

	const scaleDown = () => {
		Animated.timing(scale, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start(() => clickHandle());
	};
	const clickHandle = () => {
		navigation.navigate(link, { id: props.deck });
	};

	return (
		<TouchableWithoutFeedback onPress={scaleUp}>
			<Animated.View>
				<Text>{props.title}</Text>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
}

function Deck(props) {
	const DeckId = props.route.params.id;
	localStorage.setItem("id", DeckId);
	console.log(DeckId, "id");
	const store = props.store;
	console.log(store, "deck store");
	const idDeck = store[DeckId];
	console.log(idDeck, "deck id");
	const navigation = useNavigation();
	return (
		<ScrollView>
			<View>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => navigation.navigate("Home")}>
						<Ionicons
							name="arrow-back-circle-outline"
							size={25}
							color="rgb(33, 150, 243)"
						/>
					</TouchableOpacity>
					<View style={styles.viewText}>
						<Text>{idDeck.title}</Text>
						<Text>{idDeck.cards.length} cards</Text>
					</View>
				</View>
				<View style={[styles.addCard]}>
					<RecievedDeck
						title="Click to add Card"
						linkTo="AddCard"
						DeckId={DeckId}
					/>
					{idDeck.cards.length === 0 ? (
						<View></View>
					) : (
						<RecievedDeck title="Quize" linkTo="Quiz" DeckId={DeckId} />
					)}
				</View>
				<View>
					<Text>Cards:</Text>
				</View>
				{idDeck.cards.map((card, i) => {
					return (
						<View key={i}>
							<Text>{card.question.substring(0, 35) + "..."}</Text>
							<TouchableOpacity
								onPress={() => {
									Alert.alert("You are to delete this", [
										{
											text: "yes",
											onPress: () =>
												props.dispatch({
													type: type.REMOVE_CARD,
													id: i,
													deck: DeckId,
												}),
										},
										{ text: "no" },
									]);
								}}
							>
								<Ionicons name="trash-bin" />
							</TouchableOpacity>
						</View>
					);
				})}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "white",
		shadowRadius: 3,
		shadowColor: "rgba(0,0,0,0.24)",
		shadowOpacity: 0.8,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		justifyContent: "space-around",
		flexDirection: "row",
		height: 70,
		alignItems: "center",
	},
	viewText: {
		flexDirection: "row",
		// gap: 20,
	},
	addCard: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 100,
		backgroundColor: "white",
		shadowRadius: 3,
		shadowColor: "rgba(0,0,0,0.24)",
		shadowOpacity: 0.8,
		shadowOffset: {
			width: 0,
			height: 3,
		},
    height:100,
	cursor:'pointer'
	},
});
const mapStateToProps = (state) => {
	return {
		store: state,
	};
};

export default connect(mapStateToProps)(Deck);
