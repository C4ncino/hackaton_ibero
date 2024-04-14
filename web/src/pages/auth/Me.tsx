import PageTemplate from "@assets/PageTemplate";

const Me = () => {
     return (
          <PageTemplate>
               <div>
                    <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-5">
                         <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contact details</h2>
                         <address className="relative bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 rounded-lg border border-gray-200 not-italic grid grid-cols-2">
                              <div className="space-y-2 text-gray-500 dark:text-gray-400 leading-loose hidden sm:block">
                                   Name <br />
                                   Email <br />
                                   Phone Number
                              </div>
                              <div id="contact-details" className="space-y-2 text-gray-900 dark:text-white font-medium leading-loose">
                                   Bonnie Green <br />
                                   name@flowbite.com <br />
                                   + 12 345 67890
                              </div>
                              <button data-copy-to-clipboard-target="contact-details" data-copy-to-clipboard-content-type="textContent" data-tooltip-target="tooltip-contact-details" className="absolute end-2 top-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center">
                                   <span id="default-icon-contact-details">
                                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                             <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                                        </svg>
                                   </span>
                                   <span id="success-icon-contact-details" className="hidden inline-flex items-center">
                                        <svg className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                             <path stroke="currentColor" strokeLinejoin="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                        </svg>
                                   </span>
                              </button>
                              <div id="tooltip-contact-details" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                   <span id="default-tooltip-message-contact-details">Copy to clipboard</span>
                                   <span id="success-tooltip-message-contact-details" className="hidden">Copied!</span>
                                   <div className="tooltip-arrow" data-popper-arrow></div>
                              </div>
                         </address>
                    </div>
               </div>

          </PageTemplate>
     )
}

export default Me