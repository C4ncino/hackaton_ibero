import PageTemplate from "@assets/PageTemplate";
import imageLavender from "@assets/lavanda.jpg";

const Home = () => {
    const containerStyles = {

        
        padding: "200px",
      
    };

    const contentStyles = {
        textAlign: "center",
        color: "white",
        fontSize: 39,
    };

    const titleStyles = {
        textAlign: "center",
        color: "white",
        fontSize: 60, 
      };

    const background = {
        backgroundImage: `url(hackaton_ibero-naomi\web\src\assets\lavanda.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'absolute',
        height: '100vh',
        width:'100vw',

    };

    return (
        <PageTemplate>
            <div style={background}>
                 
            </div>
            <div style={containerStyles}>
                <div style={contentStyles}>
                    <h1 style={titleStyles}><b>Diary</b></h1>
                    <p>Un lugar para tu mente y tranquilidad</p>
                </div>
            </div>
        </PageTemplate>
    );
}

export default Home;
