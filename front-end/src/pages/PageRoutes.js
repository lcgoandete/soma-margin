import { BrowserRouter, Route, Routes } from "react-router-dom";

import { User } from './user/User';
import { Home } from './home/Home';
import { Login } from './login/Login';
import { NotFound } from './notFound/NotFound';
import SafrasMargin from './banks/safra/Margin';
import { Forbidden } from './forbidden/Forbidden';
import { CardLimit } from './banks/bmg/CardLimit';
import { Margin } from './consigned-portal/Margin';
import { Agreement } from './banks/safra/Agreement';
import { Simulation } from "./banks/safra/Simulation";
import { Private } from '../components/private/Private';
import { FgtsBalance } from "./banks/safra/FgtsBalance";
import { Formalization } from './banks/safra/Formalization';
import { SimulationSettingsProvider } from "../contexts/simulationSettingsContext";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Private><Home /></Private> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/margin" element={ <Private><Margin /></Private> } />
        <Route path="/card-limit" element={ <Private><CardLimit /></Private> } />
        <Route path="/banks/safra/agreement" element={ <Private><Agreement /></Private> } />
        <Route path="/banks/safra/margin" element={ <Private><SafrasMargin /></Private> } />
        <Route path="/banks/safra/formalization" element={ <Private><Formalization /></Private> } />
        <Route path="/banks/safra/fgtsBalance" element={ <Private><FgtsBalance /></Private> } />
        <Route path="/banks/safra/simulation" element={
          <Private>
            <SimulationSettingsProvider>
              <Simulation />
            </SimulationSettingsProvider>
          </Private> }
        />
        <Route path="/user" element={ <Private><User /></Private> } />
        <Route path="/forbidden" element={ <Forbidden /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PageRoutes;
