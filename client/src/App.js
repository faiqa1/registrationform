import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp  from "./Components/Signup";
import HomePage from './Components/HomePage'
import Login from "./Components/Login";
function App() {
  return (
    <div className="App">


     <BrowserRouter>
     <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/login" element={<Login/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
