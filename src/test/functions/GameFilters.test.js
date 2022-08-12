import { filterbyCategory, filterbySearch } from "../../Utilities";
import { mockGamesData } from '../mockData/mockData'


describe("testing Quiz Game Filter", () => {
    
    test("Category Filter", () => {
        
        const arr = mockGamesData

        const category = "0"

        const finalResult = [{
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
        }]

        let result = filterbyCategory(arr, category)

        expect(result).toEqual(finalResult)
    });

    test("Search Filter", () => {
        
        const arr = mockGamesData

        const search = "skyfall"

        const finalResult = [{
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
        }]

        let result = filterbySearch(arr, search)

        expect(result).toEqual(finalResult)
    });

})