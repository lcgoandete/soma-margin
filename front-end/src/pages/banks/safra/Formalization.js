import { useState } from 'react';
import { Box, Center, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { Header } from '../../../components/header/Header';
import { CpfForm } from '../../../components/cpf-form/CpfForm';
import { useFormalization } from '../../../hooks/useFormalization';
import { PageTitle } from '../../../components/pageTitle/PageTitle';
import { AlertErrorMessage } from '../../../components/alert-error-message/AlertErrorMessage';

const formalizationDefault = {
  cpfCustomer: '',
  nameCustomer: '',
  agreement: '',
  phaseDescription: '',
  link: '',
};

export const Formalization = () => {
  const [formalization, setFormalization] = useState(formalizationDefault);
  const [errorMessage, setErrorMessage] = useState('');
  const { loading, getFormalization } = useFormalization();

   const renderingTable = () => {
    if (errorMessage) {
      return (
        <div className="margins">
          <AlertErrorMessage errorMessage={ errorMessage } />
        </div>
      );
    }

    return (
      <Center>
        <Box minWidth="500px" marginY='7'>
          <Box padding='2' border='1px' borderColor='gray.200' borderTopRadius="10px">
            CPF consultado: { formalization.cpfCustomer }
          </Box>
          <Box padding='2' border='1px' borderColor='gray.200'>
            Nome: { formalization.nameCustomer }
          </Box>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Contrato</Th>
                  <Th>Fase</Th>
                  <Th>Link</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{ formalization.agreement }</Td>
                  <Td>{ formalization.phaseDescription }</Td>
                  <Td>{ formalization.link }</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Center>
    );
  }

  const onClickCpf = async (response) => {
    const { cpf, message } = response;
    
    if (message) {
      setErrorMessage(message);
    } else {
      const result = await getFormalization(cpf);

      if (result.errorMessage) {
        setErrorMessage(result.errorMessage);
      } else {
        setFormalization(result);
      }
    }
  }

  return (
    <>
      <Header />
      <PageTitle title="Formalização Safra" />
      <CpfForm loading={ loading } onClickCpf={ onClickCpf } />
      { renderingTable() }
    </>
  );
}
