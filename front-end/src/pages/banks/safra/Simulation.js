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
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { Header } from '../../../components/header/Header';
import { Loading } from '../../../components/loading/Loading';
import { Private } from '../../../components/private/Private';
import { PageTitle } from '../../../components/pageTitle/PageTitle';
import { useSimulation } from '../../../hooks/banks/safra/useSimulation';
import { AlertMessage } from '../../../components/alert-error-message/AlertMessage';
import { formatCurrency, formatCpf, formatCurrencyMask } from '../../../helpers/formatter';
import { SimulationSettings } from '../../../components/safra/simulation/SimulationSettings';

export const Simulation = () => {
  const [idConvenio, setIdConvenio] = useState('');
  const [idUF, setIdUF] = useState('SP');
  const [cpf, setCpf] = useState('092.585.656-81');
  const [matricula, setMatricula] = useState('123456');
  const [comSeguro, SetComSeguro] = useState(false);
  const [valorPrincipal, setValorPrincipal] = useState('');
  const [valorParcela, setValorParcela] = useState('');
  const [prazo, setPrazo] = useState(96);
  const [dataAdmissao, setDataAdmissao] = useState('');
  const [valorRenda, setValorRenda] = useState('1.000.000,00');
  const [valorDescontos, setValorDescontos] = useState('');
  const [simulation, setSimulation] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const { getSimulation, loading } = useSimulation();

  const formatedCpf = (cpfNumber) => {
    if (cpfNumber.length <= 14) {
      setCpf(formatCpf(cpfNumber));
    }
  }
  
  const cleanFields = () => {
    setIdConvenio('');
    setValorPrincipal('');
    setValorParcela('');
  };

  const getSimulations = async () => {
    setErrorMessage(null);
    setSimulation([]);

    const payload = { idConvenio, idUF, cpf, matricula, comSeguro, valorPrincipal, valorParcela, prazo, dataAdmissao, valorRenda, valorDescontos };
    const result = await getSimulation(payload);
    
    if (result.errorMessage) {
      setErrorMessage(result.errorMessage);
    } else {
      setSimulation(result);
      cleanFields();
    }
  }

  const renderingSimulation = () => {
    if (errorMessage) {
      return <AlertMessage status="error" alertTitle="Error:" message={ errorMessage } />
    }
    
    if (simulation.length <= 0) {
      return (
        <Box my="4" mx="auto" p="15px" w="950px" border="1px" borderRadius="10px" borderColor="gray.200" align="center">
          Dados inexistentes
        </Box>
      );
    } else {
      return (
        <TableContainer my="4" mx="auto" p="15px" w="950px" border="1px" borderRadius="10px" borderColor="gray.200" align="center">
          <Table variant='striped' colorScheme='gray'>
            <Thead>
              <Tr>
                <Th>Tabela de Juros</Th>
                <Th>Prazo</Th>
                <Th>Valor da Parcela</Th>
                <Th>Valor Principal</Th>
              </Tr>
            </Thead>
            <Tbody>
            { simulation.map(({ id, dsTabelaJuros, prazo, valorParcela, valorPrincipal }) => (
              <Tr key={ id }>
                <Td>{ dsTabelaJuros }</Td>
                <Td>{ prazo }</Td>
                <Td>{ formatCurrency(valorParcela) }</Td>
                <Td>{ formatCurrency(valorPrincipal) }</Td>
              </Tr>))
            }
            </Tbody>
          </Table>
        </TableContainer>
      );
    }
  }

  return (
    <>
      <Header />
      <PageTitle title="Simulação Safra" />
      
      <Private>
        <SimulationSettings name="simulationSettings" />
      </Private>
      
      <FormControl mx="auto" p="15px" w="950px" border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
        <SimpleGrid columns={3} spacing={2}>
          <Box w="290px">
            <FormLabel htmlFor="idConvenio">Convênio:</FormLabel>
            <Select
              autoFocus
              id="idConvenio"
              name="idConvenio"
              value={idConvenio}
              onChange={({ target }) => setIdConvenio(target.value)}
            >
              <option value="">Selecione...</option>
              <option value={ 50008 }>50008 - GOV SP - SEFAZ</option>
              <option value={ 50009 }>50009 - GOV SP - POLÍCIA MILITAR</option>
              <option value={ 50010 }>50010 - GOV SP - SPPREV</option>
              <option value={ 10110 }>10110 - PREF SÃO PAULO</option>
            </Select>
          </Box>
          <Box w="290px">
            <FormLabel htmlFor="idUF">Unidade Federativa:</FormLabel>
            <Input
              id="idUF"
              type="text"
              name="idUF"
              autoComplete="off"
              value={ idUF }
              disabled={ true }
              onChange={({ target }) => setIdUF(target.value)}
            />
          </Box>
          <Box w="290px">
            <FormLabel htmlFor="cpf">CPF:</FormLabel>
            <Input
              id="cpf"
              type="text"
              name="cpf"
              autoComplete="off"
              value={ cpf }
              disabled={ true }
              onChange={({ target }) => formatedCpf(target.value)}
            />
          </Box>
          <Box w="290px">
            <FormLabel htmlFor="matricula">Matricula:</FormLabel>
            <Input
              id="matricula"
              type="text"
              name="matricula"
              autoComplete="off"
              value={ matricula }
              disabled={ true }
              onChange={({ target }) => setMatricula(target.value)}
            />
          </Box>
          <Box w="290px">
            <FormLabel htmlFor="comSeguro">Seguro:</FormLabel>
            <Input
              id="comSeguro"
              type="text"
              name="comSeguro"
              value={ comSeguro }
              disabled={ true }
              onChange={({ target }) => SetComSeguro(target.value)}
            />
          </Box>
          <Box w="290px">
            <FormLabel htmlFor="valorPrincipal">Valor Principal:</FormLabel>
            <Input
              id="valorPrincipal"
              type="text"
              name="valorPrincipal"
              autoComplete="off"
              value={ valorPrincipal }
              onChange={({ target }) => setValorPrincipal(formatCurrencyMask((target.value)))}
            />
          </Box>
          <Box w="290px">
            <FormLabel htmlFor="valorParcela">Valor da Parcela:</FormLabel>
            <Input
              id="valorParcela"
              type="text"
              name="valorParcela"
              autoComplete="off"
              value={ valorParcela }
              onChange={({ target }) => setValorParcela(formatCurrencyMask((target.value)))}
            />
          </Box>
          <Box w="290px">
            <FormLabel htmlFor="prazo">Prazo:</FormLabel>
            <Input
              id="prazo"
              type="number"
              name="prazo"
              autoComplete="off"
              value={ prazo }
              disabled={ true }
              onChange={({ target }) => setPrazo(target.value)}
            />
          </Box>
          <Box w="290px">
            <FormLabel htmlFor="dataAdmissao">Data de Admissão:</FormLabel>
            <Input
              id="dataAdmissao"
              type="date"
              name="dataAdmissao"
              autoComplete="off"
              value={ dataAdmissao }
              disabled={ true }
              onChange={({ target }) => setDataAdmissao(target.value)}
            />
          </Box>
          <Box w="290px">
            <FormLabel htmlFor="valorRenda">Valor de Renda:</FormLabel>
            <Input
              id="valorRenda"
              type="text"
              name="valorRenda"
              autoComplete="off"
              value={ valorRenda }
              disabled={ true }
              onChange={({ target }) => setValorRenda(formatCurrencyMask((target.value)))}
            />
          </Box>
          <Box w="290px">
            <FormLabel htmlFor="valorDescontos">Valor de Descontos:</FormLabel>
            <Input
              id="valorDescontos"
              type="text"
              name="valorDescontos"
              autoComplete="off"
              value={ valorDescontos }
              disabled={ true }
              onChange={({ target }) => setValorDescontos(formatCurrencyMask((target.value)))}
            />
          </Box>
        </SimpleGrid>
        <Button mt="4" colorScheme='blue' onClick={ (event) => getSimulations(event) }>
          Simular
          { loading && <Loading /> }
        </Button>
      </FormControl>
      { renderingSimulation() }
    </>
  );
}
