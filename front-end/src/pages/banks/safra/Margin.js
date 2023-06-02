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

import { formatCpf } from '../../../helpers/formatter';
import { Header } from '../../../components/header/Header';
import { formatDateTime } from '../../../helpers/formatter';
import { Loading } from '../../../components/loading/Loading';
import { useMargin } from '../../../hooks/banks/safra/useMargin';
import { PageTitle } from '../../../components/pageTitle/PageTitle';

import convenioList from './convenioList.json';

const Margin = () => {
  const toast = useToast();
  const [convenio, setConvenio] = useState('');
  const [cpf, setCpf] = useState('');
  const [idProduto, setIdProduto] = useState('');
  const [matricula, setMatricula] = useState('');
  const [idMargem, setIdMargem] = useState('');
  const [nomeArquivoContraCheque, setNomeArquivoContraCheque] = useState('');
  const [contraCheque, setContraCheque] = useState('');
  const [margin, setMargin] = useState(null);
  const { getMargin, loading } = useMargin();

  const formatedCpf = (cpfNumber) => {
    if (cpfNumber.length <= 14) {
      setCpf(formatCpf(cpfNumber));
    }
  }

  const cleanFields = () => {
    setConvenio('');
    setCpf('');
    setIdProduto('');
    setMatricula('');
    setIdMargem('');
    setNomeArquivoContraCheque('');
    setContraCheque('');
  };

  const getMargins = async (event) => {
    event.preventDefault();
    setMargin(null);

    const payload = {
      convenio, cpf, idProduto, matricula, identificadorMargem: idMargem, nomeArquivoContraCheque, contraCheque
    };
    const result = await getMargin(payload);

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
      setMargin(result);
      cleanFields();
    }
  }

  const renderingMargin = () => {
    if (!margin) {
      return (
        <Box my="4" mx="auto" p="15px" w="650px" border="1px" borderRadius="10px" borderColor="gray.200" align="center">
          Dados inexistentes
        </Box>
      );
    }

    return (
      <TableContainer my="25px" mx="auto" p="15px" w="650px" border="1px" borderRadius="10px" borderColor="gray.200">
        <Table variant='striped'>
          <Tbody>
            <Tr>
              <Td>CPF:</Td>
              <Td>{ margin.cpf }</Td>
            </Tr>
            <Tr>
              <Td>Margem:</Td>
              <Td>{ margin.margem }</Td>
            </Tr>
            <Tr>
              <Td>Lotação:</Td>
              <Td>{ margin.lotacao }</Td>
            </Tr>
            <Tr>
              <Td>Autorizada:</Td>
              <Td>{ margin.autorizada ? 'Sim' : 'Não' }</Td>
            </Tr>
            <Tr>
              <Td>Nome:</Td>
              <Td>{ margin.nome }</Td>
            </Tr>
            <Tr>
              <Td>Secretaria:</Td>
              <Td>{ margin.secretaria }</Td>
            </Tr>
            <Tr>
              <Td>Tipo de Servidor:</Td>
              <Td>{ margin.tipoServidor }</Td>
            </Tr>
            <Tr>
              <Td>Cargo:</Td>
              <Td>{ margin.cargo }</Td>
            </Tr>
            <Tr>
              <Td>Regime Jurídico:</Td>
              <Td>{ margin.regimeJuridico }</Td>
            </Tr>
            <Tr>
              <Td>Data de Admissão:</Td>
              <Td>{ formatDateTime(margin.dataAdmissao) }</Td>
            </Tr>
            <Tr>
              <Td>Uf:</Td>
              <Td>{ margin.uf }</Td>
            </Tr>
            <Tr>
              <Td>Renda:</Td>
              <Td>{ margin.renda }</Td>
            </Tr>
            <Tr>
              <Td>Menssagem de Erro:</Td>
              <Td>{ margin.mensagemErro }</Td>
            </Tr>
            <Tr>
              <Td>Data Hora Consulta:</Td>
              <Td>{ formatDateTime(margin.dataHoraConsulta) }</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );
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
              {
                convenioList.map(({id, title}) => (
                  <option key={id} value={id}>{title}</option>
                ))
              }
            </Select>

            <FormLabel htmlFor="cpf" mt="10px">CPF:</FormLabel>
            <Input
              id="cpf"
              type="text"
              name="cpf"
              autoComplete="off"
              value={ cpf }
              onChange={ ({ target }) => formatedCpf(target.value) }
            />
          </Box>

          <Box w="300px">
            <FormLabel htmlFor="idProduto" mt="10px">ID Produto:</FormLabel>
            <Input
              id="idProduto"
              type="number"
              name="idProduto"
              autoComplete="off"
              value={ idProduto }
              onChange={ ({ target }) => setIdProduto(target.value) }
            />

            <FormLabel htmlFor="matricula" mt="10px">Matrícula:</FormLabel>
            <Input
              id="matricula"
              type="text"
              name="matricula"
              autoComplete="off"
              value={ matricula }
              onChange={ ({ target }) => setMatricula(target.value) }
            />
          </Box>

          <Box w="300px">
            <FormLabel htmlFor="idMargem" mt="10px" requiredIndicator>ID Margem:</FormLabel>
            <Input
              id="idMargem"
              type="text"
              name="idMargem"
              autoComplete="off"
              value={ idMargem }
              onChange={ ({ target }) => setIdMargem(target.value) }
            />

            <FormLabel htmlFor="nomeArquivoContraCheque" mt="10px" requiredIndicator>Nome Arquivo Contra-cheque:</FormLabel>
            <Input
              id="nomeArquivoContraCheque"
              type="text"
              name="nomeArquivoContraCheque"
              autoComplete="off"
              disabled={ true }
              value={ nomeArquivoContraCheque }
              onChange={ ({ target }) => setNomeArquivoContraCheque(target.value) }
            />
          </Box>

          <Box w="300px">
            <FormLabel htmlFor="contraCheque" mt="10px" requiredIndicator>Contra-cheque:</FormLabel>
            <Input
              id="contraCheque"
              type="text"
              name="contraCheque"
              autoComplete="off"
              disabled={ true }
              value={ contraCheque }
              onChange={ ({ target }) => setContraCheque(target.value) }
            />

            <Button mt="10" w="300px" colorScheme='blue' onClick={ (event) => getMargins(event) }>
              Consultar
              { loading && <Loading /> }
            </Button>
          </Box>
        </SimpleGrid>
      </FormControl>
    );
  }

  return (
    <>
      <Header />
      <PageTitle title="Consultar Margem" />
      { renderingForm() }
      { renderingMargin() }
    </>
  );
}

export default Margin;
