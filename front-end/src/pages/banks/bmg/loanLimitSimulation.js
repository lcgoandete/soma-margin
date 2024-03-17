import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  useToast
} from '@chakra-ui/react';

import { Header } from '../../../components/header/Header';
import { Loading } from '../../../components/loading/Loading';
import { PageTitle } from '../../../components/pageTitle/PageTitle';
import { formatCurrency, formatCurrencyMask } from '../../../helpers/formatter';
import { useLoanLimitSimulation } from '../../../hooks/banks/bmg/useLoanLimitSimulation';
import { ShowProposalLink } from '../../../components/bmg/proposal-card/ShowProposalLink';

export const LoanLimitSimulation = () => {
  const toast = useToast();
  const [convenio, setConvenio] = useState('');
  const [valorParcela, setValorParcela] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [loanLimitSimulation, setLoanLimitSimulation] = useState(null);
  const { getLoanLimitSimulation, loading } = useLoanLimitSimulation();

  const cleanFields = () => {
    setConvenio('');
    setValorParcela('');
    setDataNascimento('');
  };

  const getLoanLimitSimulations = async (event) => {
    event.preventDefault();
    setLoanLimitSimulation(null);

    const payload = { convenio, valorParcela, dataNascimento };
    const result = await getLoanLimitSimulation(payload);

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
      setLoanLimitSimulation(result);
      cleanFields();
    }
  }

  const renderingForm = () => {
    return (
      <FormControl isRequired mx="auto" p="15px" w="650px" border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
        <SimpleGrid columns={2} spacing={2}>
          <Box w="300px">
            <FormLabel htmlFor="convenio" mt="10px">Convênio:</FormLabel>
            <Select
              autoFocus
              id="convenio"
              name="convenio"
              value={ convenio }
              onChange={ ({ target }) => setConvenio(target.value) }
            >
              <option value="">Selecione...</option>
              <option value={ 4195 }>4195 - GOV SP - SEFAZ</option>
              <option value={ 4193 }>4193 - GOV SP - POLÍCIA MILITAR</option>
              <option value={ 4194 }>4194 - GOV SP - SPPREV</option>
              <option value={ 128 }>128 - PREF SÃO PAULO</option>
            </Select>

            <FormLabel htmlFor="valorParcela" mt="10px">Valor Parcela:</FormLabel>
            <Input
              id="valorParcela"
              type="text"
              name="valorParcela"
              autoComplete="off"
              value={ valorParcela }
              onChange={ ({ target }) => setValorParcela(formatCurrencyMask((target.value))) }
            />
          </Box>
          <Box w="300px">
            <FormLabel htmlFor="dataNascimento" mt="10px">Data de Nascimento:</FormLabel>
            <Input
              id="dataNascimento"
              type="date"
              name="dataNascimento"
              autoComplete="off"
              value={ dataNascimento }
              onChange={ ({ target }) => setDataNascimento(target.value) }
            />
          </Box>
        </SimpleGrid>

        <Box mt="4">
          <Button colorScheme='blue' onClick={ (event) => getLoanLimitSimulations(event) }>
            Consultar
            { loading && <Loading /> }
          </Button>
        </Box>
      </FormControl>
    );
  }

  const renderingLoanLimitSimulation = () => {
    if (!loanLimitSimulation) {
      return (
        <Box my="4" mx="auto" p="15px" w="650px" border="1px" borderRadius="10px" borderColor="gray.200" align="center">
          Dados inexistentes
        </Box>
      );
    }
    
    return(
      <TableContainer my="25px" mx="auto" p="15px" w="650px" border="1px" borderRadius="10px" borderColor="gray.200">
        <Table variant='striped'>
          <Tbody>
            <Tr>
              <Td>Taxa:</Td>
              <Td>{ formatCurrency(loanLimitSimulation.rate) } %</Td>
            </Tr>
            <Tr>
              <Td>Parcelas:</Td>
              <Td>{ loanLimitSimulation.installment }</Td>
            </Tr>
            <Tr>
              <Td>Valor Liberado:</Td>
              <Td>{ formatCurrency(loanLimitSimulation.releasedValue) }</Td>
            </Tr>
            <Tr>
              <Td>Valor da Parcela:</Td>
              <Td>{ formatCurrency(loanLimitSimulation.installmentValue) }</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      <Header />
      <PageTitle title=" Consutar Limite de Empréstimo" />
      { renderingForm() }
      <ShowProposalLink color="orange" data={ loanLimitSimulation } link="#" />
      { renderingLoanLimitSimulation() }
    </>
  );
}
