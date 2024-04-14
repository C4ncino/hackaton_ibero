import DiaryNotes from "@assets/components/DiaryNotes";
import PageTemplate from "@assets/page/PageTemplate";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ReadDiary = () => {
    const params = useParams()
    const context = useSessionContext()
    const { get } = useAPI();

    const [diary, setDiary] = useState<null | Diary>(null);
    const [answers, setAnswers] = useState<null | Answer[]>(null);
    const [questions, setQuestions] = useState<null | Question[]>(null);

    const [user, setUser] = useState<null | user>(null);


    const getData = async () => {
        const data = await get(`${params.idUser}/diaries/${params.idDiary}`, context.token)
        console.log(data);


        setDiary(data['diary'])
        setAnswers(data['registers'].reverse())
        setQuestions(data['questions'])

        const user_data = await get(`me/${params.idUser}`, context.token)

        setUser(user_data['user'])
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <PageTemplate>
            <hgroup className="text-center mx-auto">
                <div className="flex flex-row items-baseline justify-center">
                    <Link to={`/patients/${params.idUser}`} className="pe-10">
                        <FontAwesomeIcon icon={faArrowLeft} className="h-7 text-platinum" />
                    </Link>
                    <h1 className="text-4xl text-center font-semibold text-white mt-5"> Diario </h1>
                </div>
                {user && <h2 className="text-xl text-center font-thin text-white my-3">De: {user?.Name} {user?.LastName}</h2>}
                {diary && <h2 className="text-xl text-center font-thin text-white my-3">Fecha: {diary.Timestamp}</h2>}
            </hgroup>

            {questions && answers && (
                <DiaryNotes questions={questions} answers={answers} />
            )}
        </PageTemplate>
    );
}

export default ReadDiary;