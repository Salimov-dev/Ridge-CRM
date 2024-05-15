import { tokens } from "@theme/theme";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import { getUserLicensesByUserId } from "@store/license/user-license.store";
import { getCurrentUserId } from "@store/user/users.store";

interface HeaderCreateMeetinPageProps {
  findedObject: Record<string, any>;
  onClose: () => void;
  getCity: () => void;
  getAddress: () => void;
}

const HeaderCreateMeetinPage: FC<HeaderCreateMeetinPageProps> = ({
  onClose,
  findedObject,
  getCity,
  getAddress
}): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));

  const isEmptyFindedObject = !!Object.keys(findedObject)?.length;

  const getHeaderTitle = () => {
    if (!userLicense?.quantityClicksOnMap) {
      return "Клики по карте на сегодня закончились, попробуйте завтра";
    }
    if (!isEmptyFindedObject) {
      return "КЛИКНИТЕ по карте, чтобы выбрать место встречи";
    }
    if (isEmptyFindedObject) {
      return `Встреча по адресу: ${getCity()}, ${getAddress()}`;
    }
  };

  const getColorHeaderTitle = () => {
    if (!userLicense?.quantityClicksOnMap) {
      return colors.error["red"];
    }
    if (!isEmptyFindedObject) {
      return colors.error["red"];
    }
    if (isEmptyFindedObject) {
      return colors.header["gold"];
    }
  };

  return (
    <HeaderWithCloseButtonForPage
      title={getHeaderTitle()}
      color={!isEmptyFindedObject ? "white" : "black"}
      background={getColorHeaderTitle()}
      onClose={onClose}
    />
  );
};

export default HeaderCreateMeetinPage;
