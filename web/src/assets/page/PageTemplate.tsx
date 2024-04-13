import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
    children: React.ReactNode,
}

const PageTemplate = ({ children }: Props) => {
    return (
        <div className="bg-[#222831] flex flex-col min-h-screen">
            <Navbar />

            <main className="grow ">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default PageTemplate;