import React, { Component } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Platform,
} from "react-native";
import {useNavigation} from '@react-navigation/native'
import { connect } from "react-redux";
import { type } from "../store";

const uuID = () => {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
};
class CreateDecks extends Component {
	state = {
		input: "",
	};
	handleChange = (e) => {
		this.setState({ input: e.target.value });
	};

	handleSubmit = () => {
		const { input } = this.state;
		if (input !== "") {
			let id = uuID();
			this.props.dispatch({
				type: type.ADD_DECK,
				deck: {
					id: id,
					title: input,
					cards: [],
				},
			});
            this.props.navigation.navigate("Deck", { id: id });
		}
	};
	render() {
		const { input } = this.state;
		return (
			<View style={styles.container}>
				<Text>Deck Name</Text>
				<TextInput
					placeholder="Enter deck name"
					style={styles.input}
					onChange={this.handleChange}
					value={input}
				/>
				<TouchableOpacity
					disabled={input === "" ? true : false}
					style={
						(styles.button, input === "" ? styles.disabledBtn : styles.button)
					}
					onPress={this.handleSubmit}
				>
					<Text style={styles.text}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		//flexDirection: "row",
		backgroundColor: "white",
		borderRadius: Platform.OS === "ios" ? 16 : 5,
		padding: 80,
		gap: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		justifyContent: "space-around",
		alignItems: "center",
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: "rgba(0,0,0,0.24)",
		shadowOffset: {
			width: 0,
			height: 3,
		},
	},
	input: {
		border: "1px solid rgb(33, 150, 243)",
		width: 300,
		height: 30,
		borderRadius: 5,
		textAlign: "center",
		padding: 10,
	},

	button: {
		backgroundColor: "rgb(33, 150, 243)",
		padding: 10,
		borderRadius: 5,
		width: 300,
	},
	disabledBtn: {
		backgroundColor: "gray",
		width: 300,
		padding: 10,
	},
	text: {
		color: "white",
		fontWeight: "700",
		textAlign: "center",
	},
});

const mapStateToProps = (state) => {
	return {
		data: state,
	};
};
export default connect(mapStateToProps)(CreateDecks);
