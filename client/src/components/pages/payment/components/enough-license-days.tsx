import styled from "@emotion/styled";
import { Typography, Box } from "@mui/material";
import { pluralizeDays } from "@utils/date/pluralize-days";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0 4px 0;
`;

const EnoughLicenseDays = ({ newDaysQuantity }) => {
  return (
    <Component>
      <Typography variant="h5" sx={{ textAlign: "center", marginRight: "4px" }}>
        Введенного баланса ДОПОЛНИТЕЛЬНО хватит на:
      </Typography>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", color: "red", fontWeight: "bold" }}
      >
        {newDaysQuantity} {pluralizeDays(newDaysQuantity)}
      </Typography>
    </Component>
  );
};

export default EnoughLicenseDays;
