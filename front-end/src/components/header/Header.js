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
            <Link to="/margin"><li>Pesquisar Margem</li></Link>
            <Link to="/card-limit"><li>Consulta saque BMG</li></Link>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;