import PageTemplate from "@assets/PageTemplate";
import imageLavender from "@assets/lavanda.jpg";

const Home = () => {
    return (
        <PageTemplate>
            <div className="relative h-screen bg-cover bg-center" style={{backgroundImage: `url(${imageLavender})`}}>
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="text-center text-white">
                        <h1 className="text-6xl font-bold">Diary</h1>
                        <p className="text-lg">Un lugar para tu mente y tranquilidad</p>
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
}

export default Home;
