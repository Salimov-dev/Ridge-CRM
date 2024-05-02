export const makeDigitSeparator = (data) => {
  const formData = String(data)
    .replace(/[^\d.]+/g, "")
    .replace(/(\..*)\./g, "$1");

  const [integerPart, decimalPart] = formData.split(".");

  let formattedDecimalPart = "";
  if (decimalPart !== undefined) {
    formattedDecimalPart = "." + decimalPart.slice(0, 3);
  }

  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    " "
  );

  const result = formattedIntegerPart + formattedDecimalPart;

  return result;
};
