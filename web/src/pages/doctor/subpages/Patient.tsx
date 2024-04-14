import PageTemplate from "@assets/page/PageTemplate";
import { faCalendarAlt, faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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
                            <Link to={`/read/${patient.Id}/${diary.Id}`} key={diary.Id} className="h-96 w-72 rounded-lg p-5 bg-darkLavanda/50 flex flex-col backdrop-hue-rotate-15 backdrop-blur-sm">
                                <h2 className="text-center text-xl font-semibold">{diary.Title}</h2>
                                <div className="mx-auto bg-columbia w-1/3 h-1 my-2" />
                                <p className="grow text-center p-2 text-platinum text-lg font-thin">{diary.Description}</p>
                                <p className="inline-flex gap-2 items-center text-platinum font-thin">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="h-5 text-platinum" />
                                    {diary.Timestamp}
                                </p>
                            </Link>
                        ))}
                        {patient &&
                            <button className="h-96 w-72 rounded-lg p-5 border-4 border-dashed border-green-500 bg-green-500/20 flex flex-col items-center backdrop-hue-rotate-15 backdrop-blur-sm" onClick={() => navigate(`/create_diary/${patient.Id}`)}>
                                <h2 className="text-center text-xl font-semibold">Add a Diary</h2>
                                <div className="mx-auto bg-green-500 w-1/3 h-1 my-2" />
                                <div className="grow flex items-center justify-center">
                                    <FontAwesomeIcon icon={faPlus} className="h-24 text-green-600" />
                                </div>
                            </button>
                        }
                    </section>
                </>
            }
        </PageTemplate >
    );
}

export default Patient;