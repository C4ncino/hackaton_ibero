import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
    return (
        <footer className="text-gray-600 body-font w-full px-32 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <p className="text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-lavanda sm:py-2 sm:mt-0 mt-4">
                © Diary 2024  — Todos los derechos reservados.
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start gap-3">
                <a className="text-darkLavanda" href="https://www.instagram.com/consejo_mes/">
                    <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
                </a>
                <a className="text-darkLavanda" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
                </a>
                <a className="text-darkLavanda" href="https://github.com/C4ncino/hackaton_ibero">
                    <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
                </a>
            </span>
        </footer >
    )
}

export default Footer;