const fs = require('fs');
const path = require('path');
const axios = require('axios');

const url = process.env.PIPEFY_URL;
const headers = {
  'Content-Type': 'application/json',
  Authorization: process.env.PIPEFY_TOKEN,
};

const getCardData = async (id) => {
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
    url,
    method: 'POST',
    headers,
    data: graphqlQuery,
  });
  return data;
};

const moveCard = async (cardId, destinationPhaseId) => {
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
    url,
    method: 'POST',
    headers,
    data: graphqlMutation,
  });
  return data;
};

const updateCardField = async (cardId, fieldId, responseMessage) => {
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
    url,
    method: 'POST',
    headers,
    data: graphqlMutation,
  });
  return data;
};

const getReportId = async (pipeId, pipeReportId) => {
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
    url,
    method: 'POST',
    headers,
    data: graphqlMutation,
  });

  if (data.exportPipeReport === 'undefined') {
    return data;
  }

  const reportId = parseInt(data.data.exportPipeReport.pipeReportExport.id, 10);
  return reportId;
};

const getReportUrl = async (id) => {
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
    url,
    method: 'POST',
    headers,
    data: graphqlQuery,
  });
  const reportUrl = data.data.pipeReportExport.fileURL;
  return reportUrl;
};

const getStream = async (urlStream) => {
  const { data } = await axios({
    url: urlStream,
    method: 'GET',
    headers,
    responseType: 'stream',
  });
  return data;
};

module.exports = {
  moveCard,
  getStream,
  getCardData,
  getReportId,
  getReportUrl,
  updateCardField,
};
