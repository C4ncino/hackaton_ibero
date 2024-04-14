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
    },[])

    
    const sendAnswer = async () => {
        const  data = await post(`answer/${params.id}`, context.token, JSON.stringify({ "answer": currentAnswer}))
        if (data == false){
            console.log("Error al registrar! :(");
        }
        else{
            setCurrentAnswer("")
            console.log("Registrado");
            getData();
        }
    }

    

    return (
        <PageTemplate>
            {diary && (
                <h1 className="mt-7 mb-2 text-center text-darkLavanda text-3xl font-bold">{diary.Title}</h1>
            )}

            {
                questions && questions.length > 0 ? (
                    questions.map((ques) => (
                        <h2 className="ml-24 font-semibold text-platinum text-lg">{ques.QuestionText}</h2>
                    ))

                ) : (
                    <h2 className="ml-24 font-semibold text-platinum text-lg">Anota lo que sentiste en el dia: </h2>
                )
            }
            
            <div className="max-h-[50vh] flex flex-col overflow-y-scroll m-6 mx-48" >
                <ol className="relative border-s border-gray-200 dark:border-gray-700 mx-10"> 
                    {
                        answers?.map((answer, index) => {
                            return (
                                <li className="mb-10 ms-4">
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time className="mb-1 leading-none text-darkLavanda font-bold">{answer.Timestamp}</time>
                                    <p className="text-lg font-semibold text-white">{answer.Answer}</p>
                                </li>
                            )
                        })
                    }
                </ol>

            </div>

            <form className="flex flex-row items-center mx-16 max-w-[90vw] rounded-lg bg-darkLavanda/50 backdrop-hue-rotate-15 backdrop-blur-sm ml-24 ">
                <textarea id="message" value={currentAnswer} onChange={(e)=>{setCurrentAnswer(e.target.value)}} 
                className="p-5 w-full font-thin text-white bg-transparent placeholder:text-platinum resize-none max-h-44 min-h-[4rem] -mr-[10%]" placeholder="Escribir nota...">
                </textarea>
                <button type="button" className="inline-flex items-center bg-hoverDarkLavanda/50 border-0 py-1 px-3 focus:outline-none focus:bg-lavanda hover:bg-lavanda rounded mt-4 md:mt-0 mr-4 text-white h-12 self-center" onClick={sendAnswer}>Registrar nota</button>
            </form>
        </PageTemplate>
    );
}

export default OneDiary;