import PageTemplate from "@assets/PageTemplate";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import { useState, useEffect } from "react";

const Me = () => {
    const { get } = useAPI();
    const [data, setData] = useState<null | user>(null);
    const context = useSessionContext();

    useEffect(() => {
        fetchData();
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
        <PageTemplate needBlur>
            <div className="mt-20 mx-auto text-center text-4xl text-white">
                <h1>Información del usuario</h1>
            </div>
            {data && (
                <div className="mx-auto relative overflow-x-auto sm:rounded-lg p-20 ">
                    <table className="mx-auto w-full max-w-xl overflow-auto bg-white border-rounded-lg shadow">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Apellido
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fecha de nacimiento
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.Name}
                                </th>
                                <td className="px-6 py-4">
                                    {data.LastName}
                                </td>
                                <td className="px-6 py-4">
                                    {data.Email}
                                </td>
                                <td className="px-6 py-4">
                                    {data.BirthDate}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </PageTemplate>


    )
}

export default Me




