import PageTemplate from "@assets/PageTemplate";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { useState, useEffect } from "react";

const Me = () => {
    const { get } = useAPI();
    const [data, setData] = useState<null | user>(null);
    const [daries, setDaries] = useState<any>();
    const context = useSessionContext();

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        console.log(context.token);
        const data = await get(`me/${context.user?.Id}`, context.token);

        console.log(data);

        if (data != false) {
            setData(data['user']);
        }
    }
    

    return (
        <PageTemplate>
             <div className="flex flex-col justify-center items-center mt-20">
                <h1 className="text-4xl font-bold text-hoverDarkLavanda mb-10">Información del usuario</h1>
                {data && (
                    <div className="bg-platinum/20 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden max-w-md mx-auto">
                        <div className="flex justify-center items-center py-8">
                            <img
                            src="https://thispersondoesnotexist.com/" // Placeholder until user provides image
                            alt="Avatar"
                            className="rounded-full object-cover object-center w-34 h-34 md:w-52 md:h-52"
                            />
                        </div>
                        <div className="p-8 text-center">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            {data.Name} {data.LastName}
                            </h2>
                            <ul className="list-none space-y-2 text-gray-700">
                            <li>
                                <span className="inline-block font-medium text-gray-900">Correo electrónico:</span> {data.Email}
                            </li>
                            <li>
                                <span className="inline-block font-medium text-gray-900">Fecha de nacimiento:</span> {data.BirthDate}
                            </li>
                            <li>
                            <span className="inline-block font-medium text-gray-900">Tipo de usuario: </span><span className="inline-block font-bold text-darkLavanda ml-1">{data.UserType === 'p' ? 'Paciente' : 'Doctor'}</span> 
                            </li>
                            
                            </ul>
                        </div>
                    </div>
                )}
                </div>



        </PageTemplate>


    )
}

export default Me




