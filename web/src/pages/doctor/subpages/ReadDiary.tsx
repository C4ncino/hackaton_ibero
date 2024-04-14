import PageTemplate from "@assets/page/PageTemplate";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

        setDiary(data['diary'])
        setAnswers(data['answers'])
        setQuestions(data['questions'])

        const user_data = await get(`me/${params.idUser}`, context.token)

        setUser(user_data['user'])
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <PageTemplate>
            <hgroup>
                <h1>Diario</h1>
                {user && <h2>De: {user?.Name}</h2>}
            </hgroup>
        </PageTemplate>
    );
}

export default ReadDiary;