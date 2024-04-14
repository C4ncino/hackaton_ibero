import PageTemplate from "@assets/PageTemplate";
import { useSessionContext } from "hooks/useSessionContext";

const DoctorView = () => {

     const context = useSessionContext()
     const user: any = context.user

     console.log(user.UserType);
     

     return (
          <PageTemplate>
               <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                         <div className="flex flex-col text-center w-full mb-20">
                              <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">OUR TEAM</h1>
                         </div>
                         <div className="flex flex-wrap -m-4">
                              <div className="p-4 lg:w-1/2">
                                   <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                        <img alt="team" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="https://dummyimage.com/200x200" />
                                        <div className="flex-grow sm:pl-8">
                                             <h2 className="title-font font-medium text-lg text-gray-900">Holden Caulfield</h2>
                                             <h3 className="text-gray-500 mb-3">UI Developer</h3>
                                             <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                                             <span className="inline-flex">
                                                  <a className="text-gray-500">
                                                       <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                       </svg>
                                                  </a>
                                             </span>
                                        </div>
                                   </div>
                                   </div>
                                   <div className="p-4 lg:w-1/2">
                                   <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                        <img alt="team" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="https://dummyimage.com/201x201" />
                                        <div className="flex-grow sm:pl-8">
                                             <h2 className="title-font font-medium text-lg text-gray-900">Alper Kamu</h2>
                                             <h3 className="text-gray-500 mb-3">Designer</h3>
                                             <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                                             <span className="inline-flex">
                                                  <a className="text-gray-500">
                                                       <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                       <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                       </svg>
                                                  </a>
                                             </span>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>
          </PageTemplate>
     )
}

export default DoctorView