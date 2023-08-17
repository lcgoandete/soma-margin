
export const timeoutExceptionHandle = (error, timeout) => {
  if (error.code === 'ECONNABORTED') {
    throw Error({ errorMessage: `O tempo limite de espera ${timeout / 1000} segundos foi excedido.` });
  }
}