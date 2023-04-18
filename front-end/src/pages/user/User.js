import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tooltip,
  Center,
  Switch,
} from "@chakra-ui/react";

import { useUsers } from "../../hooks/useUsers";
import { Header } from "../../components/header/Header";
import { Loading } from "../../components/loading/Loading";
import { CreateUser } from "../../components/user/CreateUser";
import { PageTitle } from "../../components/pageTitle/PageTitle";
import { AlertMessage } from "../../components/alert-error-message/AlertMessage";
import { EditUser } from "../../components/user/EditUser";

export const User = () => {
  const cancelRef = React.useRef()
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [active, setActive] = useState(0);
  const [user, setUser] = useState({});
  const [userList, setUserList] = useState([]);
  const [options, setOptions] = useState({});
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const { loading, getUsers, deleteUsers } = useUsers();
  
  const onClose = () => setIsOpen(false);

  const editUsers = (user) => {
    setUser({ ...user });
    setOptions('edit');
  }
  
  const toolBar = () => {
    return (
      <Center gap='3' mb="6" padding="1" width="30%" mx="auto" border="1px" borderRadius="10" borderColor="gray.200">
        <Button onClick={ () => setOptions("search") }>
          Pesquisar
        </Button>
        <Button onClick={ () => setOptions("create") }>
          Novo
        </Button>
      </Center>
    );
  }

  const searchUsers = async (event) => {
    event.preventDefault();
    if (event.key !== 'Enter' && event.type !== 'click') return;
    
    setErrorMessage('');
    const result = await getUsers(search, 200, 0);

    if (result.errorMessage) {
      setErrorMessage(result.errorMessage);
    } else {
      setUserList(result);
    }
  }

  useEffect(() => {
    setUser({ id, name, email, role, active });
  },[id, name, email, role, active]);

  const renderingTable = () => {
    if (errorMessage) return <AlertMessage status="error" alertTitle="Error:" message={ errorMessage } />
    
    if (userList.length === 0) return null;
    
    return (
      <TableContainer my="4" mx="auto" p="15px" w="900px" border="1px" borderRadius="10px" borderColor="gray.200" align="center">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>Nome</Th>
              <Th>E-mail</Th>
              <Th>Função</Th>
              <Th>Ativo</Th>
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
                  <Td>{ <Switch isDisabled isChecked={user.active} /> }</Td>
                  <Td padding='0'>
                    <Stack spacing="4" direction="row" align="center">
                      <Tooltip hasArrow label="Editar" bg="blue.600">
                        <IconButton
                          colorScheme="blue"
                          variant="ghost"
                          fontSize="20"
                          icon={ <EditIcon /> }
                          onClick={ () => editUsers(user) }
                        />
                      </Tooltip>
                      <Tooltip hasArrow label="Remover" bg="red.600">
                        <IconButton
                          colorScheme="red"
                          variant="ghost"
                          fontSize="20"
                          icon={ <DeleteIcon /> }
                          onClick={ () => openDialogDeleteUser(user) }
                        />
                      </Tooltip>
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
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Remover Usuário
              </AlertDialogHeader>

              <AlertDialogBody>
                { `Tem certeza que deseja remover o usuário ${name}?` }
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme="red" onClick={ deleteUser } ml="3">
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
    setId(user.id);
    setName(user.name);
    setModalType('delete');
    setIsOpen(true);
  }

  const deleteUser = async () => {
    await deleteUsers(id);
    setIsOpen(false);
  }

  const renderingSearchUser = () => {
    return (
      <>
        <FormControl mx="auto" p="15px" width="500px" border="1px" borderRadius="10px" borderColor="gray.200" align="center">
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
        { userList.length && renderingTable() }
        { modalType === 'delete' && renderingDialogDeleteUser() }
      </>
    );
  }
  
  return (
    <>
      <Header />
      <PageTitle title="Controle de usuários" />
      { toolBar() }
      { options === "create" ? <CreateUser /> : null}
      { options === 'search' ? renderingSearchUser() : null }
      { options === "edit" ? <EditUser user={ user } /> : null}
    </>
  );
}
