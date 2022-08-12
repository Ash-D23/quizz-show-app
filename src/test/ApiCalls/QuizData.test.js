import firebase from '../../firebase';

jest.mock('../../firebase', () => {
    const data = {
        "/Games": [{
            category: 0,
            data: {
                answers: [0,2],
                questions: [{ 
                    name: 'Who Played the lead Role in TV Series Sherlock ?', 
                    options: ["Benedict Cumberbatch","Robert Downey Jr.","Chris Evans"]
                },
                { 
                    name: 'Sherlock has how many siblings ?', 
                    options: ["1","3","2"]
                }]
            },
            id: 0,
            img: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
            name: "Sherlock",
        },
        {
            category: 1,
            data: {
                answers: [0,2],
                questions: [{ 
                    name: 'Who played the Lead Role in SkyFall ?', 
                    options: [
                        "Daniel Craig",
                        "Pierce Brosnan",
                        "Sean Connery"]
                },
                { 
                    name: 'At the end of the movie, Silva pursues M and gamekeeper Kincade to an old chapel. After pushing Kincade away, what does he want M to do?', 
                    options: ["Commit suicide so Silva won't have to kill her himself", "Kill Bond", "Shoot them both"]
                }]
            },
            id: 1,
            img: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
            name: "Skyfall",
        },
        {
            category: 2,
            data: {
                answers: [0,2],
                questions: [{ 
                    name: 'Which team Won the first IPL ?', 
                    options: ["Chennai Super Kings", "Mumbai indians", "Rajasthan Royals"]
                },
                { 
                    name: 'Who has the record of highest Individual Score in an IPL Match ?', 
                    options: ["Brendon McCullum", "Chris Gayle", "Virat Kohli"]
                }]
            },
            id: 2,
            img: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
            name: "IPL",
        },
        {
            category: 3,
            data: {
                answers: [0,2],
                questions: [{ 
                    name: 'Who is the Current President of India ?', 
                    options: ["Narendra Modi",
                    "Ram Nath Kovind",
                    "Amit Shah"]
                },
                { 
                    name: 'When was the first Female Prime minister of India ?', 
                    options: ["Sucheta Kripalani",
                    "Nandini Satpathy",
                    "Indira Gandhi"]
                }]
            },
            id: 3,
            img: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
            name: "Politics",
        }],
        "/results": []
    }

    return {
        db: {
            ref: (query) => {
                return {
                    once: jest.fn().mockReturnValue({
                        val : () => Promise.resolve(data[query])
                        }),
                    push: jest.fn().mockReturnValue({
                        set: (item) => {
                            data[query].push(item)

                            return Promise.resolve("success")
                        }
                      })
                }
            }
        }
    }
  });

describe("Quiz Game", () => {

    test("Get Quiz Data", async () => {
        const snapshot = firebase.db.ref('/Games').once('value');
        const results = await snapshot.val()

        const finalResults = [{
            category: 0,
            data: {
                answers: [0,2],
                questions: [{ 
                    name: 'Who Played the lead Role in TV Series Sherlock ?', 
                    options: ["Benedict Cumberbatch","Robert Downey Jr.","Chris Evans"]
                },
                { 
                    name: 'Sherlock has how many siblings ?', 
                    options: ["1","3","2"]
                }]
            },
            id: 0,
            img: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
            name: "Sherlock",
        },
        {
            category: 1,
            data: {
                answers: [0,2],
                questions: [{ 
                    name: 'Who played the Lead Role in SkyFall ?', 
                    options: [
                        "Daniel Craig",
                        "Pierce Brosnan",
                        "Sean Connery"]
                },
                { 
                    name: 'At the end of the movie, Silva pursues M and gamekeeper Kincade to an old chapel. After pushing Kincade away, what does he want M to do?', 
                    options: ["Commit suicide so Silva won't have to kill her himself", "Kill Bond", "Shoot them both"]
                }]
            },
            id: 1,
            img: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
            name: "Skyfall",
        },
        {
            category: 2,
            data: {
                answers: [0,2],
                questions: [{ 
                    name: 'Which team Won the first IPL ?', 
                    options: ["Chennai Super Kings", "Mumbai indians", "Rajasthan Royals"]
                },
                { 
                    name: 'Who has the record of highest Individual Score in an IPL Match ?', 
                    options: ["Brendon McCullum", "Chris Gayle", "Virat Kohli"]
                }]
            },
            id: 2,
            img: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
            name: "IPL",
        },
        {
            category: 3,
            data: {
                answers: [0,2],
                questions: [{ 
                    name: 'Who is the Current President of India ?', 
                    options: ["Narendra Modi",
                    "Ram Nath Kovind",
                    "Amit Shah"]
                },
                { 
                    name: 'When was the first Female Prime minister of India ?', 
                    options: ["Sucheta Kripalani",
                    "Nandini Satpathy",
                    "Indira Gandhi"]
                }]
            },
            id: 3,
            img: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
            name: "Politics",
        }]
        
        expect(results).toEqual(finalResults)
    });

    test("Add Results", async () => {
        const resultRef = firebase.db.ref(`/results`);

        const item = {
            id:1,
            name:"Sherlock",
            score:50,
            uid:"20CiaZphP8doGzCWCGbonUPmAUA3"
        }

        const results = await resultRef.push().set(item)
        
        expect(results).toEqual("success")
    });

})