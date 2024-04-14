import PageTemplate from "@assets/PageTemplate";
import { useState, useEffect, FormEvent } from "react";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

const Questions = () => {
    const { get, post } = useAPI();
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const context = useSessionContext();

    const [newQuestion, setNewQuestion] = useState("");

    useEffect(() => {
        fetchData();
    }, []);



    const fetchData = async () => {
        const questions = await get(`${context.user?.Id}/questions`, context.token);
        console.log(questions);
        setQuestions(questions["questions"])

    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const question = await post(`${context.user?.Id}/questions`, context.token, JSON.stringify({ questionText: newQuestion }));

        if (questions) {
            setQuestions([...questions, question["question"]])
        }
        else {
            setQuestions([question["question"]])
        }

        setNewQuestion("")
    }


    return (

        <PageTemplate needBlur>
            <div className="mt-20 mx-auto text-center text-4xl text-white mb-16">
                <h1>Preguntas</h1>
            </div>

            <ul className="list-none p-0 w-5/6 mx-auto">
                {questions && questions.map((q) =>
                    <li className="py-4 px-6 border-b border-purple-100 bg-purple-200 hover:bg-purple-50 bg-opacity-70">{q.QuestionText}</li>
                )}
            </ul>

            <form onSubmit={onSubmit} className="flex md:flex-row flex-col p-5 px-20 justify-center items-baseline gap-6">
                <label className="text-white text-xl">Añadir pregunta: </label>
                <div className="border-2 rounded p-2 focus:outline-darkLavada bg-platinum/50 backdrop-hue-rotate-15 backdrop-blur-sm text-white placeholder:text-darkLavanda/60 flex flex-row items-center">
                    <input className="rounded p-2 focus:outline-none bg-transparent text-white placeholder:text-darkLavanda/60 w-96"
                        placeholder="Introduce una pregunta"
                        onChange={(e) => setNewQuestion(e.target.value)}
                        value={newQuestion}
                    />
                    <button>
                        <FontAwesomeIcon icon={faPlusSquare} className="h-8 text-darkLavanda" />
                    </button>
                </div>
            </form>
        </PageTemplate>
    )
}

export default Questions




