import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Loader from "@components/common/loader/loader";
import { getUserLicenseLoadingStatus } from "@store/license/user-license.store";
import {
  licenseTypeActiveId,
  licenseTypeBlockedId,
  licenseTypeTrialId
} from "@data/license/user-license-statuses";

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

const InformItemUsersLayout = ({
  title,
  subtitle,
  unit = null,
  userLicense
}) => {
  const isUserLicenseLoading = useSelector(getUserLicenseLoadingStatus());

  const currentLicenseTypeId = userLicense?.accountType;
  const isLicenseTrialType = currentLicenseTypeId === licenseTypeTrialId;
  const isLicenseActiveType = currentLicenseTypeId === licenseTypeActiveId;
  const isLicenseBlockedType = currentLicenseTypeId === licenseTypeBlockedId;

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
      {!isUserLicenseLoading ? (
        <Container>
          <StyledTypography variant="h4" sx={{ color: getColorIformTerm() }}>
            {subtitle}
          </StyledTypography>
          <StyledTypography variant="h4" sx={{ color: getColorIformTerm() }}>
            {unit}
          </StyledTypography>
        </Container>
      ) : (
        <Loader />
      )}
    </Component>
  );
};

export default InformItemUsersLayout;
