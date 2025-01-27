import Navbar from "./sections/Navbar";
import Home from "./sections/Home";


const App = () => {
  return (
    <div className="flex flex-col">
      <Navbar/>
      <Home/>
    </div>
  );
};

export default App;
