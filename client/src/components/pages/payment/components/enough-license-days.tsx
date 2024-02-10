import styled from "@emotion/styled";
import { Typography, Box } from "@mui/material";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0 4px 0;
`;

const EnoughLicenseDays = ({ newDaysQuantity }) => {
  function pluralizeDays(number) {
    const cases = [2, 0, 1, 1, 1, 2];
    return ["день", "дня", "дней"][
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[Math.min(number % 10, 5)]
    ];
  }

  return (
    <Component>
      <Typography variant="h4" sx={{ textAlign: "center", marginRight: "4px" }}>
        Введенного баланса хватит на:
      </Typography>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", color: "red", fontWeight: "bold" }}
      >
        {newDaysQuantity} {pluralizeDays(newDaysQuantity)}
      </Typography>
    </Component>
  );
};

export default EnoughLicenseDays;
