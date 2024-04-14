import PageTemplate from "@assets/page/PageTemplate";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OneDiary = () => {
    const params = useParams()
    const { get, post } = useAPI();
    const context = useSessionContext()
    const navigate = useNavigate()

    const [diary, setDiary] = useState<null | Diary>(null);
    const [answers, setAnswers] = useState<null | Answer[]>(null);
    const [questions, setQuestions] = useState<null | Question[]>(null);
    const [currentAnswer, setCurrentAnswer] = useState("");

    const getData = async () => {
        if (context.user == null) {
            navigate('/login')
        }

        const data = await get(`${context.user?.Id}/diaries/${params.id}`, context.token)

        console.log(data)

        // if (data == false) {
        //     navigate('/diary')
        // }

        setDiary(data['diary'])
        setAnswers(data['answers'])
        setQuestions(data['questions'])
    }

    useEffect(() => {
        getData();
    },[])


    // Manejador de cambio en el textarea
    const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentAnswer(event.target.value); // Actualiza el estado currentAnswer con el contenido del textarea
    }


    // Endpoint (answer): "answer/<int:diary_id>/<int:question_id>" 
    const sendAnswer = async () => {
        post(`answer/${params.id}/1`, context.token, JSON.stringify({ "answer": currentAnswer}))
    }

    console.log(currentAnswer);
    

    return (
        <PageTemplate>
            {diary && (
                <h1>Holaaa!</h1>
            )}
            
            <form className="m-16">
                <textarea id="message" value={currentAnswer} onChange={handleAnswerChange} className="p-4 w-full font-thin text-white rounded-lg border bg-darkLavanda/50 backdrop-hue-rotate-15 backdrop-blur-sm placeholder:text-platinum resize-none max-h-44 min-h-[3.75rem] form-sizing" placeholder="Write your thoughts here..." >
                </textarea>
            </form>
            <button onClick={sendAnswer}>Enviar datos</button>
        </PageTemplate>
    );
}

export default OneDiary;