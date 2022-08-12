import { CategoryParamType, GamesArrType, GamesType, SearchParamType } from "../types/AllQuiz.types"

export const filterbyCategory = (arr : GamesArrType, category: CategoryParamType) => {
    if(!category){
      return arr
    }
    return arr?.filter((item : GamesType) => item.category === parseInt(category))
  }

export const filterbySearch = (arr : GamesArrType, search: SearchParamType) => {
    if(!search){
      return arr
    }
    return arr?.filter((item : GamesType) => item.name.toLowerCase().includes(search.toLowerCase()))
  }