import DiaryNotes from "@assets/components/DiaryNotes";
import PageTemplate from "@assets/page/PageTemplate";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const OneDiary = () => {
    const params = useParams()
    const { get, post } = useAPI();
    const context = useSessionContext()
    const navigate = useNavigate()

    const [diary, setDiary] = useState<null | Diary>(null);
    //Recupera
    const [answers, setAnswers] = useState<null | Answer[]>(null);
    const [questions, setQuestions] = useState<null | Question[]>(null);

    //Agrega
    const [currentAnswer, setCurrentAnswer] = useState("");

    const getData = async () => {
        if (context.user == null) {
            navigate('/login')
        }

        const data = await get(`${context.user?.Id}/diaries/${params.id}`, context.token)

        console.log(data)

        setDiary(data['diary'])
        setAnswers(data['registers'].reverse())

        setQuestions(data['questions'])
    }

    useEffect(() => {
        getData();
    }, [])


    const sendAnswer = async () => {
        const data = await post(`answer/${params.id}`, context.token, JSON.stringify({ "answer": currentAnswer }))
        if (data == false) {
            console.log("Error al registrar! :(");
        }
        else {
            setCurrentAnswer("")
            console.log("Registrado");
            getData();
        }
    }



    return (
        <PageTemplate>
            {diary && (

                <hgroup className="flex flex-row items-baseline justify-center">
                    <Link to={`/diary`} className="pe-10">
                        <FontAwesomeIcon icon={faArrowLeft} className="h-7 text-platinum" />
                    </Link>
                    <h1 className="mt-7 mb-2 text-center text-darkLavanda text-3xl font-bold">{diary.Title}</h1>
                </hgroup>
            )
            }

            {
                questions && answers && (
                    <DiaryNotes questions={questions} answers={answers} />
                )
            }

            <form className="flex flex-row items-center mx-16 max-w-[90vw] rounded-lg bg-darkLavanda/50 backdrop-hue-rotate-15 backdrop-blur-sm ml-24 ">
                <textarea id="message" value={currentAnswer} onChange={(e) => { setCurrentAnswer(e.target.value) }}
                    className="p-5 w-full font-thin text-white bg-transparent placeholder:text-platinum resize-none max-h-44 min-h-[4rem] -mr-[10%]" placeholder="Escribir nota...">
                </textarea>
                <button type="button" className="inline-flex items-center bg-hoverDarkLavanda/50 border-0 py-1 px-3 focus:outline-none focus:bg-lavanda hover:bg-lavanda focus:text-darkLavanda hover:text-darkLavanda rounded mt-4 md:mt-0 mr-4 text-white h-12 self-center" onClick={sendAnswer}>
                    <FontAwesomeIcon icon={faPaperPlane} className="h-6" />
                </button>
            </form>
        </PageTemplate >
    );
}

export default OneDiary;