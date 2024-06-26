import PageTemplate from "@assets/PageTemplate";
import { useSessionContext } from "hooks/useSessionContext";
import { FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Login = () => {
     const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")

     const params = useParams()
     // console.log(params.invite);

     const context = useSessionContext()
     const navigate = useNavigate()

     const OnSubmit = async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault()

          const res = await context.login(email, password);

          if (res == true && params.invite == undefined) {
               navigate('/')
          }
          else {
               navigate(`/addDoctor/${params.invite}`)
          }
     }

     return (
          <PageTemplate>
               <div className="flex flex-col items-center justify-center px-6 mx-auto my-10 lg:py-0">
                    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-columbia/40 backdrop-hue-rotate-15 backdrop-blur-sm">
                         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                              <h1 className="text-xl font-bold leading-tight tracking-tight text-darkLavanda md:text-2xl">
                                   Acceder cuenta
                              </h1>
                              <form className="space-y-4 md:space-y-6" onSubmit={OnSubmit}>
                                   <div>
                                        <label htmlFor="email" className="block mb-2 font-medium text-white">Correo</label>
                                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 text-gray-800/90 font-medium sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ejemplo@compañia.com" />
                                   </div>

                                   <div>
                                        <label htmlFor="password" className="block mb-2 font-medium text-gray-900 dark:text-white">Contraseña</label>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••••" className="bg-gray-50 text-gray-800/90 font-bold sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-platinum/70 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                   </div>

                                   <div className="flex items-center justify-between">
                                        <Link to='/' className="text-sm font-medium text-primary-600 hover:underline text-darkLavanda">¿Has olvidado tu contraseña?</Link>
                                   </div>

                                   <div className="flex justify-center items-center">
                                        <button type="submit"
                                             className="text-white bg-darkLavanda hover:bg-hoverDarkLavanda flex font-medium rounded-lg text-sm px-5 py-2.5 text-center">Acceder</button>
                                   </div>
                                   <p className="text-sm font-light text-gray-800">
                                        ¿No tienes una cuenta? <Link to='/signup' className="font-medium text-darkLavanda hover:underline">Registrar</Link>
                                   </p>
                              </form>
                         </div>
                    </div>
               </div>

          </PageTemplate>
     );

}

export default Login;