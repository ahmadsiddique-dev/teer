import { Button } from "./components/ui/8bit/button";

const App = () => {
    return (
        <div className="w-full flex justify-center text-white pt-4">
            <p className="retro">Please go to chat page...</p>
            <Button className="self-center"><a href="/chat">GO</a></Button>
        </div>
    );
};

export default App;
