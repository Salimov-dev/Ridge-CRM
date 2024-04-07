import styled from "@emotion/styled";
import { Typography, Box } from "@mui/material";
import { pluralizeDays } from "@utils/date/pluralize-days";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0 4px 0;
`;

const EnoughLicenseDays = ({ newDaysQuantity, userLicense }) => {
  const trialLicenseTypeId = "71pbfi4954itj045tloop001";
  const isLicenseTypeTrial = userLicense?.accountType === trialLicenseTypeId;

  return (
    <Component>
      <Typography variant="h5" sx={{ textAlign: "center", marginRight: "4px" }}>
        {isLicenseTypeTrial
          ? "ДОПОЛНИТЕЛЬНО (от даты пополнения)  хватит на:"
          : "Введенного баланса ДОПОЛНИТЕЛЬНО хватит на:"}
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
