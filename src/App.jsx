import Header from "./components/Header/Header";
import Home from "./Pages/Home/Homes";
import ScrollProgress from "./components/ScrollProgress";

const App = () => {
  return (
    <>
      <ScrollProgress />

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <Home />
      </div>
    </>
  );
};

export default App;