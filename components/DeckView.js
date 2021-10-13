import React from "react";
import {
	ScrollView,
	FlatList,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";




function Card(props) {
	console.log(props.decks, "cardss");
	const {decks} = props
	return (
		<ScrollView>
			<View style={styles.container}>
				{Object.keys(decks).map((deck, i) => (
					<TouchableOpacity
						onPress={() => console.log("Pressed!")}
						key={decks[deck].id}
					>
						<View style={styles.card}>
							<Text>{decks[deck].title}</Text>
							<Text>Card(s): {decks[deck].cards.length}</Text>
						</View>
					</TouchableOpacity>
				))}
			</View>
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
