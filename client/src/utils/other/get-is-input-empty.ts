export const getIsInputEmpty = (data, initialState) => {
  return JSON.stringify(initialState) !== JSON.stringify(data);
};
