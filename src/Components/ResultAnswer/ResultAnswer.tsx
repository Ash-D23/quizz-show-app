import { useTheme } from "../../Context"


function ResultAnswer({totalquestions, questionnumber, question, quizoptions, answer, selectedanswer} : {totalquestions : number, questionnumber : number, question : string, quizoptions : Array<string>, answer: number, selectedanswer: number}) : JSX.Element {

    const ThemeValue  = useTheme()
    const Theme = ThemeValue?.Theme
    
    return (
        <div className={`result__answer border--grey padding--medium margin-tb--medium ${ Theme === 'light' ? 'light__content' : ''}`}>   
            <div className="container__flex--spacebetween question__score">
                <p className="text--bold">Question {questionnumber+1}/{totalquestions}</p>
                <p className="text--bold">Score : {selectedanswer === answer ? (1/totalquestions)*100 : 0}</p>
            </div>

            <div className="margin--medium">
                <p>{question}</p>
            </div>

            <div className="container__answer margin--medium">
                {
                    quizoptions?.map((item : string, index : number)=>{
                        let optionstyle = null
                        if(index === selectedanswer){
                            optionstyle = selectedanswer === answer ? "answer--success" : "answer--wrong"
                        }
                        if(index === answer){
                            optionstyle = "answer--success"
                        }
                        return (
                            <div key={index} className={`answer ${optionstyle}`}>
                                <p>{item}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ResultAnswer