import { useState } from "react";
import moment from 'moment';
import * as cpfTest from 'cpf-cnpj-validator';

import useAgreement from "../../../hooks/useAgreement";
import Loading from "../../../components/loading/Loading";
import PageTitle from "../../../components/pageTitle/PageTitle";
import './style.css'

const agreementDefault = [{
  cpf: '',
  agreement: '',
  name: '',
  dateTime: '',
  status: '',
  situation: '',
}];

const Agreement = () => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreementList, setAgreementList] = useState(agreementDefault);
  const [errorMessage, setErrorMessage] = useState('');
  const { getAgremments } = useAgreement();

  const consultCpf = async (target) => {
    target.preventDefault();
    
    if(!cpfTest.cpf.isValid(cpf)) {
      setCpf('');
      setErrorMessage('CPF inválido');
      return;
    }

    setErrorMessage('');
    setLoading(true);
    const result = await getAgremments(cpf);
    typeof(result) !== 'string' ? setAgreementList(result) : setErrorMessage(result);
    setLoading(false);
    setCpf('');
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

  const renderingTable = () => {
    if (errorMessage) {
      return (
        <div className="margins">
          <h2>{ errorMessage }</h2>
        </div>
      );
    }
    
    return (
      <div className="margins">
          <div className="margin">
          <div className={'table-title'}>CPF consultado: { agreementList[0].cpf }</div>
          <div className={'table-title'}>Nome: { agreementList[0].name }</div>
          <table>
            <thead>
              <tr>
                <th>Contrato</th>
                <th>Data</th>
                <th>Situação</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              { agreementList.map((agreement) => (
                <tr key={agreement.agreement}>
                  <td>{ agreement.agreement }</td>
                  <td>{ agreement.dateTime && moment(agreement.dateTime).format("DD/MM/YYYY HH:mm:ss") }</td>
                  <td>{ agreement.situation }</td>
                  <td>{ agreement.status }</td>
                </tr>))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Consulta Contrato Safra" />
      <form onSubmit={ consultCpf }>
        <label htmlFor="cpf">
          CPF:
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
      { renderingTable() }
    </>
  );
}

export default Agreement;
