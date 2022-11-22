import { useState } from 'react';
import * as cpfTest from 'cpf-cnpj-validator'; 

import useConsultCpf from '../../hooks/useConsultCpf';
import Loading from '../../components/loading/Loading'
import PageTitle from '../../components/pageTitle/PageTitle';

import './style.css'

const ConsultCpf = () => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataClient, setDataClient] = useState([]);
  const [queryType, setQueryType] = useState('');
  const { consultCpfApi } = useConsultCpf();

  const consultCpf = async (target) => {
    target.preventDefault();
    
    if(!queryType) {
      setQueryType('');
      setDataClient({ message: 'Favor selecionar o tipo de consulta' });
      return;
    }

    if(!cpfTest.cpf.isValid(cpf)) {
      setDataClient([]);
      setCpf('');
      setDataClient({ message: 'CPF inválido' });
      return;
    }

    setDataClient([]);
    setLoading(true);
    const result = await consultCpfApi(queryType, cpf);
    setLoading(false);
    setQueryType('');
    setCpf('');
    setDataClient(result);
  }

  const formatCpf = (cpfNumber) => {
    if (cpfNumber.length <= 14) {
      let value = cpfNumber;
      value = value.replace(/\D/g, '');
      value = value.replace(/^(\d{1,3})(\d{1,3})(\d{1,3})(\d{1,2})/, '$1.$2.$3-$4');
      cpfNumber = value;
      setCpf(cpfNumber);
    }
  }

  return (
    <>
      <PageTitle title="Pesquisar Margem" />
      <form onSubmit={ consultCpf }>
        <div className="queryTypeContainer">
          <label htmlFor="queryType">
            Tipo de Consulta:
            <select
              className="queryType"
              name="queryType"
              value={queryType}
              onChange={({ target }) => setQueryType(target.value)}
            >
              <option value="">Selecione...</option>
              <option value="margins">Estado de São Paulo</option>
              <option value="municipio-margins">Município de São Paulo</option>
            </select>
          </label>
        </div>

        <label htmlFor="cpf">
          CPF do Servidor:
          <input
            required
            autoFocus
            id="cpf"
            type="text"
            name="cpf"
            autoComplete="off"
            value={ cpf }
            onChange={({ target }) => formatCpf(target.value)}
          />
          { loading && <Loading /> }
        </label>
      </form>

      <div className='margins'>
        { dataClient.message
          ? <h2>{ dataClient.message }</h2>
          : dataClient?.map((client, index) => (
          <div className='margin' key={index}>
            <div className={'table-title'}>Dados de Identificação</div>
            <table>
              <tbody>
                <tr>
                  <td>CPF - {client.dadosIdentificacao.cpf}</td>
                  <td>Nome - {client.dadosIdentificacao.nome}</td>
                </tr>
                <tr>
                  <td>Órgão - {client.dadosIdentificacao.orgao}</td>
                  <td>Identificação - {client.dadosIdentificacao.identificacao}</td>
                </tr>
                <tr>
                  <td>Mês de Referência da Margem - {client.dadosIdentificacao.mesReferencia}</td>
                  <td>Data de Processamento da Próxima Folha - {client.dadosIdentificacao.dataProcessamento}</td>
                </tr>
              </tbody>
            </table>

            <div className={'table-title'}>Margem Bruta</div>
            <div className={'table-title'}>{client.margemBruta.provimento}</div>
            <table>
              <tbody>
                <tr>
                  <th>Produto</th>
                  <th>Valor (R$)</th>
                </tr>
                <tr>
                  <td>Consignações Facultativas</td>
                  <td>{client.margemBruta.consignacoesFacultativas}</td>
                </tr>
                <tr>
                  <td>Cartão de Crédito</td>
                  <td>{client.margemBruta.cartaoCredito}</td>
                </tr>
                <tr>
                  <td>Cartão de Benefício</td>
                  <td>{client.margemBruta.cartaoBenefico}</td>
                </tr>  
              </tbody>
            </table>
            
            <div className={'table-title'}>Dados Funcionais</div>
            <table>
            <tbody>
                <tr>
                  <td>Lotação - {client.margemBruta.dadosFuncionais.lotacao}</td>
                  <td>Cargo - {client.margemBruta.dadosFuncionais.cargo}</td>
                </tr>
                <tr>
                  <td>Data de Nomeação/Admissão - {client.margemBruta.dadosFuncionais.dataAdmissao}</td>
                  <td>Tipo de Vínculo - {client.margemBruta.dadosFuncionais.tipoVinculo}</td>
                </tr>
                <tr>
                  <td>Data Fim do Contrato - {client.margemBruta.dadosFuncionais.dataFinalContrato}</td>
                </tr>
              </tbody>
            </table>

            <div className={'table-title'}>Margem Disponível - Total</div>
            <div className={'table-title'}>{client.margemBruta.provimento}</div>
            <table>
              <tbody>
                <tr>
                  <th>Produto</th>
                  <th>Valor (R$)</th>
                </tr>
                <tr>
                  <td>Consignações Facultativas</td>
                  <td>{client.margemDisponivel.consignacoesFacultativas}</td>
                </tr>
                <tr>
                  <td>Cartão de Crédito</td>
                  <td>{client.margemDisponivel.cartaoCredito}</td>
                </tr>
                <tr>
                  <td>Cartão de Benefício</td>
                  <td>{client.margemDisponivel.cartaoBenefico}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}

export default ConsultCpf;
