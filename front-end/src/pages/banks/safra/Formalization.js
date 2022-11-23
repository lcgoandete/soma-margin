import { useState } from "react";
import * as cpfTest from 'cpf-cnpj-validator';

import useFormalization from "../../../hooks/useFormalization";
import Loading from "../../../components/loading/Loading";
import PageTitle from "../../../components/pageTitle/PageTitle";
import './style.css'

const formalizationDefault = {
  cpfCustomer: '',
  nameCustomer: '',
  agreement: '',
  phaseDescription: '',
  link: '',
};

const Formalization = () => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [formalization, setFormalization] = useState(formalizationDefault);
  const [errorMessage, setErrorMessage] = useState('');
  const { getFormalization } = useFormalization();

  const consultCpf = async (target) => {
    target.preventDefault();
    
    if(!cpfTest.cpf.isValid(cpf)) {
      setCpf('');
      setErrorMessage('CPF inválido');
      return;
    }

    setErrorMessage('');
    setLoading(true);
    const result = await getFormalization(cpf);
    typeof(result) !== 'string' ? setFormalization(result) : setErrorMessage(result);
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
          <div className={'table-title'}>CPF Consultado: { formalization.cpfCustomer }</div>
          <div className={'table-title'}>Nome: { formalization.nameCustomer }</div>
          <table>
            <thead>
              <tr>
                <th>Contrato</th>
                <th>Fase</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ formalization.agreement }</td>
                <td>{ formalization.phaseDescription }</td>
                <td>{ formalization.link }</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Formalização Safra" />
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

export default Formalization;
