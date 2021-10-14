export const type = {
	ADD_DECK: "ADD_DECK",
	DELETE_DECK: "DELETE_DECK",
	ADD_CARD: "ADD_CARD",
	REMOVE_CARD: "REMOVE_CARD",
};

const initialDeckData = {
	cwnsepv0ruadq9zhwttrvg: {
		title: "Programming",
		id: "cwnsepv0ruadq9zhwttrvg",
		cards: [
			{
				question: "Who is the founder of JavaScript?",
				answer: "Brendan Eich",
			},
			{
				question: "Who is CEO of Python",
				answer: "Guido van Rossum",
			},
		],
	},
	pojhjdlxn3fb0cegu7py7q: {
		title: "Health",
		id: "pojhjdlxn3fb0cegu7py7q",
		cards: [
			{
				question: "What is health",
				answer: "State of well-being of individual",
			},
			{
				question: "How are you",
				answer: "Great1",
			},
		],
	},
};

const stateData = (state = initialDeckData, action) => {
	switch (action.type) {
		case type.ADD_DECK:
			state[action.deck.id] = action.deck;
			return Object.assign({}, state);
		case type.DELETE_DECK:
			state[action.deck.id] = action.deck;
			return Object.assign({}, state);
		case type.DELETE_DECK:
			delete state[action.id];
			return Object.assign({}, state);
		case type.ADD_CARD:
			state[action.deck].cards.push(action.card);
			return Object.assign({}, state);
		case type.REMOVE_CARD:
			state[action.deck].cards.splice(action.id, 1);
			return Object.assign({}, state);
		default:
			return state;
	}
};

export default stateData;
