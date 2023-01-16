import { Center, Heading, Image } from '@chakra-ui/react';

import logo from '../../assets/images/soma-logo.png';

export const NotFound = () => {
  return (
    <Center flexDirection='column' h='100vh'>
      <Heading>
        Página não encontrada.
      </Heading>
      <Center height='40vh'>
        <Image src={ logo } alt='logo da empresa' />
      </Center>
    </Center>
  );
}
