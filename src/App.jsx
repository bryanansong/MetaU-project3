import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import BoardPage from "./screens/Board/BoardPage";
import KudoPage from "./screens/Kudo/KudoPage";
import HomePage from "./screens/Home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <div className="main-body">
                  <HomePage />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/board/:id"
            element={
              <>
                <Navbar />
                <div className="main-body">
                  <BoardPage />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/kudo/:kudoId"
            element={
              <>
                <Navbar />
                <div className="main-body">
                  <KudoPage />
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
