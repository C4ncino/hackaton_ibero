import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    onClick: () => void
}

const AddDiaryButton = ({ onClick }: Props) => {
    return (
        <button className="h-96 w-72 rounded-lg p-5 border-4 border-dashed border-green-500 bg-green-500/20 flex flex-col items-center backdrop-hue-rotate-15 backdrop-blur-sm" onClick={onClick}>
            <h2 className="text-center text-xl font-semibold">Add a Diary</h2>
            <div className="mx-auto bg-green-500 w-1/3 h-1 my-2" />
            <div className="grow flex items-center justify-center">
                <FontAwesomeIcon icon={faPlus} className="h-24 text-green-600" />
            </div>
        </button>
    );
}

export default AddDiaryButton;