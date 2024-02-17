import styled from "@emotion/styled";
import { Typography, Box } from "@mui/material";
import { FormatDate } from "@utils/date/format-date";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0 4px 0;
`;

const EnoughLicenseDate = ({ newLicenseDate }) => {
  return (
    <Component>
      <Typography variant="h5" sx={{ textAlign: "center", marginRight: "4px" }}>
        Можно будет пользоваться до:
      </Typography>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", color: "red", fontWeight: "bold" }}
      >
        {FormatDate(newLicenseDate)}
      </Typography>
    </Component>
  );
};

export default EnoughLicenseDate;
