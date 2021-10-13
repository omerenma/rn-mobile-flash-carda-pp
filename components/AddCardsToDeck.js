import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { type } from "../store";

class AddCardsToDeck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			question: "",
			answer: "",
		};
	}

	render() {
		return (
			<View>
				<View>
					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
						<Ionicons
							name="arrow-back-circle-outline"
							size={35}
							color="rgb(33, 150, 243)"
						/>
					</TouchableOpacity>
					<View>
						<Text>Add Card</Text>
					</View>
				</View>
				<View style={styles.form}>
					<Text>Question</Text>
					<TextInput
						onChangeText={(question) => this.setState({ question })}
						value={this.state.question}
                        style={styles.input}
					/>
					<Text>Answer</Text>
					<TextInput

                    style={styles.input}
						onChangeText={(answer) => this.setState({ answer })}
						value={this.state.answer}
					/>
					<TouchableOpacity
						disabled={
							this.state.answer === "" || this.state.question === ""
								? true
								: false
						}
						onPress={() => {
							if (this.state.answer !== "" && this.state.question !== "") {
								this.props.navigation.goBack();

								this.props.dispatch({
									type: type.ADD_CARD,
									card: {
										question: this.state.question,
										answer: this.state.answer,
									},
									deck: localStorage.id
								});
							}
						}}
					>
						<Text style={styles.submit}>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    form:{
        backgroundColor:'white',
        shadowRadius:3,
        shadowOpacity:0.8,
        justifyContent:'center',
        alignItems:'center',
        marginTop:100,

    },
    input:{
        border:'1px solid rgb(33, 150, 243)',
        width:250,
        height:50
    },
    submit:{
        backgroundColor:'rgb(33, 150, 243)',
        border:'1px solid white',
        marginTop:5,
        padding:10,
        width:100,
        textAlign:'center'
    }
})
const mapStateToProps = (state) => {
	return {
		store: state,
	};
};
export default connect(mapStateToProps)(AddCardsToDeck);
