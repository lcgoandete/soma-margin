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
import { useLoanLimitSimulation } from '../../../hooks/banks/master/useLoanLimitSimulation';
import { ShowProposalLink } from '../../../components/banks/ShowProposalLink';

export const LoanLimitSimulationCredcesta = () => {
  const toast = useToast();
  const [agreementId, setAgreementId] = useState('');
  const [marginAmount, setMarginAmount] = useState('');
  const [loanLimitSimulation, setLoanLimitSimulation] = useState(null);
  const { getLoanLimitSimulation, loading } = useLoanLimitSimulation();

  const cleanFields = () => {
    setAgreementId('');
    setMarginAmount('');
  };

  const getLoanLimitSimulations = async (event) => {
    event.preventDefault();
    setLoanLimitSimulation(null);

    const payload = { agreementId, marginAmount };
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
      <FormControl mx="auto" p="15px" w="385px" border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
        <SimpleGrid>
          <Box w="354px">
            <FormLabel htmlFor="agreementId" mt="10px">Convênio:</FormLabel>
            <Select
              autoFocus
              id="agreementId"
              name="agreementId"
              value={ agreementId }
              onChange={ ({ target }) => setAgreementId(target.value) }
            >
              <option value="">Selecione...</option>
              <option value={ 145 }>145 - SPPREV</option>
              <option value={ 146 }>146 - POLÍCIA MILITAR</option>
              <option value={ 144 }>144 - SEFAZ</option>
              <option value={ 179 }>179 - SEFAZ 17 COMISSIONADO</option>
              <option value={ 164 }>164 - PREF SÃO PAULO</option>
              <option value={ 165 }>165 - IPREM</option>
            </Select>

            <FormLabel htmlFor="marginAmount" mt="10px">Valor da Margem:</FormLabel>
            <Input
              id="marginAmount"
              type="text"
              name="marginAmount"
              autoComplete="off"
              value={ marginAmount }
              onChange={ ({ target }) => setMarginAmount(formatCurrencyMask((target.value))) }
            />
            <FormLabel>Aviso campo deve ser informado margem total</FormLabel>
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
        <Box my="4" mx="auto" p="15px" w="390px" border="1px" borderRadius="10px" borderColor="gray.200" align="center">
          Dados inexistentes
        </Box>
      );
    }
    
    return(
      <TableContainer my="25px" mx="auto" p="15px" w="500px" border="1px" borderRadius="10px" borderColor="gray.200">
        <Table variant='striped'>
          <Tbody>
            <Tr>
              <Td>Valor Saque:</Td>
              <Td>{ formatCurrency(loanLimitSimulation.withdrawalAmount) } </Td>
            </Tr>
            <Tr>
              <Td>Valor Parcela Saque:</Td>
              <Td>{ formatCurrency(loanLimitSimulation.withdrawalInstallmentAmount) }</Td>
            </Tr>
            <Tr>
              <Td>Parcelas:</Td>
              <Td>{ loanLimitSimulation.InstallmentAmount }</Td>
            </Tr>
            <Tr>
              <Td>Valor Compra:</Td>
              <Td>{ formatCurrency(loanLimitSimulation.purchasePrice) }</Td>
            </Tr>
            <Tr>
              <Td>Valor Parcela Compra:</Td>
              <Td>{ formatCurrency(loanLimitSimulation.purchaseInstallmentAmount) }</Td>
            </Tr>
            <Tr>
              <Td>Limite Total Cartão:</Td>
              <Td>{ formatCurrency(loanLimitSimulation.totalCardLimit) }</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      <Header />
      <PageTitle title=" Consutar Limite Credcesta" />
      { renderingForm() }
      <ShowProposalLink color="orange" data={ loanLimitSimulation } link="#" />
      { renderingLoanLimitSimulation() }
    </>
  );
}
