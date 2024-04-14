import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
    children: React.ReactNode,
    bg?: string
    needBlur?: boolean
}

const PageTemplate = ({ children, bg, needBlur }: Props) => {
    return (
        <div className="bg-no-repeat bg-scroll bg-cover bg-center flex flex-col min-h-screen" style={{ backgroundImage: `url(${bg ? bg : 'https://img.freepik.com/vector-gratis/fondo-acuarela-abstracta-acuarela-pintada-mano_23-2149018547.jpg'})` }}>
            <Navbar needBlur={needBlur} />

            <main className="grow ">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default PageTemplate;