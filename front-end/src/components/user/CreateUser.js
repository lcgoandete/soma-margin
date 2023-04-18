import { useState } from "react";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useToast
} from "@chakra-ui/react";

import { Loading } from "../loading/Loading";
import { useUsers } from "../../hooks/useUsers";
import { AlertMessage } from "../alert-error-message/AlertMessage";

export const CreateUser = () => {
  const toast = useToast();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { loading, registerUsers } = useUsers();

  const registerUser = async () => {
    setErrorMessage('');
    const result = await registerUsers({ name, email, password, role, active: 1 });
    
    if (result.errorMessage) {
      setErrorMessage(result.errorMessage);
    } else {
      toast({
        title: 'Sucesso',
        description: 'Usuário registrado com sucesso!',
        status: 'success',
        duration: 7000,
        isClosable: true,
        position: "top"
      });
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
    }
  }

  return (
    <>
      <FormControl width="600px" mx="auto" padding="4" border="1px" borderRadius="10" borderColor="gray.200"> 
        <FormLabel htmlFor="name">Nome:</FormLabel>
        <Input
          autoFocus
          id="name"
          type="text"
          name="name"
          value={ name }
          onChange={({ target }) => setName(target.value)}
        />
        <FormLabel mt={4} htmlFor="email">E-mail:</FormLabel>
        <Input
          id="email"
          type="email"
          name="email"
          value={ email }
          onChange={({ target }) => setEmail(target.value)}
        />
        <FormLabel mt={4} htmlFor="MyPassword">Senha:</FormLabel>
        <Input
          autoComplete="new-password"
          id="password"
          type="password"
          name="myPassword"
          value={ password }
          onChange={({ target }) => setPassword(target.value)}
        />
        <FormLabel mt="4">Função:</FormLabel>
        <RadioGroup mt="4" p="2" border="1px" borderRadius="5" borderColor="gray.200" onChange={ setRole } value={role}>
          <Stack spacing="5" direction="row">
            <Radio colorScheme="red" value="ADMIN">Administrador</Radio>
            <Radio colorScheme="blue" value="USER">Usuário</Radio>
          </Stack>
        </RadioGroup>
        
        <Center mt="4">
          <Button
            colorScheme="blue"
            onClick={ registerUser }
          >
            Salvar
            { loading && <Loading /> }
          </Button>
        </Center>
      </FormControl>
      { errorMessage && <AlertMessage status="error" alertTitle="Error:" message={ errorMessage } /> }
    </>
  );
}
