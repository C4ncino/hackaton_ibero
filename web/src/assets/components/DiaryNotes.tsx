interface Props {
    answers: Answer[]
    questions: Question[]
}

const DiaryNotes = ({ questions, answers }: Props) => {
    return (
        <>
            <section className="mx-auto w-[60%] text-center">
                {questions.length > 0 ? (
                    questions.map((ques) => (
                        <h2 className="font-semibold text-platinum text-lg">{ques.QuestionText}</h2>
                    ))
                ) : (
                    <h2 className="font-semibold text-platinum text-lg">Anota lo que sentiste en el dia: </h2>
                )}
            </section>

            <div className="max-h-[55vh] h-[55vh] flex flex-col overflow-y-scroll m-6 mx-48" >
                <ol className="relative border-s border-gray-200 dark:border-gray-700 mx-10">
                    {answers.map((answer) =>
                        <li key={answer.Id} className="mb-10 ms-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <time className="mb-1 leading-none text-darkLavanda font-bold">{answer.Timestamp}</time>
                            <p className="text-lg font-semibold text-white">{answer.Answer}</p>
                        </li>
                    )}
                </ol>
            </div>
        </>
    );
}

export default DiaryNotes;