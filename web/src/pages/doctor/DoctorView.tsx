import PageTemplate from "@assets/PageTemplate";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const DoctorView = () => {
     const context = useSessionContext()
     const navigate = useNavigate()
     const user: user = context.user
     const [currentIcon, setIcon] = useState(faCopy)
     const [patients, setPatients] = useState<user[]>([])

     const {
          get
     } = useAPI();


     useEffect(() => {
          if (!user) navigate('/')

          const fetchData = async () => {
               try {
                    if (user) {
                         const response = await get(`${user.Id}/patients`, context.token);

                         setPatients(response);
                    }
               } catch (error) {
                    console.error('Error al obtener los datos de los pacientes:', error);
               }
          };

          fetchData();
     }, []);


     const copyMessage = async () => {
          if (user) {
               navigator.clipboard.writeText(`http://localhost:5173/addDoctor/${user.Id}`)
               setIcon(faCheck)
          }

          navigate('/')
     }

     return (
          <PageTemplate>
               <header className="flex flex-row justify-center mt-10 px-20">
                    <span className="w-1/6" />

                    <h1 className="text-4xl text-center font-semibold text-white grow ">Pacientes</h1>

                    <span className="w-1/6">
                         <button onClick={copyMessage} className="text-white bg-darkLavanda hover:bg-hoverDarkLavanda flex items-center font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto gap-2">
                              Copy link

                              <FontAwesomeIcon icon={currentIcon} />
                         </button>
                    </span>
               </header>

               <div className="flex flex-wrap mx-4">
                    {
                         patients.map((patient, index) => (
                              <div key={index} className="p-4 lg:w-1/3 md:w-1/2 w-full">
                                   {patient &&
                                        <div className="h-full flex sm:flex-row flex-col bg-white dark:bg-columbia/40 backdrop-hue-rotate-15 backdrop-blur-sm items-center sm:justify-start justify-center text-center sm:text-left p-3 rounded-xl">
                                             <img alt="team" className="flex-shrink-0 rounded-lg lg:w-48 h-48 md:w-32 object-cover object-center sm:mb-0 mb-4" src="https://thispersondoesnotexist.com/" />
                                             <div className="flex-grow sm:pl-8">
                                                  <h2 className="title-font font-medium text-lg text-gray-900">{patient.Name} {patient.LastName}</h2>
                                                  <p className="mb-4">{patient.Email}</p>
                                                  <Link to={`/patients/${patient.Id}`} className="mb-8 text-white bg-darkLavanda hover:bg-hoverDarkLavanda flex font-medium rounded-lg text-sm px-5 py-2.5 text-center">Revisar diario</Link >
                                             </div>
                                        </div>
                                   }
                              </div>
                         ))

                    }
               </div>
          </PageTemplate >
     )
}

export default DoctorView