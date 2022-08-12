import { ResultsArrType, ResultsType } from "../types/AllQuiz.types"
import { YearData } from "../types/Last6Months.types"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

export const CalculateLast6Months = (date : Date) => {
    const currentMonth = date.getMonth()

    let i=6, temp = currentMonth

    const labels = []

    while(i>0){
      if(temp<0){
        temp=11
      }

      labels.push(temp)
      temp--
      i--
    }

    return labels.reverse().map((item) => months[item])
  }

const divideData = (currentYear : number, data : ResultsArrType) => {
    const currentYearData = {} as YearData
    const prevYearData = {} as YearData

    data.forEach((element : ResultsType) => {
      let elementDate = new Date(element.date)
      let elementYear = elementDate.getFullYear()
      let elementMonth = elementDate.getMonth()

      if(currentYear === elementYear){
        if(currentYearData[elementMonth]){
          currentYearData[elementMonth] += 1
        }
        else{
          currentYearData[elementMonth] = 1
        }
      }
      
      if(currentYear-1 === elementYear){
        if(prevYearData[elementMonth]){
          prevYearData[elementMonth] += 1
        }else{
          prevYearData[elementMonth] = 1
        }
      }

    });

    return [currentYearData, prevYearData]
}

export const CalculateData = (data : ResultsArrType, date : Date) => {
    const currentYear = date.getFullYear()
    const [currentYearData, prevYearData] = divideData(currentYear, data)

    const results= []
    let i = 6, tempMonth = date.getMonth(), prevYearFlag = false

    while(i>0){
      if(tempMonth === -1){
        prevYearFlag = true
        tempMonth = 11
      }

      if(prevYearFlag){
        prevYearData[tempMonth] ? results.push(prevYearData[tempMonth]) : results.push(0)
      }else{
        currentYearData[tempMonth] ? results.push(currentYearData[tempMonth]) : results.push(0)
      }

      tempMonth--;
      i--;
    }
    
    return results.reverse()
  }