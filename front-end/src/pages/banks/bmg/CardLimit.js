import { useState } from 'react';
import { Box, Center, Table, TableContainer, Tbody, Td, Th, Tr } from '@chakra-ui/react';

import { Header } from '../../../components/header/Header';
import { useCardLimit } from '../../../hooks/useCardLimit';
import { formatCurrency } from '../../../helpers/formatter';
import { CpfForm } from '../../../components/cpf-form/CpfForm';
import { PageTitle } from '../../../components/pageTitle/PageTitle';
import { AlertMessage } from '../../../components/alert-error-message/AlertMessage';

export const CardLimit = () => {
  const { loading, getCardLimit } = useCardLimit();
  const [errorMessage, setErrorMessage] = useState(null);
  const [cardLimit, setCardLimit] = useState(null);

  const onClickCpf = async (response) => {
    setErrorMessage(null);
    setCardLimit(null);
    const { cpf, message } = response;

    if (message) {
      setErrorMessage(message);
    } else {
      const result = await getCardLimit(cpf);

      if (result.errorMessage) {
        setErrorMessage(result.errorMessage);
      } else {
        setCardLimit(result);
      }
    }
  }

  const renderingTable = () => {
    if (errorMessage) return <AlertMessage status="error" alertTitle="Error:" message={ errorMessage } />

    if (!cardLimit) return null;

    return (
      <Center>
        <Box marginY='7'>
          <Box padding='3' border='1px' borderColor='gray.200' borderTopRadius="10px">
            CPF Consultado: {cardLimit.cpf}
          </Box>
          <TableContainer>
            <Table variant='simple'>
              <Tbody>
              <Tr>
                <Th>Entidade</Th>
                <Th>Limite do cartão</Th>
                <Th>Limite disponível</Th>
                <Th>Saque máximo</Th>
              </Tr>
                <Tr>
                  <Td>{ cardLimit.entity }</Td>
                  <Td>{ formatCurrency(cardLimit.cardLimit) }</Td>
                  <Td>{ formatCurrency(cardLimit.availableLimit) }</Td>
                  <Td>{ formatCurrency(cardLimit.maximumWithdraw) }</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Center>
    );
  }

  return (
    <>
      <Header />
      <PageTitle title="Consultar Saque Complentar" />
      <CpfForm loading={ loading } onClickCpf={ onClickCpf } />
      { renderingTable() }
    </>
  );
}
