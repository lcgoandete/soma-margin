const axios = require('axios');

class Pipefy {
  #url;

  #headers;

  constructor() {
    this.#url = process.env.PIPEFY_URL;
    this.#headers = {
      'Content-Type': 'application/json',
      Authorization: process.env.PIPEFY_TOKEN,
    };
  }

  getCardData = async (id) => {
    const graphqlQuery = {
      operationName: 'getCardById',
      query: `query($id: ID!) {
        card(id: $id) {
          fields { name value }
        }
      }`,
      variables: { id },
    };

    const { data } = await axios({
      url: this.#url,
      headers: this.#headers,
      method: 'POST',
      data: graphqlQuery,
    });
    return data;
  };

  moveCard = async (cardId, destinationPhaseId) => {
    const graphqlMutation = {
      operationName: 'moveCard',
      query: `mutation moveCardToPhase($input: MoveCardToPhaseInput!) {
        moveCardToPhase(input: $input)
        { card { current_phase_age } }
      }`,
      variables: {
        input: {
          card_id: cardId,
          destination_phase_id: destinationPhaseId,
        },
      },
    };

    const { data } = await axios({
      url: this.#url,
      headers: this.#headers,
      method: 'POST',
      data: graphqlMutation,
    });
    return data;
  };

  updateCardField = async (cardId, fieldId, responseMessage) => {
    const graphqlMutation = {
      operationName: 'updateCardField',
      query: `mutation updateCardField($input: UpdateCardFieldInput!) {
        updateCardField(input: $input)
        { success }
      }`,
      variables: {
        input: {
          card_id: cardId,
          field_id: fieldId,
          new_value: responseMessage,
        },
      },
    };

    const { data } = await axios({
      url: this.#url,
      headers: this.#headers,
      method: 'POST',
      data: graphqlMutation,
    });
    return data;
  };

  getReportId = async (pipeId, pipeReportId) => {
    const graphqlMutation = {
      operationName: 'getReportId',
      query: `mutation exportPipeReport($input: ExportPipeReportInput!) {
        exportPipeReport(input: $input) {
          pipeReportExport { id }
        }
      }`,
      variables: {
        input: {
          pipeId,
          pipeReportId,
        },
      },
    };

    const { data } = await axios({
      url: this.#url,
      headers: this.#headers,
      method: 'POST',
      data: graphqlMutation,
    });

    if (data.exportPipeReport === 'undefined') {
      return data;
    }

    // TODO: verificar retorno nulo (undefined)
    const reportId = parseInt(data.data.exportPipeReport.pipeReportExport.id, 10);
    return reportId;
  };

  getReportUrl = async (id) => {
    const graphqlQuery = {
      operationName: 'getReportUrl',
      query: `query($id: ID!) {
        pipeReportExport(id: $id) {
          fileURL
          state
          startedAt
          requestedBy { id }
        }
      }`,
      variables: { id },
    };

    const { data } = await axios({
      url: this.#url,
      headers: this.#headers,
      method: 'POST',
      data: graphqlQuery,
    });
    const reportUrl = data.data.pipeReportExport.fileURL;
    return reportUrl;
  };

  downloadDocument = async (urlStream) => {
    const { data } = await axios({
      method: 'GET',
      url: urlStream,
      headers: this.#headers,
      responseType: 'arraybuffer',
    });
    return data;
  };
}

module.exports = Pipefy;
