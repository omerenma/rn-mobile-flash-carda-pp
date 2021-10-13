import React, { useRef, useEffect , useState} from "react";
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
    const { data} = props
    const navigation = props.navigation
    const params = localStorage.id
    const cardData = data[params].cards

    // State management
    const [ position, setPosition] = useState(0)
    const [displayAnswer, setAnswer] = useState(false)
    const [rightAnswer, serRightAnswer] = useState(0)
    const [wrogAnswer, setWrongAnswer] = useState(0)
    const [finishedQuize, setFinishedQuize] =useState(false)

    useEffect(() => {
        if(finishedQuize === true){
            finish()
        }
    }, [finishedQuize])

     
    const finish = ()  => {
        setFinishedQuize(false)
        serRightAnswer(0)
        setWrongAnswer(0)
        setPosition(0)
        setAnswer(0)
        
        navigation.navigate('Results', {
            id:params,
            wrogAnswer,
            rightAnswer
        })

    }
	return (
		<View>
			<Text>{JSON.stringify(data)}</Text>
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
		backgroundColor: "white",
		borderRadius: 20,
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
