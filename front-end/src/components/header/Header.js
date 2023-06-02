import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Center,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import logo from '../../assets/images/soma-logo.png';
import { useState } from 'react';

const getUser = () => JSON.parse(sessionStorage.getItem('user'));

export const Header = () => {
  const [user] = useState(getUser);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate("/login");
  }

  const renderUserMenu = () => {
    if (user.role) {
      if (user.role === 'ADMIN') {
        return (
          <Menu>
            <Button type='button'>
              <Link to="/user">Usuários</Link>
            </Button>
          </Menu>
        );
      }
    }
  }

  return (
    <Flex direction='row' width='99%' my='2' mx='auto' px='3' border='1px' borderRadius='10' borderColor='gray.200'>
      <Image boxSize='70px' objectFit='scale-down' src={ logo } alt='enterprise logo'/>
      <Spacer />
      <Center gap='3'>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Portal Consignado
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to="/margin">Pesquisar Margem</Link>
            </MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Banco BMG
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to="/banks/bmg/card-limit">Consultar Limite Cartao</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/banks/bmg/withdrawalLimit">Consultar Limite Saque</Link>
            </MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Banco SAFRA
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to="/banks/safra/agreement">Contrato</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/banks/safra/formalization">Formalização</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/banks/safra/fgtsBalance">Saldo do FGTS</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/banks/safra/simulation">Simulação</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/banks/safra/margin">Consultar Margem</Link>
            </MenuItem>
          </MenuList>
        </Menu>

        { renderUserMenu() }
      </Center>
      <Spacer />
      <Center>
        <Button colorScheme='blue' type='button' onClick={ logout }>Logout</Button>
      </Center>
    </Flex>
  );
}
