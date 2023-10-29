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
import { ShowProposalLink } from '../../../components/bmg/proposal-card/ShowProposalLink';
import { useWithdrawalLimitBenefitCard } from '../../../hooks/banks/bmg/useWithdrawalLimitBenefitCard';

export const WithdrawalLimitBenefitCard = () => {
  const toast = useToast();
  const [convenio, setConvenio] = useState('');
  const [valorMargem, setValorMargem] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [withdrawalLimitBenefitCard, setWithdrawalLimitBenefitCard] = useState(null);
  const { getWithdrawalLimitBenefitCard, loading } = useWithdrawalLimitBenefitCard();

  const cleanFields = () => {
    setConvenio('');
    setValorMargem('');
    setDataNascimento('');
  };

  const getWithdrawalLimitsBenefitCard = async (event) => {
    event.preventDefault();
    setWithdrawalLimitBenefitCard(null);

    const payload = { convenio, valorMargem, dataNascimento };
    const result = await getWithdrawalLimitBenefitCard(payload);

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
      setWithdrawalLimitBenefitCard(result);
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
              <option value={ 4267 }>4267 - GOV SP - SEFAZ</option>
              <option value={ 4279 }>4193 - GOV SP - POLÍCIA MILITAR</option>
              <option value={ 4278 }>4194 - GOV SP - SPPREV</option>
              <option value={ 4281 }>4281 - PREF SÃO PAULO</option>
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
          <Button colorScheme='blue' onClick={ (event) => getWithdrawalLimitsBenefitCard(event) }>
            Consultar
            { loading && <Loading /> }
          </Button>
        </Box>
      </FormControl>
    );
  }

  const renderingWithdrawalLimit = () => {
    if (!withdrawalLimitBenefitCard) {
      return (
        <Box my="4" mx="auto" p="15px" w="650px" border="1px" borderRadius="10px" borderColor="gray.200" align="center">
          Dados inexistentes
        </Box>
      );
    }
    
    return(
      <TableContainer my="4" mx="auto" p="15px" w="650px" border="1px" borderRadius="10px" borderColor="gray.200">
        <Table variant='striped'>
          <Tbody>
            <Tr>
              <Td>Taxa de Juros Anual:</Td>
              <Td>{ formatCurrency(withdrawalLimitBenefitCard.taxaJurosAnual) } %</Td>
            </Tr>
            <Tr>
              <Td>Taxa de Juros Mensal:</Td>
              <Td>{ formatCurrency(withdrawalLimitBenefitCard.taxaJurosMensal) } %</Td>
            </Tr>
            <Tr>
              <Td>Valor Cet Anual:</Td>
              <Td>{ formatCurrency(withdrawalLimitBenefitCard.valorCetAnual) } %</Td>
            </Tr>
            <Tr>
              <Td>Valor Cet Mensal:</Td>
              <Td>{ formatCurrency(withdrawalLimitBenefitCard.valorCetMensal) } %</Td>
            </Tr>
            <Tr>
              <Td>Limite do Cartao:</Td>
              <Td>R$ { formatCurrency(withdrawalLimitBenefitCard.limiteCartao) }</Td>
            </Tr>
            <Tr>
              <Td>Valor da Margem:</Td>
              <Td>R$ { formatCurrency(withdrawalLimitBenefitCard.valorMargem) }</Td>
            </Tr>
            <Tr>
              <Td>Valor de Saque Máximo:</Td>
              <Td>R$ { formatCurrency(withdrawalLimitBenefitCard.valorSaqueMaximo) }</Td>
            </Tr>
            <Tr>
              <Td>Valor de Saque Mínimo:</Td>
              <Td>R$ { formatCurrency(withdrawalLimitBenefitCard.valorSaqueMinimo) }</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      <Header />
      <PageTitle title=" Consutar Limite de Cartão Benefício" />
      { renderingForm() }
      <ShowProposalLink color="purple" data={ withdrawalLimitBenefitCard } link="https://app.pipefy.com/public/form/ZsKJpVTu" />
      { renderingWithdrawalLimit() }
    </>
  );
}
