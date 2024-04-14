import AddDiaryButton from "@assets/components/AddDiaryButton";
import DiaryCard from "@assets/components/DiaryCard";
import PageTemplate from "@assets/page/PageTemplate"
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Diaries = () => {
     const context = useSessionContext()
     const { get, post } = useAPI();
     const navigate = useNavigate()

     const [diaries, setDiaries] = useState<null | Diary[]>(null);

     const getData = async () => {
          if (context.user == null) {
               navigate('/login')
          }
          else {
               const data = await get(`${context.user?.Id}/diaries`, context.token)

               if (data == false) {
                    navigate('/login')
               }
               setDiaries(data['diaries'].reverse())
          }
     }

     useEffect(() => {
          getData();
     }, []);


     const creatDiary = async () => {
          const data = await post(`create_diary/${context.user?.Id}`, context.token, JSON.stringify({ "title": 'Mi Diario', "description": "Diario predefinido con preguntas base." }))
          console.log(data.diary);
          if (diaries) {
               setDiaries([data.diary, ...diaries])
          }
          else {
               setDiaries([data.diary])
          }
     }


     return (
          <PageTemplate>
               <h1 className="mx-auto text-4xl text-center font-semibold px-20 text-white mt-5">Todos tus Diarios</h1>

               <section className="flex flex-row flex-wrap justify-center mt-5 gap-10">
                    {diaries?.map((diary) => (
                         <DiaryCard key={diary.Id} diary={diary} to_url={`/diary/${diary.Id}`} />
                    ))}

                    <AddDiaryButton onClick={creatDiary} />

               </section>
          </PageTemplate>
     )
}

export default Diaries