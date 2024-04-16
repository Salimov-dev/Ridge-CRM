import dayjs from "dayjs";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Typography, Tooltip, Box } from "@mui/material";
import { useSelector } from "react-redux";
// data
import {
  licenseTypeBlockedId,
  userLicenseStatusesArray
} from "@data/users/user-license-statuses";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import { makeDigitSeparator } from "@utils/data/make-digit-separator";
// store
import { getUserLicensesByUserId } from "@store/user/user-license.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";

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
  const currentLicenseTypeId = userLicense?.accountType;
  const licenseBalance = makeDigitSeparator(userLicense?.balance);

  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isLicenseBlockedType = currentLicenseTypeId === licenseTypeBlockedId;

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
            </Element>
          </Tooltip>
          <Typography color="grey">|</Typography>
          <Tooltip
            title="Текущий баланс"
            placement="top-start"
            arrow
            onClick={() => navigate("/users")}
          >
            <Element variant="h5">{getAccountType()}</Element>
          </Tooltip>
        </>
      ) : null}
    </Component>
  );
};

export default TopBarCurrentDate;
