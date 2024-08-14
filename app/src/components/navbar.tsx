import { Link } from "react-router-dom";
const BoardNavBar = ({
    buttonAction,
    buttonText,
}) => {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <span className="ml-2 text-xl font-semibold"><Link to="/">Home</Link></span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => buttonAction()}>
                {buttonText}
            </button>
        </header>
    );
};

export default BoardNavBar;