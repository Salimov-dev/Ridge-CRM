import styled from "@emotion/styled";
import { Typography, Box } from "@mui/material";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0 4px 0;
`;

const EnoughLicenseDate = ({ newLicenseDate }) => {
  return (
    <Component>
      <Typography variant="h4" sx={{ textAlign: "center", marginRight: "4px" }}>
        Можно пользоваться до:
      </Typography>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", color: "red", fontWeight: "bold" }}
      >
        {newLicenseDate}
      </Typography>
    </Component>
  );
};

export default EnoughLicenseDate;
