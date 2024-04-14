import PageTemplate from "@assets/PageTemplate";
import { useAPI } from "hooks/useAPI";
import { useSessionContext } from "hooks/useSessionContext";
import React, { useState, useEffect } from "react";



const Me = () => {
     const { get } = useAPI();
     const [data, setData] = useState<null | user>(null);
     const context = useSessionContext();

     useEffect(() => {
          fetchData();
     }, []);

     const fetchData = async () => {
          console.log(context.token);
          const data = await get('me/1', context.token);

          console.log(data);

          if (data != false) {
               setData(data['user']);
          }

     }

     return (
          <PageTemplate needBlur>
               <h1>Información del usuario</h1>
               {data && (
                    <div>
                         <p>Nombre: {data.Name}</p>
                         <p>Apellido: {data.LastName}</p>
                         <p>Email: {data.Email}</p>
                         <p>Fecha de nacimiento: {data.BirthDate}</p>
                    </div>
               )}
          </PageTemplate>
     )
}

export default Me