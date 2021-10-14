import React, { useRef, useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

function TakeQuiz(props) {
	const { data } = props;
	const navigation = useNavigation();

	const scaleUp = useRef(new Animated.Value(1)).current;
	const params = localStorage.id;

	const cardData = props.data[params].cards;

	console.log(cardData[0]["question"], "card");

	// State management
	const [position, setPosition] = useState(0);
	const [displayAnswer, setAnswer] = useState("false");
	const [rightAnswer, serRightAnswer] = useState(0);
	const [wrogAnswer, setWrongAnswer] = useState(0);
	const [finishedQuize, setFinishedQuize] = useState("false");

	useEffect(() => {
		if (finishedQuize === 'true') {
			finish();
		}
	}, [finishedQuize]);

	const finish = () => {
		setFinishedQuize("false");
		serRightAnswer(0);
		setWrongAnswer(0);
		setPosition(0);
		setAnswer('false');

		navigation.navigate("Results", {
			id: params,
			wrogAnswer,
			rightAnswer,
		});
	};

	function nextQuestion() {
		scaleUps();
		setAnswer("false");
		if (position + 1 !== cardData.length) {
			setPosition(position + 1);
		} else {
			setPosition(position + 1);
			setFinishedQuize("true");
		}
	}
	const scaleUps = () => {
		Animated.timing(scaleUp, {
			toValue: 1.2,
			duration: 50,
			useNativeDriver: true,
		}).start(() => scaleDown());
	};

	const scaleDown = () => {
		Animated.timing(scaleUp, {
			toValue: 1.2,
			duration: 50,
			useNativeDriver: true,
		}).start();
	};

	return (
		<View>
			<View style={styles.navBar}>
				<TouchableOpacity
					style={{ marginLeft: 15 }}
					onPress={() => navigation.goBack()}
				>
					{/* <AntDesign name="arrowleft" size={40} color="#1D3557" /> */}
				</TouchableOpacity>
				<View style={{ marginLeft: 10 }}>
					<Text
						style={{
							fontSize: 24,
							fontWeight: "bold",
							color: "#1D3557",
						}}
					>
						Quiz
					</Text>
					<Animated.Text
						style={{
							fontFamily: "Play_400Regular",
							color: "white",
							transform: [{ scale: scaleUp }],
						}}
					>
						{position + 1}/{cardData.length}
					</Animated.Text>
				</View>
			</View>

			<View style={{ padding: 20 }}>
				<Text style={styles.title}>Take a Guess!</Text>
				<View style={styles.card}>
					<Animated.Text
						style={[styles.question, { transform: [{ scale: scaleUp }] }]}
					>
						{/* {console.log(cardData[position].question, "ques")} */}
						{cardData[position]["question"]}
					</Animated.Text>

					{displayAnswer === "false" ? (
						<TouchableOpacity
							style={{ marginTop: 170 }}
							onPress={() => setAnswer("true")}
						>
							<Text
								style={{
									color: "white",
									fontSize: 20,
									fontWeight: "bold",
								}}
							>
								View Answer
							</Text>
						</TouchableOpacity>
					) : (
						<View style={{ marginTop: 170 }}>
							<Text
								style={{
									color: "white",
									fontSize: 20,
									fontWeight: "bold",
								}}
							>
								{cardData[position]["answer"]}
							</Text>
						</View>
					)}

					<Text style={styles.myGuessTxt}>Answer:</Text>

					<View style={{ display: "flex", flexDirection: "row" }}>
						<TouchableOpacity
							onPress={() => {
								nextQuestion();
								setWrongAnswer(wrogAnswer + 1);
							}}
							style={[styles.btn, { backgroundColor: "white" }]}
						>
							<Text
								style={{
									color: "red",
									fontWeight: "bold",
									fontSize: 20,
								}}
							>
								Incorrect
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								nextQuestion();
								serRightAnswer(rightAnswer + 1);
							}}
							style={[styles.btn, { backgroundColor: "white" }]}
						>
							<Text
								style={{
									color: "green",
									fontWeight: "bold",
									fontSize: 20,
								}}
							>
								Correct
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		color: "#1D3557",
		fontWeight: "bold",
		fontSize: 24,
	},
	card: {
		height: 400,
		backgroundColor: "rgb(4, 133, 183)",
		borderRadius: 5,
		marginTop: 10,
		/* box shadow */
		shadowColor: "#adb5bd",
		shadowOffset: { width: 0, height: 0.2 },
		shadowOpacity: 0.8,
		shadowRadius: 5,
		elevation: 5,
		/* center content */
		display: "flex",
		alignItems: "center",
	},
	question: {
		position: "absolute",
		textAlign: "center",
		color: "#1D3557",
		fontSize: 24,
		width: 200,
		top: 30,
	},
	myGuessTxt: {
		color: "#1D3557",
		fontSize: 20,
		marginTop: 90,
	},
	btn: {
		marginTop: 20,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: 45,
		width: 150,
		borderRadius: 25,
		marginHorizontal: 5,
	},
	navBar: {
		backgroundColor: "white",
		display: "flex",
		alignSelf: "stretch",
		flexDirection: "row",
		/* box shadow */
		shadowColor: "#adb5bd",
		shadowOffset: { width: 0, height: 0.2 },
		shadowOpacity: 0.8,
		shadowRadius: 5,
		elevation: 5,

		marginBottom: 10,
		height: 100,
		alignItems: "center",
	},
});

function mapStateToProps(state) {
	return {
		data: state,
	};
}

export default connect(mapStateToProps)(TakeQuiz);
