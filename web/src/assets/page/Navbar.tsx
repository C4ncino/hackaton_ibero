import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { useSessionContext } from "hooks/useSessionContext";
import { useState } from "react";

const NavBar = () => {
     const [reRender, serReRender] = useState(false)
     const context = useSessionContext()

     const logOut = () => {
          context.user = null;
          context.token = '';
          serReRender(!reRender)
     }

     return (
          <header className="text-gray-600 body-font h-24 container px-20 p flex flex-wrap pt-5 flex-col md:flex-row items-center">
               <Link to='/' className="flex items-center mb-4 md:mb-0">
                    <i className="bg-indigo-800 rounded-full">
                         <FontAwesomeIcon icon={faLayerGroup} className="p-2 text-3xl text-white" />
                    </i>
                    <h2 className="ml-3 text-3xl text-[#f6c90e]">Versus.py</h2>
               </Link>

               <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center text-[#EEEEEE]">
                    <Link to="/" className="mr-5 hover:text-gray-500 text-2xl">Home</Link>
                    <Link to={context.user === null ? "/login" : "/learn"} className="mr-5 hover:text-gray-500 text-2xl">Learn</Link>
                    <Link to={context.user === null ? "/login" : "/play"} className="mr-5 hover:text-gray-500 text-2xl">Play</Link>
               </nav>

               {context.user === null ? (
                    <>
                         <Link to="/login" className="text-white bg-[#76ABAE] border-0 py-1 px-5 focus:outline-none hover:bg-[#35575A] rounded mt-4 md:mt-0 mr-2 text-xl"> Log in </Link>

                         <Link to="/signup" className="bg-[#EEEEEE] border-0 py-1 px-3 focus:outline-none hover:bg-[#7A7A7A] hover:text-[#EEEEEE] rounded mt-4 md:mt-0 text-xl">
                              <span className="inline-flex items-center gap-2">
                                   <p>Sign up</p>
                                   <FontAwesomeIcon icon={faArrowRight} />
                              </span>
                         </Link>
                    </>
               ) : (
                    <>
                         <Link to="/me" className="bg-[#EEEEEE] border-0 py-1 px-5 focus:outline-none hover:bg-[#7A7A7A] hover:text-[#EEEEEE] rounded-full mt-4 md:mt-0 mr-2 text-xl"> Me </Link>
                         <Link to="/" onClick={logOut} className="text-white bg-[#76ABAE] border-0 py-1 px-5 focus:outline-none hover:bg-[#35575A] rounded mt-4 md:mt-0 mr-2 text-xl">Log Out</Link>
                    </>
               )}

          </header>

     );
}

export default NavBar;
