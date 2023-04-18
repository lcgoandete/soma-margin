import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack
} from "@chakra-ui/react";

import { useUsers } from "../../hooks/useUsers";
import { AlertMessage } from "../alert-error-message/AlertMessage";

export const EditUser = (props) => {
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  
  const { user } = props;
  const { editUsers } = useUsers();

  useEffect(() => {
    console.log('abiu?');
  },[user]);

  const onClose = () => setIsOpen(false);

  const editUser = async () => {
    const result = await editUsers({ name, email, password, role });
    if (result.errorMessage) {
      setErrorMessage(result.errorMessage);
    } else {
      // setIsOpen(false);
    }
  }

  // const openModalEditUser = () => {
  //   setId(user.id);
  //   setName(user.name);
  //   setEmail(user.email);
  //   // setPassword(user.password)
  //   setRole(user.role);
  //   // setModalType('edit');
  //   setIsOpen(true);
  // }

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="6">
            <FormControl>
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
              <FormLabel mt={4} htmlFor="myPassword">Senha:</FormLabel>
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
            </FormControl>
            { errorMessage && <AlertMessage status="error" alertTitle="Error:" message={ errorMessage } /> }
          </ModalBody>

          <ModalFooter>
            <Button
              mr="3"
              onClick={ onClose }>Cancelar</Button>
            <Button
              colorScheme="blue"
              onClick={ editUser }
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}