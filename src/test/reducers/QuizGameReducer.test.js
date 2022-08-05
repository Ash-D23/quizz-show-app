import { QuizGameInitialState, QuizGamereducerfn } from "../../Reducers";

describe("testing Quiz Game reducer", () => {
    test("Initializing the Game", () => {
        
        const action = {
            type: "setQuizData",
            payload: {
                id: 1,
                name: "sherlock",
                data: {
                    questions: [
                        { 
                            name: 'Who Played the lead Role in TV Series Sherlock ?', 
                            options: ["Benedict Cumberbatch","Robert Downey Jr.","Chris Evans"]
                        },
                        { 
                            name: 'Sherlock has how many siblings ?', 
                            options: ["1","3","2"]
                        }
                    ], 
                    answers: [0,2], 
                },
                gameState: "rules"
            }
        }

        const finalState = {
            id: 1,
            name: 'sherlock',
            questions: [
                { 
                    name: 'Who Played the lead Role in TV Series Sherlock ?', 
                    options: ["Benedict Cumberbatch","Robert Downey Jr.","Chris Evans"]
                },
                { 
                    name: 'Sherlock has how many siblings ?', 
                    options: ["1","3","2"]
                }
            ],
            answers: [0,2],
            loading: false,
            currentQuestion: 0,
            currentSelectedOption: 0,
            selectedAnswers: [],
            gameState: 'rules'
          }

        let state = QuizGamereducerfn(QuizGameInitialState, action)

        expect(state).toEqual(finalState)
    });

    test("Start the Game", () => {

        const initialState = {
            id: 1,
            name: 'sherlock',
            questions: [
                { 
                    name: 'Who Played the lead Role in TV Series Sherlock ?', 
                    options: ["Benedict Cumberbatch","Robert Downey Jr.","Chris Evans"]
                },
                { 
                    name: 'Sherlock has how many siblings ?', 
                    options: ["1","3","2"]
                }
            ],
            answers: [0,2],
            loading: false,
            currentQuestion: 0,
            currentSelectedOption: 0,
            selectedAnswers: [],
            gameState: 'rules'
          }
        
        const action = {
            type: "gameState",
            payload: {
                gameState: "game"
            }
        }

        const finalState = {
            id: 1,
            name: 'sherlock',
            questions: [
                { 
                    name: 'Who Played the lead Role in TV Series Sherlock ?', 
                    options: ["Benedict Cumberbatch","Robert Downey Jr.","Chris Evans"]
                },
                { 
                    name: 'Sherlock has how many siblings ?', 
                    options: ["1","3","2"]
                }
            ],
            answers: [0,2],
            loading: false,
            currentQuestion: 0,
            currentSelectedOption: 0,
            selectedAnswers: [],
            gameState: 'game'
          }

        let state = QuizGamereducerfn(initialState, action)

        expect(state).toEqual(finalState)
    });

    test("Answer Question", () => {

    const initialState = {
        id: 1,
        name: 'sherlock',
        questions: [
            { 
                name: 'Who Played the lead Role in TV Series Sherlock ?', 
                options: ["Benedict Cumberbatch","Robert Downey Jr.","Chris Evans"]
            },
            { 
                name: 'Sherlock has how many siblings ?', 
                options: ["1","3","2"]
            }
        ],
        answers: [0,2],
        loading: false,
        currentQuestion: 0,
        currentSelectedOption: 0,
        selectedAnswers: [],
        gameState: 'rules'
        }
    
    const action = {
        type: "selectAnswer",
        payload: 1
    }

    const finalState = {
        id: 1,
        name: 'sherlock',
        questions: [
            { 
                name: 'Who Played the lead Role in TV Series Sherlock ?', 
                options: ["Benedict Cumberbatch","Robert Downey Jr.","Chris Evans"]
            },
            { 
                name: 'Sherlock has how many siblings ?', 
                options: ["1","3","2"]
            }
        ],
        answers: [0,2],
        loading: false,
        currentQuestion: 0,
        currentSelectedOption: 1,
        selectedAnswers: [],
        gameState: 'rules'
        }

    const state = QuizGamereducerfn(initialState, action)

    expect(state).toEqual(finalState)
    });

    test("submit an answer", () => {

    const initialState = {
        id: 1,
        name: 'sherlock',
        questions: [
            { 
                name: 'Who Played the lead Role in TV Series Sherlock ?', 
                options: ["Benedict Cumberbatch","Robert Downey Jr.","Chris Evans"]
            },
            { 
                name: 'Sherlock has how many siblings ?', 
                options: ["1","3","2"]
            }
        ],
        answers: [0,2],
        loading: false,
        currentQuestion: 0,
        currentSelectedOption: 1,
        selectedAnswers: [],
        gameState: 'rules'
        }

    const action = {
        type: "submitAnswer"
    }

    const finalState = {
        id: 1,
        name: 'sherlock',
        questions: [
            { 
                name: 'Who Played the lead Role in TV Series Sherlock ?', 
                options: ["Benedict Cumberbatch","Robert Downey Jr.","Chris Evans"]
            },
            { 
                name: 'Sherlock has how many siblings ?', 
                options: ["1","3","2"]
            }
        ],
        answers: [0,2],
        loading: false,
        currentQuestion: 1,
        currentSelectedOption: null,
        selectedAnswers: [1],
        gameState: 'rules'
        }

    const state = QuizGamereducerfn(initialState, action)

    expect(state).toEqual(finalState)
    })

    test('submitAnswerAndFinish', ()=>{
    const initialState = {
        id: 1,
        name: 'sherlock',
        questions: [
            { 
                name: 'Who Played the lead Role in TV Series Sherlock ?', 
                options: ["Benedict Cumberbatch","Robert Downey Jr.","Chris Evans"]
            },
            { 
                name: 'Sherlock has how many siblings ?', 
                options: ["1","3","2"]
            }
        ],
        answers: [0,2],
        loading: false,
        currentQuestion: 1,
        currentSelectedOption: null,
        selectedAnswers: [1],
        gameState: 'rules'
        }

    const action = {
        type: "submitAnswerAndFinish",
        payload: {
            selectedAnswers: [1,2],
            score: 50
        }
    }

    const finalState = {
        id: 1,
        name: 'sherlock',
        questions: [
            { 
                name: 'Who Played the lead Role in TV Series Sherlock ?', 
                options: ["Benedict Cumberbatch","Robert Downey Jr.","Chris Evans"]
            },
            { 
                name: 'Sherlock has how many siblings ?', 
                options: ["1","3","2"]
            }
        ],
        answers: [0,2],
        loading: false,
        currentQuestion: 1,
        currentSelectedOption: null,
        selectedAnswers: [1,2],
        gameState: 'results',
        score: 50
        }

    const state = QuizGamereducerfn(initialState, action)

    expect(state).toEqual(finalState)
    })
})