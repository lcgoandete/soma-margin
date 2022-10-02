import { useState } from "react";
import * as cpfTest from 'cpf-cnpj-validator'; 

import useCardLimit from "../../hooks/useCardLimit";
import Loading from "../../components/loading/Loading";
import PageTitle from "../../components/pageTitle/PageTitle";

import './style.css'

const cardLimitDefault = {
  cardLimit: 0,
  availableLimit: 0,
  maximumWithdraw: 0,
  entidade: ''
};

const CardLimit = () => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const { cardLimitApi } = useCardLimit();
  const [cardLimit, setCardLimit] = useState(cardLimitDefault);

  const consultCpf = async (target) => {
    target.preventDefault();
    
    if(!cpfTest.cpf.isValid(cpf)) {
      setCpf('');
      setCardLimit({ message: 'CPF inválido' });
      return;
    }

    setCardLimit(cardLimitDefault);
    setLoading(true);
    const result = await cardLimitApi(cpf);
    setLoading(false);
    setCpf('');
    setCardLimit(result);
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
      <PageTitle title="Consulta saque BMG" />
      <form onSubmit={ consultCpf }>
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

      <div className="margins">
        { cardLimit.message
          ? <h2>{cardLimit.message}</h2>
          : <div className="margin">
              <div className={'table-title'}>CPF consultado: {cardLimit.cpf}</div>
              <table>
                <tbody>
                <tr>
                  <th>Entidade</th>
                  <th>Limite do cartão</th>
                  <th>Limite disponível</th>
                  <th>Saque máximo</th>
                </tr>
                  <tr>
                    <td>{cardLimit.entidade}</td>
                    <td>
                      {cardLimit.cardLimit.toLocaleString(
                        'pt-BR',
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </td>
                    <td>
                      {cardLimit.availableLimit.toLocaleString(
                        'pt-BR',
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </td>
                    <td>
                      {cardLimit.maximumWithdraw.toLocaleString(
                        'pt-BR',
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        }
      </div>
    </>
  );
}

export default CardLimit;