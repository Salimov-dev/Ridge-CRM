export const enterPhoneFormat = (number) => {
  let phone = String(number).replace(/\D/g, "");

  const startsWith = "7";
  if (phone.startsWith("7")) {
    phone = phone.substr(1);
    return phone.replace(
      /(\d{3})(\d{3})(\d{2})(\d{2})/g,
      `+${startsWith}($1)$2-$3-$4`
    );
  } else if (phone.startsWith("8")) {
    return phone.replace(
      /(\d{3})(\d{3})(\d{2})(\d{2})/g,
      `+${startsWith}($1)$2-$3-$4`
    );
  } else if (phone.startsWith("9")) {
    return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, `+($1)$2-$3-$4`);
  } else {
    return phone.replace(/(\d{3})(\d{2})(\d{2})/g, `$1-$2-$3`);
  }
};
