import { useState } from "react";
import * as validator from 'cpf-cnpj-validator';
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { Loading } from "../loading/Loading";
import { formatCpf } from "../../helpers/formatter";

export const CpfForm = (props) => {
  const { queryTypeElement, loading, onClickCpf } = props;
  const [cpf, setCpf] = useState('');

  const consultCpf = (event) => {
    event.preventDefault();
    
    if (event.key !== 'Enter' && event.type !== 'click') return;
    
    if(!validator.cpf.isValid(cpf)) {
      onClickCpf({ message: 'CPF inválido' })
    } else {
      onClickCpf({ cpf });
    }
    setCpf('');
  }

  const formatedCpf = (cpfNumber) => {
    if (cpfNumber.length <= 14) {
      setCpf(formatCpf(cpfNumber));
    }
  }

  return (
    <Box mx="auto" p="15px" w="500px" border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
      <FormControl isRequired>
        { queryTypeElement } 
        <FormLabel htmlFor="cpf">CPF:</FormLabel>
        <Input
          autoFocus
          id="cpf"
          type="text"
          name="cpf"
          autoComplete="off"
          value={ cpf }
          onChange={({ target }) => formatedCpf(target.value)}
          onKeyUp={(event) => consultCpf(event)}
        />
        <Button mt="4" colorScheme='blue' onClick={ (event) => consultCpf(event) } >
          Consultar
          { loading && <Loading /> }
        </Button>
      </FormControl>
    </Box>
  );
}
