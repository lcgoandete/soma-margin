import { Link } from 'react-router-dom';
import logo from '../../assets/images/soma-logo.png';
import './style.css';

const Header = () => {
  return (
    <>
      <header>
        <Link to="/">
          <img className='logo' src={logo} alt='logo da empresa'></img>
        </Link>
        <nav>
          <ul>
            <li className="dropdown">
              <span className="dropbtn">Portal Consignado</span>
              <div className="dropdown-content">
                <Link to="/margin">Pesquisar Margem</Link>
              </div>
            </li>
            
            <li className="dropdown">
              <span className="dropbtn">Banco BMG</span>
              <div className="dropdown-content">
                <Link to="/card-limit">Consulta Saque</Link>
              </div>
            </li>
            
            <li className="dropdown">
              <span className="dropbtn">Banco SAFRA</span>
              <div className="dropdown-content">
                <Link to="/agreement">Contrato</Link>
                <Link to="/formalization">Formalização</Link>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;