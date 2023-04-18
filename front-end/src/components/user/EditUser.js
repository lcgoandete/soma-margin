import { useEffect, useState } from "react";
import {
  Button,
  Center,
  Checkbox,
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

export const EditUser = ({ user }) => {
  const toast = useToast();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { loading, editUsers } = useUsers();

  useEffect(() => {
    setId(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setActive(user.active);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const updateUser = async () => {
    setErrorMessage('');
    const result = await editUsers({ id, name, email, role, active });
    
    if (result.errorMessage) {
      setErrorMessage(result.errorMessage);
    } else {
      toast({
        title: 'Sucesso',
        description: 'Usuário editado com sucesso!',
        status: 'success',
        duration: 7000,
        isClosable: true,
        position: "top"
      });
      setId('');
      setName('');
      setEmail('');
      setRole('');
      setActive(false);
    }
  }

  
  return (
    <>
      <FormControl width="600px" mx="auto" padding="4" border="1px" borderRadius="10" borderColor="gray.200"> 
      <Center mt="2">
        <Checkbox
          id="active"
          size="lg"
          isChecked={ active }
          onChange={({ target }) => setActive(target.checked)}
        >
          Ativo
        </Checkbox>
      </Center>
        
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
            onClick={ updateUser }
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
