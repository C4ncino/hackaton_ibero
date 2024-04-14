import PageTemplate from "@assets/page/PageTemplate"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
          const data = await post(`create_diary/${context.user?.Id}`, context.token, JSON.stringify({ "title": 'Diario base', "description": "Diario con preguntas base del dia."}))
          console.log(data.diary);
          if (diaries){
               setDiaries([data.diary, ... diaries])
          }
          else {
               setDiaries([data.diary])
          }
     }


     return (
          <PageTemplate>
               <h1 className="mx-auto text-4xl text-center font-semibold px-20 text-white mt-5">Todos tus Diarios</h1>

               <section className="flex flex-row flex-wrap justify-center mt-5 gap-10">
                    <button onClick={creatDiary}>Crear diario</button>

                    {diaries?.map((diary) => (
                         <Link to={`/diary/${diary.Id}`} key={diary.Id} className="h-96 w-72 rounded-lg p-5 bg-darkLavanda/50 flex flex-col backdrop-hue-rotate-15 backdrop-blur-sm">
                              <h2 className="text-center text-xl font-semibold">{diary.Title}</h2>
                              <div className="mx-auto bg-columbia w-1/3 h-1 my-2" />
                              <p className="grow text-center p-2 text-platinum text-lg font-thin">{diary.Description}</p>
                              <p className="inline-flex gap-2 items-center text-platinum font-thin">
                                   <FontAwesomeIcon icon={faCalendarAlt} className="h-5 text-platinum" />
                                   {diary.Timestamp}
                              </p>
                         </Link>
                    ))}
               </section>
          </PageTemplate>
     )
}

export default Diaries