import firebase from '../../firebase';

jest.mock('../../firebase', () => {
    return {
        db: {
            ref: (query) => {
                return {
                    once: (val) => {
                        return {
                            val : jest.fn().mockReturnValue("hello")
                        }
                    },
                    push: () => {
                        return {
                            set: jest.fn().mockReturnValue("hello")
                        }
                    }
                }
            }
        }
    }
  });

describe("Quiz Game", () => {

    test("Get Quiz Data", () => {
        const snapshot = firebase.db.ref('/Games').once('value');
        const results = snapshot.val()
        
        expect("hello").toEqual(results)
    });

    test("Add Results", () => {
        const resultRef = firebase.db.ref(`/results/`);

        const item = {
            
        }

        const results = resultRef.push().set(item)
        
        expect("hello").toEqual(results)
    });

})