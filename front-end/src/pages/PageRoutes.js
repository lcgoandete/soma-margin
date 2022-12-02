import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './home/Home';
import { Login } from './login/Login';
import { NotFound } from './notFound/NotFound';
import { Forbidden } from "./forbidden/Forbidden";
import { CardLimit } from './banks/bmg/CardLimit';
import { Agreement } from './banks/safra/Agreement';
import { Margin } from './consigned-portal/Margin';
import { Private } from "../components/private/Private";
import { Formalization } from './banks/safra/Formalization';

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Private><Home /></Private> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/margin" element={ <Private><Margin /></Private> } />
        <Route path="/card-limit" element={ <Private><CardLimit /></Private> } />
        <Route path="/agreement" element={ <Private><Agreement /></Private> } />
        <Route path="/formalization" element={ <Private><Formalization /></Private> } />
        <Route path="/forbidden" element={ <Forbidden /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PageRoutes;
