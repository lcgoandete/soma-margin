import { Box, Button, Center, Heading, Image, Link } from '@chakra-ui/react';

import { Header } from '../../components/header/Header';
import logo from '../../assets/images/soma-logo.png';

export const Forbidden = () => {
  return (
    <Box height='100vh'>
      <Header />
      <Center flexDirection='column'>
        <Image mt='200' src={ logo } alt='logo da empresa' />
        <Heading mt='100'>
          Acesso não permitido.
        </Heading>
        <Link mt='50' href='/login'>
          <Button>Login</Button>
        </Link>
      </Center>
    </Box>
  );
}
