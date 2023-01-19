import { useState } from 'react';
import { 
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input
} from '@chakra-ui/react';

import logo from '../../assets/images/soma-logo.png';
import { Loading } from '../../components/loading/Loading';
import { useAuthentication } from '../../hooks/useAuthentication';
import { AlertMessage } from '../../components/alert-error-message/AlertMessage';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticate, loading, errorMessage} = useAuthentication();

  const getAuthentication = async (event) => {
    event.preventDefault();
    if (event.key !== 'Enter' && event.type !== 'click') return;
    await authenticate({ email, password });
  }

  return (
    <Box height='100vh'>
      <Center height='30vh'>
        <Image src={ logo } alt='logo da empresa'/>
      </Center>
      <Center flexDirection='column' >
        <Heading my='20px'>
          Login
        </Heading>
        <Box p="15px" w="500px" border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
          <FormControl isRequired>
            <FormLabel mt="2">Email:</FormLabel>
            <Input
              autoFocus
              id="email"
              type="text"
              name="email"
              autoComplete="on"
              value={ email }
              onChange={({ target }) => setEmail(target.value)}
            />
            <FormLabel mt="2">Senha:</FormLabel>
            <Input
              id="password"
              type="password"
              name="password"
              autoComplete="off"
              value={ password }
              onChange={({ target }) => setPassword(target.value)}
              onKeyUp={ (event) => getAuthentication(event) }
            />
            <Button mt="2" colorScheme='blue' type='submit' onClick={ (event) => getAuthentication(event) } >
              Entrar
              { loading && <Loading /> }
            </Button>
          </FormControl>
        </Box>
        { errorMessage && <AlertMessage status="error" alertTitle="Error:" message={ errorMessage } /> }
      </Center>
    </Box>
  );
}
