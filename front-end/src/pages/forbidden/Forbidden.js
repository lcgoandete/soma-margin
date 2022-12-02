import { Box, Button, Center, Heading, Image, Link } from '@chakra-ui/react';

import logo from '../../assets/images/soma-logo.png';

export const Forbidden = () => {
  return (
    <Box bgColor='gray.200' height='100vh'>
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
