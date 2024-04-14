import PageTemplate from "@assets/PageTemplate";
import { useState, useEffect } from "react";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";

const Questions = () => {
    const { get } = useAPI();
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const context = useSessionContext();

    useEffect(() => {
        fetchData();
    }, []);

    

    const fetchData = async () => {
        const questions = await get(`${context.user?.Id}/questions`,context.token);
        console.log(questions);
        setQuestions(questions["questions"])
        
    }

    
    return (
        
        <PageTemplate needBlur>
            <div className="mt-20 mx-auto text-center text-4xl text-white mb-16">
                <h1>Preguntas</h1>
            </div>
           
            <ul className="list-none p-0 max-w-7xl mx-auto">
                {questions && questions.map((q) =>
                <li className="py-4 px-6 border-b border-purple-100 bg-purple-200 hover:bg-purple-50 bg-opacity-70">{q.QuestionText}</li>
                )}
            </ul>
            
        </PageTemplate>
            


    )
}

export default Questions




