import PageTemplate from "@assets/PageTemplate";
import whiteBack from "@assets/fondoT.jpg";

const Home = () => {
    const containerStyles = {
        backgroundImage: `url(${whiteBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: "200px",
      
    };

    const contentStyles = {
        textAlign: "center",
        color: "black",
        fontSize: 39,
    };

    const titleStyles = {
        textAlign: "center",
        color: "black",
        fontSize: 60, 
      };

    return (
        <PageTemplate>
            <div style={containerStyles}>
                <div style={contentStyles}>
                    <h1 style={titleStyles}><b>¿Qué es Diary?</b></h1>
                    <p>Diary es una plataforma diseñada para fomentar el <b>bienestar mental </b> y <b>emocional</b>. Nuestro objetivo es proporcionar a los usuarios una herramienta
                    práctica para <b>registrar</b> y <b>comprender</b> sus emociones diarias, así como para facilitar la comunicación y colaboración con sus profesionales de la <b>salud mental</b>.</p>
                </div>
            </div>
        </PageTemplate>
    );
}

export default Home;
