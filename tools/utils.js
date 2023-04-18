const handleError = (error) => {
  console.error('Error:', error.message);
  throw error;
};

export const executeQuery = async (query) => {
  const { data, error } = await query;
  if (error) handleError(error);
  return data;
};
