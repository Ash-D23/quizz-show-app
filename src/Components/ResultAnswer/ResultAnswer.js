import { useTheme } from "../../Context"


function ResultAnswer({totalquestions, questionnumber, question, quizoptions, answer, selectedanswer}){

    const { Theme } = useTheme()
    
    return (
        <div class={`result__answer border--grey padding--medium margin-tb--medium ${ Theme === 'light' ? 'light__content' : ''}`}>   
            <div class="container__flex--spacebetween question__score">
                <p className="text--bold">Question {questionnumber+1}/{totalquestions}</p>
                <p className="text--bold">Score : {selectedanswer === answer ? (1/totalquestions)*100 : 0}</p>
            </div>

            <div class="margin--medium">
                <p>{question}</p>
            </div>

            <div class="container__answer margin--medium">
                {
                    quizoptions?.map((item, index)=>{
                        let optionstyle = null
                        if(index === selectedanswer){
                            optionstyle = selectedanswer === answer ? "answer--success" : "answer--wrong"
                        }
                        if(index === answer){
                            optionstyle = "answer--success"
                        }
                        return (
                            <div className={`answer ${optionstyle}`}>
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