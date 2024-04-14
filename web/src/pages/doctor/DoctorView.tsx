import PageTemplate from "@assets/PageTemplate";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { useEffect, useState } from "react";

const DoctorView = () => {
     const context = useSessionContext()
     const user: any = context.user
     const [patients, setPatients] = useState([])
     const [patientsInfo, setPatientsInfo] = useState<any>([])

     const {
          get
     } = useAPI();
     let i = 0;
     console.log(i);
     

     useEffect(() => {
          const fetchData = async () => {
              try {
                  const response = await get(`${user.Id}/patients`, context.token);
                  setPatients(response);
              } catch (error) {
                  console.error('Error al obtener los datos de los pacientes:', error);
              }
          };
      
          fetchData();
      }, [user.Id, context.token]);
      
      useEffect(() => {
          const fetchPatientsInfo = async () => {
              try {
                  const patientsInfo = await Promise.all(patients.map(async (patient) => {
                      const res = await get(`me/${patient.Id}`, context.token);
                      return res.user;
                  }));
                  setPatientsInfo(patientsInfo);
              } catch (error) {
                  console.error('Error al obtener la información de los pacientes:', error);
              }
          };
      
          if (patients.length > 0) {
              fetchPatientsInfo();
          }
      }, [patients, context.token]);

     
     console.log(patientsInfo);
     

     const copyMessage = async() => {
          navigator.clipboard.writeText(`http://localhost:5173/addDoctor/${user.Id}`)
     }
     
     //http://localhost:5173/addDoctor/1


     return (
          <PageTemplate>
               <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                         <div className="flex flex-col text-center w-full mb-7">
                              <h1 className="text-3xl font-bold title-font mb-4 text-white tracking-widest">Pacientes</h1>
                         </div>
                         <button onClick={copyMessage} className="mb-8 text-white bg-darkLavanda hover:bg-hoverDarkLavanda flex font-medium rounded-lg text-sm px-5 py-2.5 text-center">Invite link</button>
                         <div className="flex flex-wrap -m-4">
                              {
                                   patientsInfo.map((patient, index) => (
                                        <div key={index} className="p-4 lg:w-1/3">
                                             <div className="h-full flex sm:flex-row flex-col bg-white dark:bg-columbia/40 backdrop-hue-rotate-15 backdrop-blur-sm items-center sm:justify-start justify-center text-center sm:text-left p-3 rounded-xl">
                                                  <img alt="team" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="https://thispersondoesnotexist.com/" />
                                                  <div className="flex-grow sm:pl-8">
                                                       <h2 className="title-font font-medium text-lg text-gray-900">Nombre: {patient.Name} {patient.LastName}</h2>
                                                       <p className="mb-4">Email: {patient.Email}</p>
                                                       <span className="inline-flex">
                                                            <a className="text-gray-500">
                                                                 <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                                 </svg>
                                                            </a>
                                                       </span>
                                                       <button onClick={copyMessage} className="mb-8 text-white bg-darkLavanda hover:bg-hoverDarkLavanda flex font-medium rounded-lg text-sm px-5 py-2.5 text-center">Revisar diario</button>
                                                  </div>
                                             </div>
                                        </div>
                                   ))
                              }  

                         </div>
                    </div>
               </section>
          </PageTemplate>
     )
}

export default DoctorView