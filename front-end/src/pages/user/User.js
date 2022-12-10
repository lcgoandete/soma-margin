import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
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
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";

import { useUsers } from "../../hooks/useUsers";
import { Header } from "../../components/header/Header";
import { Loading } from "../../components/loading/Loading";
import { PageTitle } from "../../components/pageTitle/PageTitle";
import { AlertErrorMessage } from "../../components/alert-error-message/AlertErrorMessage";

export const User = () => {
  const cancelRef = React.useRef()
  const [userId, setUserId] = useState();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [user, setUser] = useState({});
  const [userList, setUserList] = useState([]);
  
  const [search, setSearch] = useState('');
  const onClose = () => setIsOpen(false);
  const [ isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const { loading, getUsers, deleteUsers, editUsers } = useUsers();
   
  const searchUsers = async (event) => {
    event.preventDefault();
    if (event.key !== 'Enter' && event.type !== 'click') return;
    
    setErrorMessage('');
    const result = await getUsers(5, 0);

    if (result.errorMessage) {
      setErrorMessage(result.errorMessage);
    } else {
      setUserList(result);
    }
  }

  const renderingTable = () => {
    if (errorMessage) return <AlertErrorMessage errorMessage={ errorMessage } />
    return (
      <TableContainer my='4' mx="auto" p="15px" w="900px" border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
        <Table variant='striped' colorScheme='gray'>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>Nome</Th>
              <Th>E-mail</Th>
              <Th>Função</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              userList.map((user) => (
                <Tr key={user.id}>
                  <Td>{ user.id }</Td>
                  <Td>{ user.name }</Td>
                  <Td>{ user.email }</Td>
                  <Td>{ user.role }</Td>
                  <Td padding='0'>
                    <Stack spacing={4} direction='row' align='center'>
                      <IconButton
                        colorScheme='blue'
                        variant='ghost'
                        fontSize='20'
                        icon={ <EditIcon /> }
                        onClick={ () => openModalEditUser(user) }
                      />
                      <IconButton
                        colorScheme='red'
                        variant='ghost'
                        fontSize='20'
                        icon={ <DeleteIcon /> }
                        onClick={ () => openDialogDeleteUser(user) }
                      />
                    </Stack>
                  </Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  const renderingModalEditUser = () => {
    return (
      <>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Usuário</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
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
                <FormLabel mt={4} htmlFor="password">Senha:</FormLabel>
                <Input
                  disabled={true}
                  id="password"
                  type="password"
                  name="password"
                  value={ password }
                  onChange={({ target }) => setPassword(target.value)}
                />
                <RadioGroup mt={4} onChange={ setRole } value={role}>
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="red" value="ADMIN">Administrador</Radio>
                    <Radio colorScheme="blue" value="USER">Usuário</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              { errorMessage && <AlertErrorMessage errorMessage={ errorMessage } /> }
            </ModalBody>

            <ModalFooter>
              <Button
                mr={3}
                onClick={onClose}>Cancelar</Button>
              <Button
                colorScheme='blue'
                onClick={ editUser }
              >
                Salvar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  const openModalEditUser = (user) => {
    setUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    // setPassword(user.password)
    setRole(user.role);
    setModalType('edit');
    setIsOpen(true);
  }

  useEffect(() => {
    setUser({ id: userId, name, email, role, active: 1 });
  },[userId, name, email, role]);

  const editUser = async () => {
    const result = await editUsers(user);
    if (result.errorMessage) {
      setErrorMessage(result.errorMessage);
    } else {
      setIsOpen(false);
      setUserList([]);
    }
  }

  const renderingDialogDeleteUser = () => {
    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Remover Usuário
            </AlertDialogHeader>

            <AlertDialogBody>
              { `Tem certeza que deseja remover o usuário ${name}?` }
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={ deleteUser } ml={3}>
                Remover
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </>
    );
  }

  const openDialogDeleteUser = (user) => {
    setName(user.name);
    setModalType('delete');
    setIsOpen(true);
  }

  const deleteUser = async () => {
    await deleteUsers(userId);
    setIsOpen(false);
  }

  return (
    <>
      <Header />
      <PageTitle title="Controle de usuários" />
      <Box mx="auto" p="15px" width="500px" border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
        <FormControl>
          <FormLabel htmlFor="search">Pesquisar:</FormLabel>
          <Input
            autoFocus
            id="search"
            type="text"
            name="search"
            value={ search }
            onChange={({ target }) => setSearch(target.value)}
            onKeyUp={(event) => searchUsers(event)}
          />
          <Button mt="4" colorScheme='blue' onClick={ (event) => searchUsers(event) }>
            Pesquisar
            { loading && <Loading /> }
          </Button>
        </FormControl>
      </Box>
      { userList.length && renderingTable() }
      { modalType === 'delete' && renderingDialogDeleteUser() }
      { modalType === 'edit' && renderingModalEditUser() }
    </>
  );
}
