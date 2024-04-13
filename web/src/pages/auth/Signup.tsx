import PageTemplate from "@assets/PageTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useSessionContext } from "hooks/useSessionContext";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [doctor, setDoctor] = useState<boolean>()
    const [loginCorrect, setLogin] = useState(true)

    const context = useSessionContext()
    const goHome = useNavigate()

    const OnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

     //    const res = await context.login(username, password);

     //    console.log(res)
     //    if (res == true){
     //        goHome('/learn')
     //    }
     //    else{
     //        setLogin(false)
     //    }
    }

    return (
        <PageTemplate>

          <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
               <div className="w-full bg-white rounded-lg md:mt-10 sm:max-w-md xl:p-0 dark:bg-columbia/40 backdrop-hue-rotate-15 backdrop-blur-sm">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                         <h1 className="text-xl font-bold leading-tight tracking-tight text-darkLavanda md:text-2xl">
                              Registrar cuenta
                         </h1>
                         <form className="space-y-4 md:space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                   <div>
                                        <label className="block mb-2  font-medium text-gray-900 dark:text-white">Nombre</label>
                                        <input type="text" name="nombre" id="nombre" className="bg-gray-50 text-gray-800/90 font-medium sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre" />
                                   </div>
                                   <div>
                                        <label className="block mb-2 font-medium text-gray-900 dark:text-white">Apellidos</label>
                                        <input type="text" name="apellidos" id="apellidos" className="bg-gray-50  text-gray-800/90 font-medium sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Apellidos" />
                                   </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                   <div>
                                        <label className="block mb-2 font-medium text-gray-900 dark:text-white">Fecha de nacimiento</label>
                                        <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" className="bg-gray-50 text-gray-800/90 font-medium sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                   </div>
                                   <div>
                                        <label className="block mb-2 font-medium text-gray-900 dark:text-white">Correo</label>
                                        <input type="email" name="correo" id="correo" className="bg-gray-50 text-gray-800/90 font-medium sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ejemplo@compañia.com" />
                                   </div>
                              </div>

                              <div className="flex items-center">
                                   <input id="link-checkbox" type="checkbox" onChange={(e)=>setDoctor(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                   <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium text-white">¿Eres doctor?</label>
                              </div>

                              {doctor && (
                                   <div className="grid grid-cols-2 gap-4">
                                        <div>
                                             <label className="block mb-2 font-medium text-gray-900 dark:text-white">Años de experiencia</label>
                                             <input type="number" min='0' placeholder="Años de experiencia" name="fecha_nacimiento" id="fecha_nacimiento" className="bg-gray-50 text-gray-800/90 font-medium sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                        <div>
                                             <label className="block mb-2 font-medium text-gray-900 dark:text-white">Correo Profesional</label>
                                             <input type="email" name="correo" id="correo" className="bg-gray-50 text-gray-800/90 font-medium sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ejemplo@compañia.com" />
                                        </div>
                                   </div>
                              )

                              }

                              <div>
                                   <label htmlFor="contrasena" className="block mb-2 font-medium text-gray-900 dark:text-white">Contraseña</label>
                                   <input type="password" name="contrasena" id="contrasena" placeholder="••••••••••" className="bg-gray-50 text-gray-800/90 font-extrabold sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                              </div>

                              <div className="flex justify-center items-center">
                                   <Link to='/' className="text-white bg-darkLavanda hover:bg-hoverDarkLavanda flex font-medium rounded-lg text-sm px-5 py-2.5 text-center">Registrar</Link>
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