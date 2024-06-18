import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./screens/Home/HomePage";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-body">
        <HomePage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
