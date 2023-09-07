export const makeDigitSeparator = (data) => {
  data = String(data);

  return data?.replace(/[^\d]/g, "")?.replace(/\B(?=(?:\d{3})+(?!\d))/g, " ");
};
