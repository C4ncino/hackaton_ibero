import PageTemplate from "@assets/PageTemplate";
import white from "@assets/fondoT.jpg";

const Home = () => {
    return (
        <PageTemplate bg={white} needBlur>
            <div className="flex justify-center items-center text-center text-dark flex-col md:h-[80vh] h-[65vh]">
                <h1 className="text-6xl font-bold">Diary</h1>
                <p className="text-lg pt-5">Un lugar para tu mente y tranquilidad</p>
            </div>
        </PageTemplate >
    );
}
export default Home;
