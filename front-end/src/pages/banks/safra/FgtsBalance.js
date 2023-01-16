import { useState } from 'react';
import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { Header } from '../../../components/header/Header';
import { CpfForm } from '../../../components/cpf-form/CpfForm';
import { PageTitle } from '../../../components/pageTitle/PageTitle';
import { useFgtsBalance } from '../../../hooks/banks/safra/useFgtsBalance';
import { formatCurrency, formatDateTime } from '../../../helpers/formatter';
import { AlertMessage } from '../../../components/alert-error-message/AlertMessage';

export const FgtsBalance = () => {
  const [fgtsBalance, setFgtsBalance] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { loading, getFgtsBalance } = useFgtsBalance();

  const onClickCpf = async (response) => {
    setErrorMessage(null);
    setFgtsBalance(null);
    const { cpf, message } = response;
    
    if (message) {
      setErrorMessage(message);
    } else {
      const result = await getFgtsBalance(cpf);

      if (result.errorMessage) {
        setErrorMessage(result.errorMessage);
      } else {
        setFgtsBalance(result);
      }
    }
  }

  const renderingTable = () => {
    if (errorMessage) return <AlertMessage status="error" alertTitle="Error:" message={ errorMessage } />
    
    if (!fgtsBalance) return '';
    
    if (fgtsBalance.erros.length > 0) {
      return (
        <>
          <Box mt="4" mx="auto" p="15px" w="750px" border="1px" borderRadius="10px" borderColor="gray.200">
            ID Cliente  - { fgtsBalance.idCliente }
          </Box>
          <Box mx="auto" p="15px" w="750px" border="1px" borderRadius="10px" borderColor="gray.200">
            Permite Consulta - { fgtsBalance.permiteConsulta ? 'Permitido' : 'Não Permitido' }
          </Box>
          <TableContainer my="4" mx="auto" p="15px" w="750px" border="1px" borderRadius="10px" borderColor="gray.200" align="center">
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>Código</Th>
                  <Th>Descrição</Th>
                </Tr>
              </Thead>
              <Tbody>
                { fgtsBalance.erros.map((error) => (
                  <Tr key={ error.codigo }>
                    <Td>{ error.codigo }</Td>
                    <Td>{ error.descricao }</Td>
                  </Tr>))
                }
              </Tbody>
            </Table>
          </TableContainer>
        </>
      );
    }

    return (
      <TableContainer my="4" mx="auto" p="15px" w="750px" border="1px" borderRadius="10px" borderColor="gray.200" align="center">
        <Table variant='striped' colorScheme='gray'>
          <Thead>
            <Tr>
              <Th>Data de Repasse</Th>
              <Th>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            { fgtsBalance.periodos.map((periodo) => (
              <Tr key={ periodo.dtRepasse }>
                <Td>{ formatDateTime(periodo.dtRepasse) }</Td>
                <Td>{ formatCurrency(periodo.valor) }</Td>
              </Tr>))
            }
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      <Header />
      <PageTitle title="Consulta Saldo FGTS" />
      <CpfForm loading={ loading } onClickCpf={ onClickCpf } />
      { renderingTable() }
    </>
  );
}
