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

export const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate("/login");
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
              <Link to="/card-limit">Consultar Saque</Link>
            </MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Banco SAFRA
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to="/agreement">Contrato</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/formalization">Formalização</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Center>
      <Spacer />
      <Center>
        <Button colorScheme='blue' type='button' onClick={ logout }>Logout</Button>
      </Center>
    </Flex>
  );
}
