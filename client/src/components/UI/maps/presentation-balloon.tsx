import React, { FC, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import DividerStyled from "@common/divider/divider-styled";
import ButtonStyled from "@components/common/buttons/button-styled.button";
// utils
import { FormatDate } from "@utils/date/format-date";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getObjectAddressById } from "@store/object/objects.store";
import { getPresentationById } from "@store/presentation/presentations.store";
import { getPresentationStatusNameById } from "@store/presentation/presentation-status.store";
import {
  getIsCurrentUserRoleCurator,
  getUserNameById
} from "@store/user/users.store";
import { IDialogPagesState } from "src/types/dialog-pages/dialog-pages-state.interface";
import RowItemMap from "@components/common/map/balloon/row-item.map";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
`;

const ButtonsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 4px;
  margin: 6px 0 0 0;
`;

interface SetStateFunction<T> {
  (value: SetStateAction<T>): void;
}

interface PresentationBalloonProps {
  presentationId: string;
  setState: SetStateFunction<IDialogPagesState>;
}

const PresentationBalloon: FC<PresentationBalloonProps> = React.memo(
  ({ presentationId, setState }) => {
    const presentation = useSelector(getPresentationById(presentationId));

    const objectId = presentation?.objectId;
    const objectAddress = useSelector(getObjectAddressById(objectId));

    const managerUserData = useSelector(getUserNameById(presentation?.userId));
    const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

    const presentationStatus = useSelector(
      getPresentationStatusNameById(presentation?.status)
    );

    const { handleOpenObjectPage, handleOpenUpdatePresentationPage } =
      useDialogHandlers(setState);

    return (
      <BaloonContainer>
        <Typography>
          <b>Объект презентации:</b>
        </Typography>
        <RowItemMap gap="0" subTitle={objectAddress} />
        <RowItemMap title="Статус:" subTitle={presentationStatus} />

        <DividerStyled />
        <Typography>
          <b>Дата добавления:</b> {FormatDate(presentation?.created_at)}
        </Typography>
        {isCurrentUserRoleCurator && (
          <RowItemMap title="Менеджер:" subTitle={managerUserData} />
        )}
        {presentation?.curatorComment && (
          <>
            <Typography>
              <b>Комментарий Куратора:</b>
            </Typography>
            <RowItemMap subTitle={presentation?.curatorComment} gap="0" />
          </>
        )}

        {objectId ? (
          <ButtonsContainer>
            <ButtonStyled
              title="Страница объекта"
              style="OBJECT"
              size="small"
              onClick={() => handleOpenObjectPage(objectId)}
            />
            <ButtonStyled
              title="Править презентацию"
              style="PRESENTATION"
              size="small"
              onClick={() => handleOpenUpdatePresentationPage(presentationId)}
            />
          </ButtonsContainer>
        ) : null}
      </BaloonContainer>
    );
  }
);

export default PresentationBalloon;
