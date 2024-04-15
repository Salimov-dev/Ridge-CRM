import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import Attribute from "@common/map/baloon/attribute";
import DividerStyled from "@common/divider/divider-styled";
import ButtonStyled from "@components/common/buttons/button-styled.button";
// utils
import { FormatDate } from "@utils/date/format-date";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getObjectById } from "@store/object/objects.store";
import { getPresentationById } from "@store/presentation/presentations.store";
import { getPresentationStatusNameById } from "@store/presentation/presentation-status.store";
import {
  getIsCurrentUserRoleCurator,
  getUserNameById
} from "@store/user/users.store";

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

const PresentationBalloon = React.memo(({ presentationId, setState }) => {
  const presentation = useSelector(getPresentationById(presentationId));

  const object = useSelector(getObjectById(presentation?.objectId));
  const objectId = presentation?.objectId;
  const objectAddress = `${object?.city}, ${object?.address}`;

  const managerUserData = useSelector(getUserNameById(presentation?.userId));
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const status = useSelector(
    getPresentationStatusNameById(presentation?.status)
  );

  const { handleOpenObjectPage, handleOpenUpdatePresentationPage } =
    useDialogHandlers(setState);

  return (
    <BaloonContainer>
      <Typography>
        <b>Объект презентации:</b>
      </Typography>
      <Attribute gap="0" subTitle={objectAddress} />
      <Attribute title="Статус:" subTitle={status} />

      <DividerStyled />
      <Typography>
        <b>Дата добавления:</b> {FormatDate(presentation?.created_at)}
      </Typography>
      {isCurrentUserRoleCurator && (
        <Attribute title="Менеджер:" subTitle={managerUserData} />
      )}
      {presentation?.curatorComment && (
        <>
          <Typography>
            <b>Комментарий Куратора:</b>
          </Typography>
          <Attribute subTitle={presentation?.curatorComment} gap="0" />
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
});

export default PresentationBalloon;
