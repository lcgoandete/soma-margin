import { useState } from 'react';
import { Box, Center, FormLabel, Select, Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react';

import { Header } from '../../components/header/Header';
import { CpfForm } from '../../components/cpf-form/CpfForm';
import { PageTitle } from '../../components/pageTitle/PageTitle';
import { useConsignedPortal } from '../../hooks/useConsignedPortal';
import { AlertErrorMessage } from '../../components/alert-error-message/AlertErrorMessage';

export const Margin = () => {
  const [queryType, setQueryType] = useState('');
  const { loading, getMargin } = useConsignedPortal();
  const [errorMessage, setErrorMessage] = useState('');
  const [margin, setMargin] = useState([]);

  const onClickCpf = async (response) => {
    if(!queryType) {
      setQueryType('');
      setErrorMessage('Favor selecionar o tipo de consulta');
      return;
    }

    const { cpf, message } = response;
    if (message) {
      setErrorMessage(message);
    } else {
      const result = await getMargin(queryType, cpf);
    
      if (result.errorMessage) {
        setErrorMessage(result.errorMessage);
      } else {
        setMargin(result);
        setQueryType('');
      }
    }
  }

  return (
    <>
      <Header />
      <PageTitle title="Pesquisar Margem" />
      <CpfForm loading={ loading } onClickCpf={ onClickCpf } 
        queryTypeElement={
          <Box mb='2'>
            <FormLabel htmlFor="queryType">Tipo de Consulta:</FormLabel>
            <Select
              autoFocus
              id="queryType"
              name="queryType"
              value={queryType}
              onChange={({ target }) => setQueryType(target.value)}
            >
              <option value="">Selecione...</option>
              <option value="margins">Estado de São Paulo</option>
              <option value="municipio-margins">Município de São Paulo</option>
            </Select>
          </Box>
        }
      />
      <Center>
        { errorMessage
          ? <AlertErrorMessage errorMessage={ errorMessage } />
          : margin?.map((client, index) => (
          <Box marginY='7' key={index}>
            <Box padding='3' border='1px' borderColor='gray.200' borderTopRadius="10px">
              <Text fontSize='19' as='b'>Dados de Identificação</Text>
            </Box>
            <TableContainer>
              <Table variant='simple'>
                <Tbody>
                  <Tr>
                    <Td>CPF - {client.dadosIdentificacao.cpf}</Td>
                    <Td>Nome - {client.dadosIdentificacao.nome}</Td>
                  </Tr>
                  <Tr>
                    <Td>Órgão - {client.dadosIdentificacao.orgao}</Td>
                    <Td>Identificação - {client.dadosIdentificacao.identificacao}</Td>
                  </Tr>
                  <Tr>
                    <Td>Mês de Referência da Margem - {client.dadosIdentificacao.mesReferencia}</Td>
                    <Td>Data de Processamento da Próxima Folha - {client.dadosIdentificacao.dataProcessamento}</Td>
                  </Tr>
                </Tbody>
              </Table>

              <Box mt='5' padding='3' border='1px' borderColor='gray.200' borderTopRadius="10px">
                <Text fontSize='19' as='b'>Margem Bruta</Text>
              </Box>
              <Box padding='3' border='1px' borderColor='gray.200'>
                <Text fontSize='19' as='b'>{client.margemBruta.provimento}</Text>
              </Box>
              <Table variant='simple'>
                <Tbody>
                  <Tr>
                    <Td>Produto</Td>
                    <Td>Valor (R$)</Td>
                  </Tr>
                  <Tr>
                    <Td>Consignações Facultativas</Td>
                    <Td>{client.margemBruta.consignacoesFacultativas}</Td>
                  </Tr>
                  <Tr>
                    <Td>Cartão de Crédito</Td>
                    <Td>{client.margemBruta.cartaoCredito}</Td>
                  </Tr>
                  <Tr>
                    <Td>Cartão de Benefício</Td>
                    <Td>{client.margemBruta.cartaoBenefico}</Td>
                  </Tr>  
                </Tbody>
              </Table>

              <Box padding='3' border='1px' borderColor='gray.200'>
                <Text fontSize='19' as='b'>Dados Funcionais</Text>
              </Box>
              <Table variant='simple'>
                <Tbody>
                  <Tr>
                    <Td>Lotação - {client.margemBruta.dadosFuncionais.lotacao}</Td>
                    <Td>Cargo - {client.margemBruta.dadosFuncionais.cargo}</Td>
                  </Tr>
                  <Tr>
                    <Td>Data de Nomeação/Admissão - {client.margemBruta.dadosFuncionais.dataAdmissao}</Td>
                    <Td>Tipo de Vínculo - {client.margemBruta.dadosFuncionais.tipoVinculo}</Td>
                  </Tr>
                  <Tr border='none'>
                    <Td>Data Fim do Contrato - {client.margemBruta.dadosFuncionais.dataFinalContrato}</Td>
                  </Tr>
                </Tbody>
              </Table>

              <Box mt='7' padding='3' border='1px' borderColor='gray.200' borderTopRadius="10px">
                <Text fontSize='19' as='b'>Margem Disponível - Total</Text>
              </Box>
              <Box padding='3' border='1px' borderColor='gray.200'>
                <Text fontSize='19' as='b'>{client.margemBruta.provimento}</Text>
              </Box>
              <Table variant='simple'>
                <Tbody>
                  <Tr>
                    <Td>Produto</Td>
                    <Td>Valor (R$)</Td>
                  </Tr>
                  <Tr>
                    <Td>Consignações Facultativas</Td>
                    <Td>{client.margemDisponivel.consignacoesFacultativas}</Td>
                  </Tr>
                  <Tr>
                    <Td>Cartão de Crédito</Td>
                    <Td>{client.margemDisponivel.cartaoCredito}</Td>
                  </Tr>
                  <Tr>
                    <Td>Cartão de Benefício</Td>
                    <Td>{client.margemDisponivel.cartaoBenefico}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Center>
    </>
  );
}
