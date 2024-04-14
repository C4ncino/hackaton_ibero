import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookBookmark, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useSessionContext } from 'hooks/useSessionContext';

interface Props {
    needBlur?: boolean
}

const NavBar = ({ needBlur }: Props) => {
    const context = useSessionContext()
    const navigate = useNavigate()

    let headerClass = "text-gray-600 w-full lg:px-32 px-12 py-5 mx-auto flex flex-wrap flex-col md:flex-row items-center rounded-lg"
    headerClass += needBlur ? " bg-platinum/40 backdrop-hue-rotate-15 backdrop-blur-sm" : ""


    const logOut = () => {
        context.user = null;
        context.token = '';
        navigate('/')
    }


    return (
        <header className={headerClass} >
            <Link to="/" className="flex title-font font-medium items-center text-xl text-gray-900 mb-4 md:mb-0 xl:1/6 lg:w-1/5 w-1/4 md:mx-0 mx-auto justify-center lg:justify-start gap-3">
                <FontAwesomeIcon icon={faBookBookmark} className="w-6 h-6 text-darkLavanda" />
                Diary
            </Link>

            <nav className="md:ml-auto md:mr-auto flex flex-wrap gap-11 items-center text-base justify-center">
                <Link to="/" className="hover:text-gray-900 w-1/10">Home</Link>
                <Link to="/about" className="hover:text-gray-900 w-1/10">About Diary</Link>
                {context.user && context.user.UserType === 'd' ? (
                    <Link to="/patients" className="hover:text-gray-900 w-1/10">Patients</Link>
                ) : (
                    <Link to="/diary" className="hover:text-gray-900 w-1/10">Daily Diary</Link>
                )}
            </nav>

            {context.user ? (
                <>
                    <Link to="/me" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none focus:bg-gray-200 hover:bg-gray-200 rounded mt-4 md:mt-0 mr-4">
                        Hola, {context.user.Name}
                        <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-darkLavanda ml-2" />
                    </Link>
                    <button onClick={logOut} className="inline-flex items-center bg-darkLavanda border-0 py-1 px-3 focus:outline-none focus:bg-lavanda hover:bg-lavanda rounded mt-4 md:mt-0 mr-4 text-white">
                        Log Out
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-5 h-5 text-white ml-2" />
                    </button>
                </>
            ) : (
                <div className='xl:1/6 lg:w-1/5 w-1/4'>
                    <Link to="/login" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none focus:bg-gray-200 hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-2">Log in</Link>
                    <Link to="/signup" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none focus:bg-gray-200 hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Sign up</Link>
                </div>
            )
            }


        </header >
    );
}

export default NavBar;
