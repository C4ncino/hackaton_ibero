import PageTemplate from "@assets/page/PageTemplate";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OneDiary = () => {
    const params = useParams()
    const { get } = useAPI();
    const context = useSessionContext()
    const navigate = useNavigate()

    const [diary, setDiary] = useState<null | Diary>(null);
    const [answers, setAnswers] = useState<null | Answer[]>(null);
    const [questions, setQuestions] = useState<null | Question[]>(null);

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
    })

    return (
        <PageTemplate>
            {diary && (
                <h1>Hola</h1>
            )}

            {/* <form className="m-16">
                <textarea id="message" className="p-4 w-full font-thin text-white rounded-lg border bg-darkLavanda/50 backdrop-hue-rotate-15 backdrop-blur-sm placeholder:text-platinum resize-none max-h-44 min-h-[3.75rem] form-sizing"
                    placeholder="Write your thoughts here..." >
                </textarea>
            </form> */}
        </PageTemplate>
    );
}

export default OneDiary;