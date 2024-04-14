import PageTemplate from "@assets/PageTemplate";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import React, { useState, useEffect } from "react";



const Me = () => {
     const {get} = useAPI();
     const [data, getData] = useState(null);
     const context = useSessionContext();

     useEffect(() => {
          fetchData();
     }, []);

     const fetchData = async () => {
          console.log(context.token);
          const response = await get('me/1', context.token);

          const jsonData  = await response.json();
          getData(jsonData);
          console.log(jsonData);
     }

     return (
          <PageTemplate>
            <h1>Información del usuario</h1>
            {data && (
                <div>
                    <p>Nombre: {data.name}</p>
                    <p>Apellido: {data.lastName}</p>
                    <p>Email: {data.email}</p>
                    <p>Fecha de nacimiento: {data.birthDate}</p>
                </div>
            )}
        </PageTemplate>
     )
}

export default Me