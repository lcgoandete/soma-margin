import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";

import Home from "./home/Home";
import NotFound from "./notFound/NotFound";
import CardLimit from "./cardLimit/CardLimit";
import ConsultCpf from "./consultCpf/ConsultCpf";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/margin" element={ <ConsultCpf /> } />
        <Route path="/card-limit" element={ <CardLimit /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PageRoutes;
