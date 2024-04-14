import PageTemplate from "@assets/PageTemplate";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";


const AddDoctor = () => {
     const [doctorData, setDoctorData] = useState<any>()

     const params = useParams()
     const navigate = useNavigate()
     
     const { post } = useAPI();

     const context = useSessionContext()
     const user: any = context.user

     const { get }  = useAPI();

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const response = await get(`me/${params.idDoctor}`, context.token);
                    console.log(response["user"]);
                    
                    setDoctorData(response["user"]); 
                    // console.log(newData);
               } 
               catch (error) {
                    console.error('Error al obtener los datos:', error);
               }
          };
          
          if (context.token === '' ) {
               navigate(`/login/${params.idDoctor}`);
          }

          fetchData();
     }, []); 

     const accept = async () => {
          post('add_doctor', context.token, JSON.stringify({"userId": user.Id, "doctorId": params.idDoctor}))
          navigate('/')
     }


     return (
          <PageTemplate>
               {doctorData && (<section className="text-gray-600 body-font">
                    <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                    <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
                         <div className="text-center lg:w-2/3 w-full">
                              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{doctorData.Name} {user.LastName}</h1>
                              <p>Contacto: {doctorData.ContactEmail}</p>
                              <p>Años de experiencia: {doctorData.ExperienceYears}</p>
                              <div className="flex justify-center">
                                   <button onClick={accept} className="inline-flex text-white bg-darkLavanda border-0 py-2 px-6 focus:outline-none hover:bg-hoverDarkLavanda rounded text-lg">Aceptar invitación</button>
                              </div>
                         </div>
                    </div>
               </section>)}
          </PageTemplate>
     )
}

export default AddDoctor