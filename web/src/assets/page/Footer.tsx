import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
    return (
        <footer className="text-gray-600 body-font w-full">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                    © Versus.py 2024  — Todos los derechos reservados.
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    <a className="ml-3 text-[#EEEEEE]">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </span>
            </div>
        </footer>
    )
}

export default Footer;