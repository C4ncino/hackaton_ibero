import PageTemplate from "@assets/PageTemplate";
import white from "@assets/fondoT.jpg";

const About = () => {
    return (
        <PageTemplate bg={white} needBlur>
            <div className="flex justify-center items-center text-center text-dark flex-col md:h-[80vh] h-[65vh]">
                <h1 className="text-6xl font-bold">Diary</h1>
                <div className="max-w-lg mx-auto w-3/4">
                <p className="text-lg pt-5 ">Diary es una plataforma diseñada para fomentar el <b>bienestar mental</b> y <b>emocional</b>. Nuestro objetivo es proporcionar a los usuarios una herramienta práctica para <b>registrar</b> y <b>comprender</b> sus emociones diarias, así como para facilitar la comunicación y colaboración con sus profesionales de la <b>salud mental.</b></p>
                </div>
            </div>
        </PageTemplate >
    );
}

export default About;
