type Diary = {
    Id: number,
    UserId: number,
    Title: string,
    Description: string,
    Timestamp: string
}

type DiaryQuestion = {
    Id: number,
    IdDiary: number,
    IdQuestion: number
}