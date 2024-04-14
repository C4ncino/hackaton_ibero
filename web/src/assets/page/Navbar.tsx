import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookBookmark, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSessionContext } from 'hooks/useSessionContext';
import React from 'react';

interface Props {
    needBlur?: boolean
}

const NavBar = ({ needBlur }: Props) => {
    const context = useSessionContext()

    let headerClass = "text-gray-600 w-full px-32 py-5  mx-auto flex flex-wrap flex-col md:flex-row items-center rounded-lg"
    headerClass += needBlur ? " bg-platinum/40 backdrop-hue-rotate-15 backdrop-blur-sm" : ""

    return (
        <header className={headerClass} >
            <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 w-1/6">
                <FontAwesomeIcon icon={faBookBookmark} className="w-6 h-6 text-darkLavanda" />

                <span className="ml-3 text-xl">Diary</span>
            </Link>

            <nav className="md:ml-auto md:mr-auto flex flex-wrap gap-10 items-center text-base justify-center">
                <Link to="/" className="hover:text-gray-900 w-1/10">Home</Link>
                <Link to="/about" className="hover:text-gray-900 w-1/10">About Diary</Link>
                {context.user && context.user.UserType === 'd' ? (
                    <Link to="/patients" className="hover:text-gray-900 w-1/10">Patients</Link>
                ) : (
                    <Link to="/diary" className="hover:text-gray-900 w-1/10">Daily Diary</Link>
                )}
            </nav>

            {context.user ? (
                <Link to="/me" className='border-b-2 border-darkLavanda p-1 w-1/6'>
                    <span className="py-1 px-8 mt-4">Hola, {context.user.Name}</span>
                    <FontAwesomeIcon icon={faUser} className="w-6 h-6 text-darkLavanda" />
                </Link>
            ) : (
                <div className='w-1/6'>
                    <Link to="/login" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none focus:bg-gray-200 hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-2">Log in</Link>
                    <Link to="/signup" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none focus:bg-gray-200 hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Sign up</Link>
                </div>
            )}


        </header >
    );
}

export default NavBar;
