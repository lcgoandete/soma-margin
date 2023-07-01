import { useEffect, useState } from "react";
import {
  Box,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
  useToast
} from "@chakra-ui/react";

import {
  ufList,
  bankList,
  estadoCivilList,
  orgaoEmissorList,
  grauInstrucaoList,
  codigoSituacaoServidorList,
} from "./data";

import { useViaCep } from '../../../hooks/useViaCep';
import { formatCep, formatCpf, formatCurrencyMask } from "../../../helpers/formatter";
import { Loading } from "../../loading/Loading";
import { Loading2 } from "../../loading/Loading2";

export const Client = ({ getFieldData }) => {
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [nomeConjuge, setNomeConjuge] = useState('');
  const [nomeMae, setNomeMae] = useState('');
  const [nomePai, setNomePai] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [cidadeNascimento, setCidadeNascimento] = useState('');
  const [ufNascimento, setUfNascimento] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [grauInstrucao, setGrauInstrucao] = useState('');
  const [email, setEmail] = useState('');
  const [clienteCpf, setClienteCpf] = useState('');

  const [identidadeNumero, setIdentidadeNumero] = useState('');
  const [identidadeOrgaoEmissor, setIdentidadeOrgaoEmissor] = useState('');
  const [identidadeUf, setIdentidadeUf] = useState('');
  const [identidadeDataEmissao, setIdentidadeDataEmissao] = useState('');

  const [enderecoCep, setEnderecoCep] = useState('');
  const [enderecoLogradouro, setEnderecoLogradouro] = useState('');
  const [enderecoNumero, setEnderecoNumero] = useState('');
  const [enderecoComplemento, setEnderecoComplemento] = useState('');
  const [enderecoBairro, setEnderecoBairro] = useState('');
  const [enderecoCidade, setEnderecoCidade] = useState('');
  const [enderecoUf, setEnderecoUf] = useState('');
  const [celularNumero, setCelularNumero ] = useState('');
  const [celularDDD, setCelularDDD] = useState('');

  const [bancoNumero, setBancoNumero] = useState('');
  const [agenciaNumero, setAgenciaNumero] = useState('');
  const [agenciaDV, setAgenciaDV] = useState('');
  const [contaNumero, setContaNumero] = useState('');
  const [contaDV, setContaDV] = useState('');
  const [finalidadeCredito,setFinalidadeCredito] = useState('');
  const [bancoOrdemPagamento,setBancoOrdemPagamento] = useState('');
  const [codigoFormaEnvioTermo,setCodigoFormaEnvioTermo] = useState('');
  const [tipoDomicilioBancario,setTipoDomicilioBancario] = useState('');
  const [aberturaContaPagamento,setAberturaContaPagamento] = useState('');

  const [codigoEntidade, setCodigoEntidade] = useState('');
  const [codigoServico, setCodigoServico] = useState('');
  const [matricula, setMatricula] = useState('');
  const [codigoLoja, setCodigoLoja] = useState('');
  const [dataRenda, setDataRenda] = useState('');
  const [valorRenda, setValorRenda] = useState('');
  const [margem, setMargem] = useState('');
  
  useEffect(() => {
    getFieldData({ nome, sexo, nomeConjuge, nomeMae, nomePai, dataNascimento, estadoCivil,
      cidadeNascimento, ufNascimento, nacionalidade, grauInstrucao, email, clienteCpf });

  },[nome, sexo, nomeConjuge, nomeMae, nomePai, dataNascimento, estadoCivil, cidadeNascimento,
    ufNascimento, nacionalidade, grauInstrucao, email, clienteCpf]);

  const toast = useToast();
  const { getStreet, loading } = useViaCep();

  const formatedCep = (cep) => {
    if (cep.length <= 9) {
      setEnderecoCep(formatCep(cep));
    }
  }

  const formatedCpf = (cpf) => {
    if (cpf.length <= 14) {
      setClienteCpf(formatCpf(cpf));
    }
  }

  const formatedCurrency = (value) => {
    if (value.length <= 14) {
      setValorRenda(formatCurrencyMask(value));
    }
  }

  const getStreets = async () => {
    const result = await getStreet(enderecoCep);
    if (result.errorMessage) {
      toast({
        title: 'error',
        description: 'Não foi possível localizar o endereço',
        status: 'error',
        duration: 7000,
        isClosable: true,
        position: 'top',
      });
    } else {
      const { logradouro, bairro, localidade, uf } = result;
      setEnderecoLogradouro(logradouro);
      setEnderecoBairro(bairro);
      setEnderecoCidade(localidade);
      setEnderecoUf(uf);
    }
  }

  return (
    <>
      <Text mt="4" fontSize='2xl'></Text>
      <SimpleGrid padding="2" columns={2} spacing={2} border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
        <Box>
          <FormLabel htmlFor="codigoEntidade" mt="10px">Código Entidade:</FormLabel>
          <Input
            id="codigoEntidade"
            type="number"
            name="codigoEntidade"
            autoComplete="off"
            value={ codigoEntidade }
            onChange={ ({ target }) => setCodigoEntidade(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="codigoServico" mt="10px">Código de Serviço:</FormLabel>
          <Input
            id="codigoServico"
            type="number"
            name="codigoServico"
            autoComplete="off"
            value={ codigoServico }
            onChange={ ({ target }) => setCodigoServico(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="matricula" mt="10px">Matrícula:</FormLabel>
          <Input
            id="matricula"
            type="number"
            name="matricula"
            autoComplete="off"
            value={ matricula }
            onChange={ ({ target }) => setMatricula(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="codigoLoja" mt="10px">Código da Loja:</FormLabel>
          <Input
            id="codigoLoja"
            type="number"
            name="codigoLoja"
            autoComplete="off"
            value={ codigoLoja }
            onChange={ ({ target }) => setCodigoLoja(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="dataRenda" mt="10px">Data da Renda:</FormLabel>
          <Input
            id="dataRenda"
            type="date"
            name="dataRenda"
            autoComplete="off"
            value={ dataRenda }
            onChange={ ({ target }) => setDataRenda(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="valorRenda" mt="10px">Valor da Renda:</FormLabel>
          <Input
            id="valorRenda"
            type="text"
            name="valorRenda"
            autoComplete="off"
            value={ valorRenda }
            onChange={ ({ target }) => formatedCurrency(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="margem" mt="10px">Margem:</FormLabel>
          <Input
            id="margem"
            type="text"
            name="margem"
            autoComplete="off"
            value={ margem }
            onChange={ ({ target }) => setMargem(target.value) }
          />
        </Box>
      </SimpleGrid>

      <Text mt="4" fontSize="2xl">Dados do Cliente</Text>
      <SimpleGrid padding="2" columns={2} spacing={2} border="1px" borderRadius="10px" borderColor="gray.200" align="center">
        <Box>
          <FormLabel htmlFor="clienteCpf" mt="10px">CPF:</FormLabel>
          <Input
            id="clienteCpf"
            type="text"
            name="clienteCpf"
            autoComplete="off"
            value={ clienteCpf }
            onChange={ ({ target }) => formatedCpf(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="nome" mt="10px">Nome:</FormLabel>
          <Input
            id="nome"
            type="text"
            name="nome"
            autoComplete="off"
            value={ nome }
            onChange={ ({ target }) => setNome(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="sexo" mt="10px">Sexo:</FormLabel>
          <Select
            autoFocus
            id="sexo"
            name="sexo"
            value={ sexo }
            onChange={ ({ target }) => setSexo(target.value) }
          >
            <option value="">Selecione...</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </Select>
        </Box>
        <Box>
          <FormLabel htmlFor="dataNascimento" mt="10px">Data de Nascimento:</FormLabel>
          <Input
            id="dataNascimento"
            type="date"
            name="dataNascimento"
            autoComplete="off"
            value={ dataNascimento }
            onChange={ ({ target }) => setDataNascimento(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="estadoCivil" mt="10px">Estado Civil:</FormLabel>
          <Select
            id="estadoCivil"
            name="estadoCivil"
            value={ estadoCivil }
            onChange={ ({ target }) => setEstadoCivil(target.value) }
          >
            <option value="">Selecione...</option>
            {
              estadoCivilList.map(({id, descricao}) => (
                <option key={id} value={id}>{descricao}</option>
              ))
            }
          </Select>
        </Box>
        <Box>
          <FormLabel htmlFor="cidadeNascimento" mt="10px">Cidade de Nascimento:</FormLabel>
          <Input
            id="cidadeNascimento"
            type="text"
            name="cidadeNascimento"
            autoComplete="off"
            value={ cidadeNascimento }
            onChange={ ({ target }) => setCidadeNascimento(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="ufNascimento" mt="10px">UF de Nascimento:</FormLabel>
          <Input
            id="ufNascimento"
            type="text"
            name="ufNascimento"
            autoComplete="off"
            value={ ufNascimento }
            onChange={ ({ target }) => setUfNascimento(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="nacionalidade" mt="10px">Nacionalidade:</FormLabel>
          <Input
            id="nacionalidade"
            type="text"
            name="nacionalidade"
            autoComplete="off"
            value={ nacionalidade }
            onChange={ ({ target }) => setNacionalidade(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="grauInstrucao" mt="10px">Grau de Instrução:</FormLabel>
          <Select
            autoFocus
            id="grauInstrucao"
            name="grauInstrucao"
            value={ grauInstrucao }
            onChange={ ({ target }) => setGrauInstrucao(target.value) }
          >
            <option value="">Selecione...</option>
            {
              grauInstrucaoList.map(({id, descricao}) => (
                <option key={id} value={id}>{descricao}</option>
              ))
            }
          </Select>
        </Box>
        <Box>
          <FormLabel htmlFor="nomePai" mt="10px">Nome do Pai:</FormLabel>
          <Input
            id="nomePai"
            type="text"
            name="nomePai"
            autoComplete="off"
            value={ nomePai }
            onChange={ ({ target }) => setNomePai(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="nomeMae" mt="10px">Nome da Mãe:</FormLabel>
          <Input
            id="nomeMae"
            type="text"
            name="nomeMae"
            autoComplete="off"
            value={ nomeMae }
            onChange={ ({ target }) => setNomeMae(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="nomeConjuge" mt="10px">Nome do Conjuge:</FormLabel>
          <Input
            id="nomeConjuge"
            type="text"
            name="nomeConjuge"
            autoComplete="off"
            value={ nomeConjuge }
            onChange={ ({ target }) => setNomeConjuge(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="email" mt="10px">Email:</FormLabel>
          <Input
            id="email"
            type="email"
            name="email"
            autoComplete="off"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="celularNumero" mt="10px">Celular:</FormLabel>
          <Input
            id="celularNumero"
            type="text"
            name="celularNumero"
            autoComplete="off"
            value={ celularNumero }
            onChange={ ({ target }) => setCelularNumero(target.value) }
          />
        </Box>
      </SimpleGrid>
      
      <Text mt="4" fontSize='2xl'>Identidade</Text>
      <SimpleGrid padding="2" columns={2} spacing={2} border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
        <Box>
          <FormLabel htmlFor="identidadeNumero" mt="10px">Número:</FormLabel>
          <Input
            id="identidadeNumero"
            type="text"
            name="identidadeNumero"
            autoComplete="off"
            value={ identidadeNumero }
            onChange={ ({ target }) => setIdentidadeNumero(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="identidadeOrgaoEmissor" mt="10px">Orgão Emissor:</FormLabel>
          <Select
            id="identidadeOrgaoEmissor"
            name="identidadeOrgaoEmissor"
            value={ identidadeOrgaoEmissor }
            onChange={ ({ target }) => setIdentidadeOrgaoEmissor(target.value) }
          >
            <option value="">Selecione...</option>
            {
              orgaoEmissorList.map((descricao) => (
                <option key={descricao} value={descricao}>{descricao}</option>
              ))
            }
          </Select>
        </Box>
        <Box>
          <FormLabel htmlFor="identidadeUf" mt="10px">UF:</FormLabel>
          <Select
            id="identidadeUf"
            name="identidadeUf"
            value={ identidadeUf }
            onChange={ ({ target }) => setIdentidadeUf(target.value) }
          >
            <option value="">Selecione...</option>
            {
              ufList.map(({sigla, estado}) => (
                <option key={sigla} value={sigla}>{estado}</option>
              ))
            }
          </Select>
        </Box>
        <Box>
          <FormLabel htmlFor="identidadeDataEmissao" mt="10px">Data de Emissão:</FormLabel>
          <Input
            id="identidadeDataEmissao"
            type="date"
            name="identidadeDataEmissao"
            autoComplete="off"
            value={ identidadeDataEmissao }
            onChange={ ({ target }) => setIdentidadeDataEmissao(target.value) }
          />
        </Box>
      </SimpleGrid>

      <Text mt="4" fontSize='2xl'>Endereço</Text>
      <SimpleGrid padding="2" columns={2} spacing={2} border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
        <Box>
          <FormLabel htmlFor="enderecoCep" mt="10px">Cep:</FormLabel>
          <Input
            id="enderecoCep"
            type="text"
            name="enderecoCep"
            autoComplete="off"
            value={ enderecoCep }
            onBlur={ () => getStreets() }
            onChange={ ({ target }) => formatedCep(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="enderecoLogradouro" mt="10px">Logradouro:</FormLabel>
          <Input
            id="enderecoLogradouro"
            type="text"
            name="enderecoLogradouro"
            autoComplete="off"
            value={ enderecoLogradouro }
            onChange={ ({ target }) => setEnderecoLogradouro(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="enderecoNumero" mt="10px">Número:</FormLabel>
          <Input
            id="enderecoNumero"
            type="text"
            name="enderecoNumero"
            autoComplete="off"
            value={ enderecoNumero }
            onChange={ ({ target }) => setEnderecoNumero(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="enderecoComplemento" mt="10px">Complemento:</FormLabel>
          <Input
            id="enderecoComplemento"
            type="text"
            name="enderecoComplemento"
            autoComplete="off"
            value={ enderecoComplemento }
            onChange={ ({ target }) => setEnderecoComplemento(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="enderecoBairro" mt="10px">Bairro:</FormLabel>
          <Input
            id="enderecoBairro"
            type="text"
            name="enderecoBairro"
            autoComplete="off"
            value={ enderecoBairro }
            onChange={ ({ target }) => setEnderecoBairro(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="enderecoCidade" mt="10px">Cidade:</FormLabel>
          <Input
            id="enderecoCidade"
            type="text"
            name="enderecoCidade"
            autoComplete="off"
            value={ enderecoCidade }
            onChange={ ({ target }) => setEnderecoCidade(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="enderecoUf" mt="10px">UF:</FormLabel>
          <Input
            id="enderecoUf"
            type="text"
            name="enderecoUf"
            autoComplete="off"
            value={ enderecoUf }
            onChange={ ({ target }) => setEnderecoUf(target.value) }
          />
        </Box>
      </SimpleGrid>

      <Text mt="4" fontSize='2xl'>Banco</Text>
      <SimpleGrid padding="2" columns={2} spacing={2} border="1px" borderRadius="10px" borderColor="gray.200" align='center'>
        <Box>
          <FormLabel htmlFor="bancoNumero" mt="10px">Banco:</FormLabel>
          <Select
            id="bancoNumero"
            name="bancoNumero"
            value={ bancoNumero }
            onChange={ ({ target }) => setBancoNumero(target.value) }
          >
            <option value="">Selecione...</option>
            {
              bankList.map(({id, descricao}) => (
                <option key={id} value={id}>{descricao}</option>
              ))
            }
          </Select>
        </Box>
        <Box>
        <FormLabel htmlFor="finalidadeCredito" mt="10px">Tipo de Conta:</FormLabel>
          <Select
            autoFocus
            id="finalidadeCredito"
            name="finalidadeCredito"
            value={ finalidadeCredito }
            onChange={ ({ target }) => setFinalidadeCredito(target.value) }
          >
            <option value="">Selecione...</option>
            <option value="1">Conta corrente</option>
            <option value="2">Conta poupança</option>
          </Select>
        </Box>
        <Box>
          <FormLabel htmlFor="agenciaNumero" mt="10px">Agência:</FormLabel>
          <Input
            float={"left"}
            width={"345px"}
            id="agenciaNumero"
            type="number"
            name="agenciaNumero"
            autoComplete="off"
            value={ agenciaNumero }
            onChange={ ({ target }) => setAgenciaNumero(target.value) }
          />
          <Input width={"50px"}
            id="agenciaDV"
            type="number"
            min={0}
            max={9}
            name="agenciaDV"
            autoComplete="off"
            value={ agenciaDV }
            onChange={ ({ target }) => setAgenciaDV(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="contaNumero" mt="10px">Conta:</FormLabel>
          <Input
            float={"left"}
            width={"345px"}
            id="contaNumero"
            type="number"
            name="contaNumero"
            autoComplete="off"
            value={ contaNumero }
            onChange={ ({ target }) => setContaNumero(target.value) }
          />
          <Input width={"50px"}
            id="contaDV"
            type="number"
            min={0}
            max={9}
            name="contaDV"
            autoComplete="off"
            value={ contaDV }
            onChange={ ({ target }) => setContaDV(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="bancoOrdemPagamento" mt="10px">Banco Ordem de Pagamento:</FormLabel>
          <Input
            id="bancoOrdemPagamento"
            type="number"
            name="bancoOrdemPagamento"
            autoComplete="off"
            value={ bancoOrdemPagamento }
            onChange={ ({ target }) => setBancoOrdemPagamento(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="codigoFormaEnvioTermo" mt="10px">Código Forma de Envio Termo:</FormLabel>
          <Input
            id="codigoFormaEnvioTermo"
            type="number"
            name="codigoFormaEnvioTermo"
            autoComplete="off"
            value={ codigoFormaEnvioTermo }
            onChange={ ({ target }) => setCodigoFormaEnvioTermo(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="tipoDomicilioBancario" mt="10px">Tipo de Domicílio Bancário:</FormLabel>
          <Input
            id="tipoDomicilioBancario"
            type="number"
            name="tipoDomicilioBancario"
            autoComplete="off"
            value={ tipoDomicilioBancario }
            onChange={ ({ target }) => setTipoDomicilioBancario(target.value) }
          />
        </Box>
        <Box>
          <FormLabel htmlFor="aberturaContaPagamento" mt="10px">Abertura de Conta de Pagamento:</FormLabel>
          <Input
            id="aberturaContaPagamento"
            type="number"
            name="aberturaContaPagamento"
            autoComplete="off"
            value={ aberturaContaPagamento }
            onChange={ ({ target }) => setAberturaContaPagamento(target.value) }
          />
        </Box>
      </SimpleGrid>
      <Loading2 loading={loading} />
    </>
  );
}
