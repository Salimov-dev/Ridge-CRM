// libraries
import { tokens } from "@theme/theme";
import { useTheme } from "@emotion/react";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
// components
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import ContentCreateMeetingPage from "./components/content.create-meeting-page";
// hooks
import useFindObject from "@hooks/object/use-find-object";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import { getCurrentUserId } from "@store/user/users.store";
import { getUserLicensesByUserId } from "@store/license/user-license.store";

interface CreateMeetingProps {
  state: IDialogPagesState;
  onClose: () => void;
}

const CreateMeeting: FC<CreateMeetingProps> = React.memo(
  ({ state, onClose }): JSX.Element => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isLoading, setIsLoading] = useState(false);

    const currentUserId = useSelector(getCurrentUserId());
    const userLicense = useSelector(getUserLicensesByUserId(currentUserId));

    const {
      getCity,
      getAddress,
      getLatitudeCoordinates,
      getLongitudeCoordinates,
      findedObject
    } = useFindObject();

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
      <>
        <HeaderWithCloseButtonForPage
          title={getHeaderTitle()}
          color={!isEmptyFindedObject ? "white" : "black"}
          background={getColorHeaderTitle()}
          onClose={onClose}
        />
        <ContentCreateMeetingPage
          state={state}
          onClose={onClose}
          setIsLoading={setIsLoading}
          getCity={getCity}
          getAddress={getAddress}
          getLatitudeCoordinates={getLatitudeCoordinates}
          getLongitudeCoordinates={getLongitudeCoordinates}
          findedObject={findedObject}
        />
        <LoaderFullWindow
          color={colors.grey[600]}
          size={75}
          isLoading={isLoading}
        />
      </>
    );
  }
);

export default CreateMeeting;
