import { useState } from 'react';
import { Box, Center, Table, TableContainer, Tbody, Td, Th, Tr } from '@chakra-ui/react';

import { Header } from '../../../components/header/Header';
import { useCardLimit } from '../../../hooks/useCardLimit';
import { formatCurrency } from '../../../helpers/formatter';
import { CpfForm } from '../../../components/cpf-form/CpfForm';
import { PageTitle } from '../../../components/pageTitle/PageTitle';
import { AlertErrorMessage } from '../../../components/alert-error-message/AlertErrorMessage';

const cardLimitDefault = {
  cardLimit: 0,
  availableLimit: 0,
  maximumWithdraw: 0,
  entity: ''
};

export const CardLimit = () => {
  const { loading, getCardLimit } = useCardLimit();
  const [errorMessage, setErrorMessage] = useState('');
  const [cardLimit, setCardLimit] = useState(cardLimitDefault);

  const onClickCpf = async (response) => {
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
    if (errorMessage) return <AlertErrorMessage errorMessage={ errorMessage } />

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
      <PageTitle title="Consulta saque BMG" />
      <CpfForm loading={ loading } onClickCpf={ onClickCpf } />
      { renderingTable() }
    </>
  );
}
