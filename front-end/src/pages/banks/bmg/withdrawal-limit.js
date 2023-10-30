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
import { useWithdrawalLimit } from '../../../hooks/banks/bmg/useWithdrawalLimit';
import { ShowProposalLink } from '../../../components/bmg/proposal-card/ShowProposalLink';

export const WithdrawalLimit = () => {
  const toast = useToast();
  const [convenio, setConvenio] = useState('');
  const [valorMargem, setValorMargem] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [withdrawalLimit, setWithdrawalLimit] = useState(null);
  const { getWithdrawalLimit, loading } = useWithdrawalLimit();

  const cleanFields = () => {
    setConvenio('');
    setValorMargem('');
    setDataNascimento('');
  };

  const getWithdrawalLimits = async (event) => {
    event.preventDefault();
    setWithdrawalLimit(null);

    const payload = { convenio, valorMargem, dataNascimento };
    const result = await getWithdrawalLimit(payload);

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
      setWithdrawalLimit(result);
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

            <FormLabel htmlFor="valorMargem" mt="10px">Valor Margem:</FormLabel>
            <Input
              id="valorMargem"
              type="text"
              name="valorMargem"
              autoComplete="off"
              value={ valorMargem }
              onChange={ ({ target }) => setValorMargem(formatCurrencyMask((target.value))) }
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
          <Button colorScheme='blue' onClick={ (event) => getWithdrawalLimits(event) }>
            Consultar
            { loading && <Loading /> }
          </Button>
        </Box>
      </FormControl>
    );
  }

  const renderingWithdrawalLimit = () => {
    if (!withdrawalLimit) {
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
              <Td>Taxa de Juros Anual:</Td>
              <Td>{ formatCurrency(withdrawalLimit.taxaJurosAnual) } %</Td>
            </Tr>
            <Tr>
              <Td>Taxa de Juros Mensal:</Td>
              <Td>{ formatCurrency(withdrawalLimit.taxaJurosMensal) } %</Td>
            </Tr>
            <Tr>
              <Td>Valor Cet Anual:</Td>
              <Td>{ formatCurrency(withdrawalLimit.valorCetAnual) } %</Td>
            </Tr>
            <Tr>
              <Td>Valor Cet Mensal:</Td>
              <Td>{ formatCurrency(withdrawalLimit.valorCetMensal) } %</Td>
            </Tr>
            <Tr>
              <Td>Limite do Cartao:</Td>
              <Td>R$ { formatCurrency(withdrawalLimit.limiteCartao) }</Td>
            </Tr>
            <Tr>
              <Td>Valor da Margem:</Td>
              <Td>R$ { formatCurrency(withdrawalLimit.valorMargem) }</Td>
            </Tr>
            <Tr>
              <Td>Valor de Saque Máximo:</Td>
              <Td>R$ { formatCurrency(withdrawalLimit.valorSaqueMaximo) }</Td>
            </Tr>
            <Tr>
              <Td>Valor de Saque Mínimo:</Td>
              <Td>R$ { formatCurrency(withdrawalLimit.valorSaqueMinimo) }</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      <Header />
      <PageTitle title=" Consutar Limite de Cartão" />
      { renderingForm() }
      <ShowProposalLink color="orange" data={ withdrawalLimit } link="https://app.pipefy.com/organizations/277137/portals?pipeId=303474268&pipeUuid=df0aaf83-da2a-46fa-9e92-1d1e94022b9b" />
      { renderingWithdrawalLimit() }
    </>
  );
}
