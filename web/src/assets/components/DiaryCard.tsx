import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface Props {
    diary: Diary
    to_url: string
}

const DiaryCard = ({ diary, to_url }: Props) => {
    return (
        <Link to={to_url} className="h-96 w-72 rounded-lg p-5 bg-darkLavanda/50 flex flex-col backdrop-hue-rotate-15 backdrop-blur-sm">
            <h2 className="text-center text-xl font-semibold">{diary.Title}</h2>
            <div className="mx-auto bg-columbia w-1/3 h-1 my-2" />
            <p className="grow text-center p-2 text-platinum text-lg font-thin">{diary.Description}</p>
            <p className="inline-flex gap-2 items-center text-platinum font-thin">
                <FontAwesomeIcon icon={faCalendarAlt} className="h-5 text-platinum" />
                {diary.Timestamp}
            </p>
        </Link>
    );
}

export default DiaryCard;