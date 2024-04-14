import PageTemplate from "@assets/page/PageTemplate";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

const CreateDiary = () => {
    const context = useSessionContext()
    const params = useParams()
    const navigate = useNavigate()
    const { post, get } = useAPI();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [diary_questions, setDiaryQuestions] = useState<string[]>([]);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    const getData = async () => {
        const questions = await get(`${context.user?.Id}/questions`, context.token)

        if (questions == false) {
            return
        }

        setQuestions(questions['questions'])
    }

    useEffect(() => {
        getData()
    }, [])

    const addQuestion = (e) => {
        const q_id = e.target.value

        if (e.target.checked) {
            setDiaryQuestions([...diary_questions, q_id])
        }
        else {
            setDiaryQuestions(diary_questions.filter(id => id !== q_id))
        }
    }

    const createDiary = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const diary = await post(`create_diary/${params.idUser}`, context.token, JSON.stringify({
            title: title,
            description: description
        }))

        const diaryId = diary['diary']['Id']

        for (let i = 0; i < diary_questions.length; i++) {
            await post(`add_question/${diaryId}`, context.token, JSON.stringify({
                idQuestion: diary_questions[i]
            }))
        }

        navigate(`/patients/${params.idUser}`)
    }



    return (
        <PageTemplate>
            <div className="flex flex-row items-baseline justify-center">
                <Link to={`/patients/${params.idUser}`} className="pe-10">
                    <FontAwesomeIcon icon={faArrowLeft} className="h-7 text-platinum" />
                </Link>
                <h1 className="text-4xl text-center font-semibold text-white mt-5">Create a new diary</h1>
            </div>

            <form onSubmit={createDiary} className="flex flex-col p-5 px-20 justify-center items-center gap-6">
                <fieldset className="w-1/2 flex flex-col">
                    <label className="text-white text-lg font-light pb-3">Title</label>
                    <input className="border-2 rounded p-2 focus:outline-darkLavada bg-platinum/50 backdrop-hue-rotate-15 backdrop-blur-sm text-white placeholder:text-darkLavanda/60"
                        placeholder="Enter a title"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </fieldset>

                <fieldset className="w-1/2 flex flex-col">
                    <label className="text-white text-lg font-light pb-3">Description</label>
                    <textarea className="h-40 border-2 rounded p-2 focus:outline-darkLavada bg-white/50 backdrop-hue-rotate-15 backdrop-blur-sm text-white placeholder:text-darkLavanda/60"
                        placeholder="Enter a description"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                    >
                        {description}
                    </textarea>
                </fieldset>

                <fieldset className="w-1/2 flex flex-col">
                    <legend className="text-white text-lg font-light pb-3">Questions</legend>
                    <div className="max-h-32 overflow-y-auto">
                        {questions.map((question) => (
                            <div key={question.Id} className="flex flex-row gap-5 items-center justify-between">
                                <label htmlFor={`question_${question.Id}`} className="text-lg grow">
                                    {question.QuestionText}
                                </label>

                                <input type="checkbox" className=""
                                    id={`question_${question.Id}`}
                                    name={`question_${question.Id}`}
                                    value={question.Id}
                                    onClick={addQuestion}
                                />
                            </div>
                        ))}
                    </div>
                </fieldset>

                <button className="w-1/6 bg-green-500 hover:bg-green-700 rounded p-2 text-white font-light">Create</button>

            </form>
        </PageTemplate>
    );
}

export default CreateDiary;