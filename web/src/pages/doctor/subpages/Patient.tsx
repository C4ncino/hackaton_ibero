import AddDiaryButton from "@assets/components/AddDiaryButton";
import DiaryCard from "@assets/components/DiaryCard";
import PageTemplate from "@assets/page/PageTemplate";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Patient = () => {
    const params = useParams()
    const navigate = useNavigate()
    const context = useSessionContext()

    const [patient, setPatient] = useState<null | user>(null)
    const [diaries, setDiaries] = useState<null | Diary[]>(null);

    const { get } = useAPI()

    const getData = async () => {
        const patient = await get(`me/${params.id}`, context.token)

        console.log(patient)

        setPatient(patient['user'])

        const data = await get(`${params.id}/diaries`, context.token)

        console.log(data)

        setDiaries(data['diaries'].reverse())
    }

    useEffect(() => {
        if (context.user == null) {
            navigate('/login')
        }

        getData()
    }, [])

    return (
        <PageTemplate>
            {patient && diaries &&
                <>
                    <hgroup className="flex flex-col flex-wrap justify-center mt-5 mx-10 text-center">
                        <div className="flex flex-row items-baseline justify-center">
                            <Link to={`/patients`} className="pe-10">
                                <FontAwesomeIcon icon={faArrowLeft} className="h-7 text-platinum" />
                            </Link>
                            <h1 className="text-4xl text-center font-semibold text-white mt-5"> {patient.Name} {patient.LastName} </h1>
                        </div>
                        <h2 className="mt-3">{patient.Email}</h2>
                        <p>{patient.BirthDate}</p>
                    </hgroup>

                    <section className="flex flex-row flex-wrap justify-center mt-5 gap-10">
                        {diaries?.map((diary) => (
                            <DiaryCard key={diary.Id} diary={diary} to_url={`/read/${patient.Id}/${diary.Id}`} />
                        ))}

                        {patient &&
                            <AddDiaryButton onClick={() => navigate(`/create_diary/${patient.Id}`)} />
                        }
                    </section>
                </>
            }
        </PageTemplate >
    );
}

export default Patient;