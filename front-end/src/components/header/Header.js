import logo from '../../assets/images/soma-logo.png';
import './style.css';

const Header = () => {
  return (
    <>
      <header>
        <img className='logo' src={logo} alt='logo da empresa'></img>
      </header>
    </>
  );
}

export default Header;