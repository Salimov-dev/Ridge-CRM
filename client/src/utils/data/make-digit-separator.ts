export const makeDigitSeparator = (data) => {
  data = String(data);

  const result = data
    ?.replace(/[^\d]/g, "")
    ?.replace(/\B(?=(?:\d{3})+(?!\d))/g, " ");

  return result;
};
