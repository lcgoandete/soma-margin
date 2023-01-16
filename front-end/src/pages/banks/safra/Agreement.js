import { useState } from 'react';
import { Box, Center, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { Header } from '../../../components/header/Header';
import { formatDateTime } from '../../../helpers/formatter';
import { CpfForm } from '../../../components/cpf-form/CpfForm';
import { PageTitle } from '../../../components/pageTitle/PageTitle';
import { useAgreement } from '../../../hooks/banks/safra/useAgreement';
import { AlertMessage } from '../../../components/alert-error-message/AlertMessage';

export const Agreement = () => {
  const [agreementList, setAgreementList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { loading, getAgremments } = useAgreement();

  const onClickCpf = async (response) => {
    setErrorMessage(null);
    setAgreementList(null);
    const { cpf, message } = response;
    
    if (message) {
      setErrorMessage(message);
    } else {
      const result = await getAgremments(cpf);

      if (result.errorMessage) {
        setErrorMessage(result.errorMessage);
      } else {
        setAgreementList(result);
      }
    }
  }

  const renderingTable = () => {
    if (errorMessage) return <AlertMessage status="error" alertTitle="Error:" message={ errorMessage } />
    
    if (!agreementList) return null;
    
    return (
      <Center>
        <Box minWidth="500px" marginY='7'>
          <Box padding='2' border='1px' borderColor='gray.200' borderTopRadius="10px">
            CPF Consultado: { agreementList[0].cpf }
          </Box>
          <Box padding='2' border='1px' borderColor='gray.200'>
            Nome: { agreementList[0].name }
          </Box>
          <TableContainer>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>Contrato</Th>
                  <Th>Data</Th>
                  <Th>Situação</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                { agreementList.map((agreement) => (
                  <Tr key={agreement.agreement}>
                    <Td>{ agreement.agreement }</Td>
                    <Td>{ agreement.dateTime && formatDateTime(agreement.dateTime) }</Td>
                    <Td>{ agreement.situation }</Td>
                    <Td>{ agreement.status }</Td>
                  </Tr>))
                }
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
      <PageTitle title="Consulta Contrato Safra" />
      <CpfForm loading={ loading } onClickCpf={ onClickCpf } />
      { renderingTable() }
    </>
  );
}
