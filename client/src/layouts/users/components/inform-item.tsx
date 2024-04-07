import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 6px;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
  gap: 4px;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
`;

const InformItem = ({
  title,
  subtitle,
  unit = null,
  color = "yellow",
  userLicense
}) => {
  const trialLicenseTypeId = "71pbfi4954itj045tloop001";
  const activeLicenseTypeId = "718gkgdbn48jgfo3kktjt002";
  const blockedLicenseTypeId = "71kbjld394u5jgfdsjk4l003";

  const currentLicenseTypeId = userLicense?.accountType;
  const isLicenseTrialType = currentLicenseTypeId === trialLicenseTypeId;
  const isLicenseActiveType = currentLicenseTypeId === activeLicenseTypeId;
  const isLicenseBlockedType = currentLicenseTypeId === blockedLicenseTypeId;

  const getColorIformTerm = () => {
    if (isLicenseTrialType) return "yellow";
    if (isLicenseActiveType) return "LimeGreen";
    if (isLicenseBlockedType) return "firebrick";
  };

  return (
    <Component>
      <StyledTypography variant="h5" sx={{ fontWeight: "bold" }}>
        {title}
      </StyledTypography>
      <Container>
        <StyledTypography variant="h4" sx={{ color: getColorIformTerm() }}>
          {subtitle}
        </StyledTypography>
        <StyledTypography variant="h4" sx={{ color: getColorIformTerm() }}>
          {unit}
        </StyledTypography>
      </Container>
    </Component>
  );
};

export default InformItem;
