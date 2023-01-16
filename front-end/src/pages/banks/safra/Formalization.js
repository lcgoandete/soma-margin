import { useState } from 'react';
import { Box, Center, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { Header } from '../../../components/header/Header';
import { CpfForm } from '../../../components/cpf-form/CpfForm';
import { PageTitle } from '../../../components/pageTitle/PageTitle';
import { useFormalization } from '../../../hooks/banks/safra/useFormalization';
import { AlertMessage } from '../../../components/alert-error-message/AlertMessage';

export const Formalization = () => {
  const [formalization, setFormalization] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { loading, getFormalization } = useFormalization();

  const onClickCpf = async (response) => {
    setErrorMessage(null);
    setFormalization(null);
    const { cpf, message } = response;
    
    if (message) {
      setErrorMessage(message);
    } else {
      setErrorMessage('');
      const result = await getFormalization(cpf);

      if (result.errorMessage) {
        setErrorMessage(result.errorMessage);
      } else {
        setFormalization(result);
      }
    }
  }

   const renderingTable = () => {
    if (errorMessage) return <AlertMessage status="error" alertTitle="Error:" message={ errorMessage } />

    if (!formalization) return null;

    return (
      <Center>
        <Box minWidth="500px" marginY='7'>
          <Box padding='2' border='1px' borderColor='gray.200' borderTopRadius="10px">
            CPF Consultado: { formalization.cpfCustomer }
          </Box>
          <Box padding='2' border='1px' borderColor='gray.200'>
            Nome: { formalization.nameCustomer }
          </Box>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Contrato</Th>
                  <Th>Fase</Th>
                  <Th>Link</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{ formalization.agreement }</Td>
                  <Td>{ formalization.phaseDescription }</Td>
                  <Td>{ formalization.link }</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Center>
    );
  }

  return (
    <>
      <Header />
      <PageTitle title="Formalização Safra" />
      <CpfForm loading={ loading } onClickCpf={ onClickCpf } />
      { renderingTable() }
    </>
  );
}
