import React, { useState } from "react";
import { useAPI } from "hooks/useAPI";
import { MD5 } from "crypto-js";

export const SessionContext = React.createContext<SessionContextModel>({
    user: null,
    token: "",
    login: async () => false,
    signup: async () => false
})

type Props = {
    children: React.ReactNode
}

const SessionContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<user>(null)
    const [token, setToken] = useState("")

    const {
        post
    } = useAPI();

    const signup = async (firstName: string, lastName: string, experienceYears: number, birthDate: string, email: string, password: string, type: boolean, contactEmail: string) => {
        const passwordHash = MD5(password).toString()

        let data
        if (type === true) {
            console.log("Doctor");
            data = await post('signup/d', "", JSON.stringify({ "name": firstName, "lastName": lastName, "email": email, "password": passwordHash, "birthDate": birthDate, "contactEmail": contactEmail, "ExperienceYears": experienceYears }))
        }
        else if (type === false) {
            console.log("Paciente");
            data = await post('signup/p', "", JSON.stringify({ "name": firstName, "lastName": lastName, "email": email, "password": passwordHash, "birthDate": birthDate }))
        }

        if (data != false) {
            setUser(data['user'])
            setToken(data['token'])
            return true
        }

        return false
    }

    const login = async (email: string, password: string) => {
        const passwordHash = MD5(password).toString();


        const data = await post("login", "", JSON.stringify({ "email": email, "password": passwordHash }))
        console.log(data)

        if (data != false) {
            setUser(data['user'])
            setToken(data['token'])
            return true
        }

        return false
    };


    const sessionContext: SessionContextModel = {
        user,
        token,
        login,
        signup,
    }

    return (
        <SessionContext.Provider value={sessionContext}>
            {children}
        </SessionContext.Provider>
    );
}

export default SessionContextProvider;