import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { useSessionContext } from 'hooks/useSessionContext';

interface Props {
    needBlur?: boolean
}

const NavBar = ({ needBlur }: Props) => {
    let headerClass = "text-gray-600 w-full px-32 py-5  mx-auto flex flex-wrap flex-col md:flex-row items-center rounded-lg"
    headerClass += needBlur ? " bg-columbia/40 backdrop-hue-rotate-15 backdrop-blur-sm" : ""

    const context = useSessionContext()
    const user: any = context.user || false

    return (
        <header className={headerClass} >
            <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <FontAwesomeIcon icon={faBookBookmark} className="w-6 h-6 text-white p-2 bg-indigo-500 rounded-full" />

                <span className="ml-3 text-xl">Diary</span>
            </Link>

            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                <Link to="/" className="mr-5 hover:text-gray-900">Home</Link>
                <Link to="/diary" className="mr-5 hover:text-gray-900">About Diary</Link>
                <Link to="/learn" className="mr-5 hover:text-gray-900">Let's start</Link>
                {user.UserType === 'd' &&(<Link to="/patients" className="mr-5 hover:text-gray-900">Patients</Link>)}
            </nav>

            <Link to="/login" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none focus:bg-gray-200 hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-2">Log in</Link>
            <Link to="/signup" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none focus:bg-gray-200 hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Sign up</Link>

        </header >
    );
}

export default NavBar;
