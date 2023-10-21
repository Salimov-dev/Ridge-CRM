export const enterPhoneFormat = (number) => {
  let phone = String(number).replace(/\D/g, "");
  
  if (phone.startsWith("7") && phone.length === 7) {
    return phone.replace(/(\d{3})(\d{2})(\d{2})/g, `$1-$2-$3`);
  } else if (phone.startsWith("7") || phone.startsWith("8") || phone.startsWith("9")) {
    return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/g, `+7($2)$3-$4-$5`);
  } else {
    return phone.replace(/(\d{3})(\d{2})(\d{2})/g, `$1-$2-$3`);
  }
};