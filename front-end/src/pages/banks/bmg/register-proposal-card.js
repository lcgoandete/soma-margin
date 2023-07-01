import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  useToast
} from '@chakra-ui/react';


import { Header } from '../../../components/header/Header';
import { Loading } from '../../../components/loading/Loading';
import { PageTitle } from '../../../components/pageTitle/PageTitle';
import { useRegisterProposalCard } from '../../../hooks/banks/bmg/useRegisterProposalCard';
import { Client } from '../../../components/bmg/proposal-card/Client';

export const RegisterProposalCard = ({ payloadClient }) => {
  const toast = useToast();
  
  const [payload, setPayload] = useState({});
  const [proposalCard, setProposalCard] = useState(null);
  const { registerProposalCard, loading } = useRegisterProposalCard();

  const cleanFields = () => {
    // setDataNascimento('');
  };

  const getFieldData = (data) => {
    console.log(data)
    setPayload(data);
  }

  const registerProposalCards = async (event) => {
    event.preventDefault();
    setProposalCard(null);

    const result = await registerProposalCard(payload);

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
      setProposalCard(result);
      cleanFields();
    }
  }

  const renderingForm = () => {
    return (
      <FormControl mx="auto" p="15px" w="850px" border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
      <Client getFieldData={ getFieldData } />
      <Box mt="4">
        <Button colorScheme='blue' onClick={ (event) => registerProposalCards(event) }>
          Consultar
          { loading && <Loading /> }
        </Button>
      </Box>
      </FormControl>
    );
  }
  
  return (
    <>
      <Header />
      { payloadClient }
      <PageTitle title=" Gravar Proposta de Cartão" />
      { renderingForm() }
      { proposalCard }
    </>
  );
}
