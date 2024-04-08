import dayjs from "dayjs";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Typography, Tooltip, Box } from "@mui/material";
import { useSelector } from "react-redux";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import { pluralizeDays } from "@utils/date/pluralize-days";
import { makeDigitSeparator } from "@utils/data/make-digit-separator";
// store
import { getUserLicensesByUserId } from "@store/user/user-license.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import { userLicenseStatusesArray } from "@data/users/user-license-statuses";

const Component = styled(Box)`
  width: fit-content;
  display: flex;
  gap: 6px;
  justify-content: start;
`;

const Element = styled(Typography)`
  color: gray;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const TopBarCurrentDate = () => {
  const navigate = useNavigate();
  const currentDate = dayjs();
  const formattedDate = capitalizeFirstLetter(
    currentDate.format("dddd, D MMM")
  ).replace(/\.$/, "");

  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));

  const trialLicenseTypeId = "71pbfi4954itj045tloop001";
  const blockedLicenseTypeId = "71kbjld394u5jgfdsjk4l003";
  const currentLicenseTypeId = userLicense?.accountType;
  const isLicenseBlockedType = currentLicenseTypeId === blockedLicenseTypeId;
  const isLicenseTrialType = currentLicenseTypeId === trialLicenseTypeId;

  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const dateEnd = dayjs(userLicense?.dateEnd);
  const daysDifference =
    dateEnd?.diff(dayjs(), "day") + (isLicenseTrialType ? 1 : 0);
  const licenseBalance = makeDigitSeparator(userLicense?.balance);

  const getAccountType = () => {
    const accountType = userLicense?.accountType;

    const result = userLicenseStatusesArray.find(
      (role) => role._id === accountType
    )?.name;
    return result;
  };

  return (
    <Component>
      <Tooltip
        title="Текущая дата"
        placement="top-start"
        arrow
        onClick={() => navigate("/calendar")}
      >
        <Element variant="h5">{formattedDate} </Element>
      </Tooltip>
      {isCurator ? (
        <>
          <Typography color="grey">|</Typography>
          <Tooltip
            title="Баланса хватит на"
            placement="top-start"
            arrow
            onClick={() => navigate("/users")}
          >
            <Element variant="h5">
              {!isLicenseBlockedType ? licenseBalance : 0}₽
              {/* {!isLicenseBlockedType
                ? `${daysDifference} ${pluralizeDays(daysDifference)}`
                : 0} */}
            </Element>
          </Tooltip>
          <Typography color="grey">|</Typography>
          <Tooltip
            title="Текущий баланс"
            placement="top-start"
            arrow
            onClick={() => navigate("/users")}
          >
            <Element variant="h5">
              {getAccountType()}
              {/* {!trialLicenseTypeId ? `${licenseBalance}₽` : "демо"} */}
            </Element>
          </Tooltip>
        </>
      ) : null}
    </Component>
  );
};

export default TopBarCurrentDate;
