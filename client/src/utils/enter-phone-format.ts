export const enterPhoneFormat = (number) => {
  
  const startsWith = "7";
  let phone = String( number).replace(/[^0-9]/g, "");
  if (phone.startsWith("7")) {
    phone = phone.substr(1);
    return phone.replace(
      /(\d{3})(\d{3})(\d{2})(\d{2})/g,
      `${startsWith}($1)$2-$3-$4`
    );
  } else if (phone.startsWith("8")) {
    return phone.replace(
      /(\d{3})(\d{3})(\d{2})(\d{2})/g,
      `${startsWith}($1)$2-$3-$4`
    );
  } else if (phone.startsWith("9")) {
    return phone.replace(
      /(\d{3})(\d{3})(\d{2})(\d{2})/g,
      `($1)$2-$3-$4`
    );
  } else {
    return phone.replace(/(\d{3})(\d{2})(\d{2})/g, `$1-$2-$3`);
  }
};

