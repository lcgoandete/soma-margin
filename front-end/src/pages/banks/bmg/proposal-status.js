import { useState } from 'react';
import moment from 'moment';
import {
  Badge,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react';

import { Header } from '../../../components/header/Header';
import { Loading } from '../../../components/loading/Loading';
import { PageTitle } from '../../../components/pageTitle/PageTitle';
import { formatCurrency, formatDateTime } from '../../../helpers/formatter';
import { useProposalStatus } from '../../../hooks/banks/bmg/useProposalStatus';

const currentDay = moment().format('YYYY-MM-DD');

export const ProposalStatus = () => {
  const toast = useToast();
  const [date, setDate] = useState(currentDay);
  const [proposalStatusList, setProposalStatusList] = useState([]);
  const { getProposalStatusList, loading } = useProposalStatus();

  const getWithdralwalLimits = async (event) => {
    event.preventDefault();
    setProposalStatusList([]);

    const result = await getProposalStatusList(date);

    if (result.errorMessage) {
      toast({
        title: 'error',
        description: `${result.errorMessage}`,
        status: 'error',
        duration: 7000,
        isClosable: true,
        position: "top",
      });
    } else {
      const resultSortedByDate = result.sort((a, b) => (a.data > b.data) ? -1 : 1);
      setProposalStatusList(resultSortedByDate);
    }
  }

  const renderingForm = () => {
    return (
      <FormControl isRequired mx="auto" p="15px" w="650px" border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
        <SimpleGrid>
          <Box mx="auto" w="400px">
            <FormLabel htmlFor="date" mt="10px">Data:</FormLabel>
            <Input
              id="date"
              type="date"
              name="date"
              autoComplete="off"
              disabled={ true }
              value={ date }
              onChange={ ({ target }) => setDate(target.value) }
            />
          </Box>
        </SimpleGrid>

        <Box mt="4">
          <Button colorScheme='blue' onClick={ (event) => getWithdralwalLimits(event) }>
            Consultar
            { loading && <Loading /> }
          </Button>
        </Box>
      </FormControl>
    );
  }

  const badgeColor = (status) => {
    status = status.toUpperCase();

    switch (status) {
      case 'CANCELADA':
        return <Badge colorScheme='red'>{ status }</Badge>;
      case 'CRÉDITO ENVIADO':
        return <Badge  colorScheme='green'>{ status }</Badge>;
      default:
        return <Badge>{ status }</Badge>;
    }
  }

  const renderingProposalStatus = () => {
    if (proposalStatusList.length < 1) {
      return (
        <Box my="4" mx="auto" p="15px" w="650px" border="1px" borderRadius="10px" borderColor="gray.200" align="center">
          Dados inexistentes
        </Box>
      );
    }

    return (
      <TableContainer my="25px" mx="auto" p="15px" w="70%" border="1px" borderRadius="10px" borderColor="gray.200">
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Número</Th>
              <Th>CPF Cliente</Th>
              <Th>Nome Cliente</Th>
              <Th>Status</Th>
              <Th>Data</Th>
              <Th>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            { proposalStatusList.map(({ numero, cpfCliente, nomeCliente, status, data, valor }) => (
              <Tr key={numero}>
                <Td>{ numero }</Td>
                <Td>{ cpfCliente }</Td>
                <Td>{ nomeCliente }</Td>
                <Td>{ badgeColor(status) }</Td>
                <Td>{ formatDateTime(data) }</Td>
                <Td>R$ { formatCurrency(valor) }</Td>
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
      <PageTitle title=" Consultar Propostas" />
      { renderingForm() }
      { renderingProposalStatus() }
    </>
  );
}
