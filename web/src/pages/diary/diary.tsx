import PageTemplate from "@assets/PageTemplate";
import whiteBack from "@assets/fondoT.jpg";

const Diary = () => {
    return (
        <PageTemplate>
            <div className="bg-cover bg-center" style={{backgroundImage: `url(${whiteBack})`}}>
                <div className="p-8 text-center text-black">
                    <h1 className="text-6xl font-bold mb-8">¿Qué es Diary?</h1>
                    <p>Diary es una plataforma diseñada para fomentar el <b>bienestar mental</b> y <b>emocional</b>. Nuestro objetivo es proporcionar a los usuarios una herramienta práctica para <b>registrar</b> y <b>comprender</b> sus emociones diarias, así como para facilitar la comunicación y colaboración con sus profesionales de la <b>salud mental</b>.</p>
                </div>
            </div>
        </PageTemplate>
    );
}

export default Diary;
