import { Link } from "react-router";
import { Button } from "./components/ui/8bit/button";

const App = () => {
    return (
        <div className="w-full flex justify-center text-white pt-4">
            <p className="retro">Please go to chat page...</p>
            <Button className="self-center"><Link to={"/chat"}>GO</Link></Button>
        </div>
    );
};

export default App;
