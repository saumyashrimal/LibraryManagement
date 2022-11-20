import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Header from './Components/Header';
import UserDashboard from "./Components/UserComponents/UserDashboard";
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
