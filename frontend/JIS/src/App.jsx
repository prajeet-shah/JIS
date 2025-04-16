import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Judge from "./components/Judge";
import Lawyer from "./components/Lawyer";
import Registrar from "./components/Registrar";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import RegisterCase from "./components/RegisterCase";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/lawyer" element={<Lawyer />} />
            <Route path="/judge" element={<Judge />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/registrar/register-case" element={<RegisterCase />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
