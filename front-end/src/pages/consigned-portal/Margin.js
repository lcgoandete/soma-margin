import { useState } from 'react';
import { Box, FormLabel, Select, Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react';

import { Header } from '../../components/header/Header';
import { CpfForm } from '../../components/cpf-form/CpfForm';
import { PageTitle } from '../../components/pageTitle/PageTitle';
import { useConsignedPortal } from '../../hooks/useConsignedPortal';
import { AlertMessage } from '../../components/alert-error-message/AlertMessage';

export const Margin = () => {
  const [queryType, setQueryType] = useState('');
  const { loading, getMargin } = useConsignedPortal();
  const [errorMessage, setErrorMessage] = useState(null);
  const [margin, setMargin] = useState([]);

  const onClickCpf = async (response) => {
    if(!queryType) {
      setErrorMessage('Favor selecionar o tipo de consulta');
      return;
    }
    
    setErrorMessage(null);
    setMargin(null);
    const { cpf, message } = response;

    if (message) {
      setErrorMessage(message);
    } else {
      const result = await getMargin(queryType, cpf);
    
      if (result.errorMessage) {
        setQueryType('');
        setErrorMessage(result.errorMessage);
      } else {
        setQueryType('');
        setMargin(result.provisions);
      }
    }
  }

  const renderingTable = () => {
    if (errorMessage) return <AlertMessage status="error" alertTitle="Error:" message={ errorMessage } />

    return (
      <Box my="25px" mx="auto" p="15px" w="850px" border="1px" borderRadius="10px" borderColor="gray.200">
        { margin?.map((client, index) => (
          <Box marginY='7' key={index}>
            <Box padding='3' border='1px' borderColor='gray.200' borderTopRadius="10px">
              <Text fontSize='19' as='b'>Dados de Identificação</Text>
            </Box>
            <TableContainer>
              <Table variant='simple'>
                <Tbody>
                  <Tr>
                    <Td>CPF - {client.identificationInfo?.cpf}</Td>
                    <Td>Nome - {client.identificationInfo?.name}</Td>
                  </Tr>
                  <Tr>
                    <Td>Órgão - {client.identificationInfo?.agency}</Td>
                    <Td>Identificação - {client.identificationInfo?.identification}</Td>
                  </Tr>
                  <Tr>
                    <Td>Mês de Referência da Margem - {client.identificationInfo?.referenceMonth}</Td>
                    <Td>Data de Processamento da Próxima Folha - {client.identificationInfo?.processingDate}</Td>
                  </Tr>
                </Tbody>
              </Table>

              <Box mt='5' padding='3' border='1px' borderColor='gray.200' borderTopRadius="10px">
                <Text fontSize='19' as='b'>Margem Bruta</Text>
              </Box>
              <Box padding='3' border='1px' borderColor='gray.200'>
                <Text fontSize='19' as='b'>{client.grossMargin?.provision}</Text>
              </Box>
              <Table variant='simple'>
                <Tbody>
                  <Tr>
                    <Td>Produto</Td>
                    <Td>Valor (R$)</Td>
                  </Tr>
                  <Tr>
                    <Td>Consignações Facultativas</Td>
                    <Td>{client.grossMargin?.optionalConsignments}</Td>
                  </Tr>
                  <Tr>
                    <Td>Cartão de Crédito</Td>
                    <Td>{client.grossMargin?.creditCard}</Td>
                  </Tr>
                  <Tr>
                    <Td>Cartão de Benefício</Td>
                    <Td>{client.grossMargin?.benefitCard}</Td>
                  </Tr>  
                </Tbody>
              </Table>

              { client.grossMargin?.functionalData ? (
                  <Box>
                    <Box padding='3' border='1px' borderColor='gray.200'>
                      <Text fontSize='19' as='b'>Dados Funcionais</Text>
                    </Box>
                    <Table variant='simple'>
                      <Tbody>
                        <Tr>
                          <Td>Lotação - {client.grossMargin?.functionalData.staffAllocation}</Td>
                          <Td>Cargo - {client.grossMargin?.functionalData.role}</Td>
                        </Tr>
                        <Tr>
                          <Td>Data de Nomeação/Admissão - {client.grossMargin?.functionalData.admissionDate}</Td>
                          <Td>Tipo de Vínculo - {client.grossMargin?.functionalData.typeOfBond}</Td>
                        </Tr>
                        <Tr border='none'>
                          <Td>Data Fim do Contrato - {client.grossMargin?.functionalData.endDateContract}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Box>
                ) : null
              }

              <Box mt='7' padding='3' border='1px' borderColor='gray.200' borderTopRadius="10px">
                <Text fontSize='19' as='b'>Margem Disponível - Total</Text>
              </Box>
              <Box padding='3' border='1px' borderColor='gray.200'>
                <Text fontSize='19' as='b'>{client.availableMargin?.provision}</Text>
              </Box>
              <Table variant='simple'>
                <Tbody>
                  <Tr>
                    <Td>Produto</Td>
                    <Td>Valor (R$)</Td>
                  </Tr>
                  <Tr>
                    <Td>Consignações Facultativas</Td>
                    <Td>{client.availableMargin?.optionalConsignments}</Td>
                  </Tr>
                  <Tr>
                    <Td>Cartão de Crédito</Td>
                    <Td>{client.availableMargin?.creditCard}</Td>
                  </Tr>
                  <Tr>
                    <Td>Cartão de Benefício</Td>
                    <Td>{client.availableMargin?.benefitCard}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Box>
    );
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
              <option value="stategovernment">Estado de São Paulo</option>
              <option value="cityhall">Município de São Paulo</option>
            </Select>
          </Box>
        }
      />
      { renderingTable() }
    </>
  );
}
