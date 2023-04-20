const handleError = (error) => {
  console.error('Error:', error.message);
  throw error;
};

export const executeQuery = async (query) => {
  // console.log('query', query);
  const queryData = await query;
  // console.log('queryData', queryData);
  const {  error, ...data } = queryData;
  // console.log('data', data); 
  // console.log('error', error)
  if (error) handleError(error);
  return data;
};
