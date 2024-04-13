import React, { useState } from "react";
import { useAPI } from "hooks/useAPI";

export const SessionContext = React.createContext<SessionContextModel>({

})

type Props = {
    children: React.ReactNode
}

const SessionContextProvider = ({ children }: Props) => {
    const sessionContext: SessionContextModel = {
    }

    return (
        <SessionContext.Provider value={sessionContext}>
            {children}
        </SessionContext.Provider>
    );
}

export default SessionContextProvider;