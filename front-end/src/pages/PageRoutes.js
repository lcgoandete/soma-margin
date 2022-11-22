import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./home/Home";
import NotFound from "./notFound/NotFound";
import CardLimit from "./cardLimit/CardLimit";
import Agreement from "./banks/safra/Agreement";
import ConsultCpf from "./consultCpf/ConsultCpf";
import Header from "../components/header/Header";
import Formalization from "./banks/safra/Formalization";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/margin" element={ <ConsultCpf /> } />
        <Route path="/card-limit" element={ <CardLimit /> } />
        <Route path="/agreement" element={ <Agreement /> } />
        <Route path="/formalization" element={ <Formalization /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PageRoutes;
