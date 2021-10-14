import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { setLocalNotification, clearLocalNotification } from "../utils/api";

function Results(props) {
	useEffect(() => {
		clearLocalNotification().then(setLocalNotification);
	}, []);

	const navigation = useNavigation();
	const storeData = props.data;
	const id = localStorage.id;
	const correctAnswer = props.route.params.numberOfCorrectAnswers;
	const wrongAnswers = props.route.params.numberOfWrongtAnswers;

	return (
		<View>
			<Text>Quiz Results</Text>
			<View>
				<Text>Correct ANswer</Text>
			</View>
			<View>
				<Text>{correctAnswer}</Text>
			</View>
			<View>
				<Text>Wrong Answers</Text>
				{wrongAnswers}
			</View>

			<View>
				<View>
					<Text>
						{Math.round(
							(numberOfCorrectAnswers * 100) /
								(numberOfWrongtAnswers + numberOfCorrectAnswers)
						)}{" "}
						%
					</Text>
				</View>
			</View>
            <View>
                <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Quiz', {id:id})
                }}
                >
                <Text>
                    Start Over
                </Text>
                <MaterialCommunityIcons name="restart" size={35} />
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={() => {
                    navigation.navigate('Deck', {id:id})
                }}
                >
                    <MaterialCommunityIcons 
                    name="exit-run"
                    size={35}

                    />

                </TouchableOpacity>
            </View>
		</View>
	);
}

const mapStateToProps = (state) => {
    data:state
}

export default connect(mapStateToProps)(Results)