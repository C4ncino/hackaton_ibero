import PageTemplate from "@assets/PageTemplate";
import { useSessionContext } from "hooks/useSessionContext";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
     const session = useSessionContext()

     const [firstName, setFirstName] = useState("")
     const [lastName, setLastName] = useState("")
     const [password, setPassword] = useState("")
     const [email, setEmail] = useState("")
     const [contactEmail, setContactEmail] = useState("")
     const [birthDate, setBirthDate] = useState("")
     const [correctedBirthDate, setCorrectedBirthDate] = useState("")
     const [experienceYears, setExperienceYears] = useState(NaN)
     const [type, setType] = useState<boolean>(false)
     const [loginCorrect, setLogin] = useState(true)
     const goHome = useNavigate()


     const handleChange = (e:any) => {
          const inputDate = e.target.value; // Obtener la fecha en formato 'YYYY-MM-DD'
          setBirthDate(inputDate)
          setCorrectedBirthDate(formatDateString(inputDate)) // Establecer la fecha formateada en el estado
     };

     const formatDateString = (dateString: string) => {
          // Convertir la cadena de fecha 'YYYY-MM-DD' al formato deseado 'DD-MM-YYYY'
          const [year, month, day] = dateString.split('-');
          return `${day}-${month}-${year}`;
     };

     const OnSubmit = async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault()

          const res = await session.signup(firstName, lastName, experienceYears, correctedBirthDate, email, password, type, contactEmail);
          console.log(res)
          if (res === true) {
               goHome('/')
          }
          else {

               setLogin(false)
          }
     }

     return (
          <PageTemplate>
               <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg md:mt-10 sm:max-w-md xl:p-0 dark:bg-columbia/40 backdrop-hue-rotate-15 backdrop-blur-sm">
                         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                              <h1 className="text-xl font-bold leading-tight tracking-tight text-darkLavanda md:text-2xl">
                                   Registrar cuenta
                              </h1>
                              <form className="space-y-4 md:space-y-6" onSubmit={OnSubmit}>
                                   <div className="grid grid-cols-2 gap-4">
                                        <div>
                                             <label className="block mb-2  font-medium text-gray-900 dark:text-white">Nombre</label>
                                             <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="nombre" id="nombre" className="bg-gray-50 text-gray-800/90 font-medium sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre" />
                                        </div>
                                        <div>
                                             <label className="block mb-2 font-medium text-gray-900 dark:text-white">Apellidos</label>
                                             <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} name="apellidos" id="apellidos" className="bg-gray-50  text-gray-800/90 font-medium sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Apellidos" />
                                        </div>
                                   </div>

                                   <div className="grid grid-cols-2 gap-4">
                                        <div>
                                             <label className="block mb-2 font-medium text-gray-900 dark:text-white">Fecha de nacimiento</label>
                                             <input type="date" value={birthDate} onChange={handleChange} name="fecha_nacimiento" id="fecha_nacimiento" className="bg-gray-50 text-gray-800/90 font-medium sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                        <div>
                                             <label className="block mb-2 font-medium text-gray-900 dark:text-white">Correo</label>
                                             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="correo" id="correo" className="bg-gray-50 text-gray-800/90 font-medium sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ejemplo@compañia.com" />
                                        </div>
                                   </div>

                                   <div className="flex items-center">
                                        <input id="link-checkbox" type="checkbox" onChange={(e) => setType(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium text-white">¿Eres doctor?</label>
                                   </div>

                                   {type && (
                                        <div className="grid grid-cols-2 gap-4">
                                             <div>
                                                  <label className="block mb-2 font-medium text-gray-900 dark:text-white">Años de experiencia</label>
                                                  <input type="number" value={experienceYears} onChange={(e) => setExperienceYears(parseInt(e.target.value))} min='0' placeholder="Años de experiencia" name="fecha_nacimiento" id="fecha_nacimiento" className="bg-gray-50 text-gray-800/90 font-medium sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                             </div>
                                             <div>
                                                  <label className="block mb-2 font-medium text-gray-900 dark:text-white">Correo Profesional</label>
                                                  <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} name="correo" id="correo" className="bg-gray-50 text-gray-800/90 font-medium sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ejemplo@compañia.com" />
                                             </div>
                                        </div>
                                   )

                                   }

                                   <div>
                                        <label htmlFor="contrasena" className="block mb-2 font-medium text-gray-900 dark:text-white">Contraseña</label>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="contrasena" id="contrasena" placeholder="••••••••••" className="bg-gray-50 text-gray-800/90 font-extrabold sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                   </div>

                                   <div className="flex justify-center items-center">
                                        <button type="submit" className="text-white bg-darkLavanda hover:bg-hoverDarkLavanda flex font-medium rounded-lg text-sm px-5 py-2.5 text-center">Registrar</button>
                                   </div>

                                   <p className="text-sm font-light text-gray-800">
                                        ¿Ya tienes una cuenta? <Link to="/login" className="font-medium text-darkLavanda hover:underline ">Acceder cuenta</Link>
                                   </p>
                              </form>

                         </div>
                    </div>
               </div>
          </PageTemplate>
     );

}

export default Signup;