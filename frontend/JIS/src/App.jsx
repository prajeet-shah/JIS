import { BrowserRouter, Routes, Route } from "react-router";

import Judge from "./components/pages/Judge/Judge";
import Lawyer from "./components/pages/Lawyer/Lawyer";
import Registrar from "./components/pages/Registrar/Registrar";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import RegisterCase from "./components/pages/Registrar/RegisterCase";
import CaseDetails from "./components/pages/Lawyer/CaseDetails";
import ClosedCase from "./components/pages/Registrar/ClosedCase";
import RunningCases from "./components/pages/Registrar/RunningCases";
import PendingCases from "./components/pages/Registrar/PendingCases";

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
            <Route path="/registrar/closed-case" element={<ClosedCase />} />
            <Route path="/registrar/running-case" element={<RunningCases />} />
            <Route path="/registrar/pending-case" element={<PendingCases />} />
            <Route path="/lawyer/case/:cin" element={<CaseDetails />} />
            <Route path="/judge/case/:cin" element={<CaseDetails />} />
            <Route path="/registrar/case/:cin" element={<CaseDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
