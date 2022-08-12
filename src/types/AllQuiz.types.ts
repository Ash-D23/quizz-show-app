export type questionsType = {
    name: string,
    options: Array<string>
}

export type GamesData = {
    answers: Array<number>,
    questions: questionsType[]
}

export type GamesType = {
    category: number,
    data: GamesData,
    id: number,
    img: string,
    name: string
}

export type ResultsType = {
    date: string,
    id: number,
    name: string,
    score: number,
    uid: string
}

export type CategoryType = {
    id: number,
    imgurl: string,
    name: string
}

export type CategoryArrType = CategoryType[]

export type ResultsArrType = ResultsType[]

export type GamesArrType = GamesType[] | null | undefined

export type CategoryParamType = string | null

export type SearchParamType = string | null