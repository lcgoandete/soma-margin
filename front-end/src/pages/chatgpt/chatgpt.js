import { useState } from 'react';
import { Box,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Textarea,
  useToast
} from '@chakra-ui/react';

import { useChatgpt } from '../../hooks/useChatgpt';
import { Header } from '../../components/header/Header';
import { formatCurrencyMask } from '../../helpers/formatter';
import { PageTitle } from '../../components/pageTitle/PageTitle';
import { Loading } from '../../components/loading/Loading';

export const Chatgpt = () => {
  const [age, setAge] = useState('');
  const [margin, setMargin] = useState('');
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [answer, setAnswer] = useState();
  
  const toast = useToast();
  const { loading, getChat } = useChatgpt();

  const executeChat = async (event) => {
    event.preventDefault();
    
    if (event.key !== 'Enter') return;

    const payload = { age, margin, name, question };
    const result = await getChat(payload);

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
      setAnswer(result.message);
      setQuestion('');
    }
  }

  const renderingForm = () => {
    return (
      <FormControl mx="auto" p="8px" w="650px" border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
        <SimpleGrid columns={3} spacing={2}>
          <Box w="200px">
            <FormLabel htmlFor="margin">Margem:</FormLabel>
            <Input
              autoFocus
              id="margin"
              type="text"
              name="margin"
              autoComplete="off"
              value={ margin }
              onChange={ ({ target }) => setMargin(formatCurrencyMask((target.value))) }
            />
          </Box>

          <Box w="200px">
            <FormLabel htmlFor="age">Idade:</FormLabel>
            <Input
              autoFocus
              id="age"
              type="text"
              name="age"
              autoComplete="off"
              value={ age }
              onChange={ ({ target }) => setAge(target.value) }
            />
          </Box>

          <Box w="200px">
            <FormLabel htmlFor="name">Base de Conhecimento:</FormLabel>
            <Select
              autoFocus
              id="name"
              name="name"
              value={ name }
              onChange={ ({ target }) => setName(target.value) }
            >
              <option value="">Selecione...</option>
              <option value="BMG">BMG</option>
            </Select>
          </Box>
        </SimpleGrid>
      </FormControl>
      
    );
  }

  const renderingAnswer = () => {
    return (
      <Box mx="auto" my="4" p="15px" w="900px" h="410" border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
        
        <Textarea
          h="300"
          resize="none"
          id="answer"
          name="answer"
          value={ answer }
          readOnly
        />
        <Box my="2">
          <FormLabel htmlFor="question">Pergunta:</FormLabel>
          <Input
            autoFocus
            id="question"
            type="text"
            name="question"
            autoComplete="off"
            value={ question }
            onChange={ ({ target }) => setQuestion(target.value) }
            onKeyUp={ (event) => executeChat(event) }
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Header />
      <PageTitle title="Chat GPT" />
      { renderingForm() }
      <Center>{ loading && <Loading /> }</Center>
      { renderingAnswer() }
    </>
  );
}
