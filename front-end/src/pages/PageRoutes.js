import { BrowserRouter, Route, Routes } from "react-router-dom";

import { User } from './user/User';
import { Home } from './home/Home';
import { Login } from './login/Login';
import { Chatgpt } from './chatgpt/chatgpt';
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
import { ProposalStatus } from './banks/bmg/proposal-status';
import { WithdrawalLimit } from './banks/bmg/withdrawal-limit';
import { LoanLimitSimulation } from './banks/bmg/loanLimitSimulation';
import { RegisterProposalCard } from './banks/bmg/register-proposal-card';
import { SimulationSettingsProvider } from "../contexts/simulationSettingsContext";
import { WithdrawalLimitBenefitCard } from './banks/bmg/withdrawal-limit-benefit-card';
import { LoanLimitSimulationCredcesta } from './banks/master/loanLimitSimulationCredcesta';
import { LoanLimitSimulationMfacil } from './banks/master/loanLimitSimulationMfacil';

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Private><Home /></Private> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/margin" element={ <Private><Margin /></Private> } />
        <Route path="/banks/bmg/card-limit" element={ <Private><CardLimit /></Private> } />
        <Route path="/banks/bmg/withdrawalLimit" element={ <Private><WithdrawalLimit /></Private> } />
        <Route path="/banks/bmg/withdrawalLimitBenefitCard" element={ <Private><WithdrawalLimitBenefitCard /></Private> } />
        <Route path="/banks/bmg/registerProposalCard" element={ <Private><RegisterProposalCard /></Private> } />
        <Route path="/banks/bmg/proposalStatus" element={ <Private><ProposalStatus /></Private> } />
        <Route path="/banks/bmg/loanLimitSimulation" element={ <Private><LoanLimitSimulation /></Private> } />
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
        <Route path="/banks/master/loanLimitSimulationCredcesta" element={ <Private><LoanLimitSimulationCredcesta /></Private> } />
        <Route path="/banks/master/loanLimitSimulationMfacil" element={ <Private><LoanLimitSimulationMfacil /></Private> } />
        <Route path="/user" element={ <Private><User /></Private> } />
        <Route path="/chatgpt" element={ <Private><Chatgpt /></Private> } />
        <Route path="/forbidden" element={ <Forbidden /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PageRoutes;
