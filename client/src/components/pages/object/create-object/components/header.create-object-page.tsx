import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import { useTheme } from "@emotion/react";
import { getUserLicensesByUserId } from "@store/license/user-license.store";
import { getCurrentUserId } from "@store/user/users.store";
import { tokens } from "@theme/theme";
import { FC } from "react";
import { useSelector } from "react-redux";

interface HeaderCreateObjectPageProps {
  findedObject: Record<string, any>;
  onClose: () => void;
  getCity: () => void;
  getAddress: () => void;
}

const HeaderCreateObjectPage: FC<HeaderCreateObjectPageProps> = ({
  findedObject,
  getCity,
  getAddress,
  onClose
}): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isFindedObject = Boolean(Object.keys(findedObject)?.length);
  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));

  const getHeaderTitle = () => {
    if (!userLicense?.quantityClicksOnMap) {
      return "Клики по карте на сегодня закончились, попробуйте завтра";
    }
    if (!isFindedObject) {
      return "КЛИКНИТЕ по карте, чтобы выбрать объект";
    }
    if (isFindedObject) {
      return `Создать объект: ${getCity()}, ${getAddress()}`;
    }
  };

  const getColorHeaderTitle = () => {
    if (!userLicense?.quantityClicksOnMap) {
      return colors.error["red"];
    }
    if (!isFindedObject) {
      return colors.error["red"];
    }
    if (isFindedObject) {
      return colors.header["gold"];
    }
  };

  return (
    <HeaderWithCloseButtonForPage
      title={getHeaderTitle()}
      color={!isFindedObject ? "white" : "black"}
      margin="0 0 20px 0"
      background={getColorHeaderTitle()}
      onClose={onClose}
    />
  );
};

export default HeaderCreateObjectPage;
