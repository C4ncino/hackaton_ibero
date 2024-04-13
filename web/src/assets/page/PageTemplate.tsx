import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
    children: React.ReactNode,
}

const PageTemplate = ({ children }: Props) => {
    return (
        <div className="bg-no-repeat bg-scroll bg-cover bg-center bg-[url(https://img.freepik.com/vector-gratis/fondo-acuarela-abstracta-acuarela-pintada-mano_23-2149018547.jpg?w=1060&t=st=1713026988~exp=1713027588~hmac=34f17a301be45cf39ccc6a3c2a2c849177d2956f8dffe472b18116f1fd278740)] flex flex-col min-h-screen">
            <Navbar />

            <main className="grow ">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default PageTemplate;