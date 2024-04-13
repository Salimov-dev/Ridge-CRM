import React from "react";
import { useSelector } from "react-redux";
import { Box, Divider, Typography, styled } from "@mui/material";
// components
import Attribute from "@common/map/baloon/attribute";
import DividerStyled from "@common/divider/divider-styled";
import ButtonStyled from "@components/common/buttons/button-styled.button";
// utils
import { FormatDate } from "@utils/date/format-date";
// store
import { getObjectById } from "@store/object/objects.store";
import { getPresentationById } from "@store/presentation/presentations.store";
import { getPresentationStatusNameById } from "@store/presentation/presentation-status.store";
import {
  getCurrentUserId,
  getIsUserCurator,
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

const PresentationBalloon = React.memo(
  ({ presentationId, onOpenObjectPage, onOpenUpdatePresentationPage }) => {
    const presentation = useSelector(getPresentationById(presentationId));

    const object = useSelector(getObjectById(presentation?.objectId));
    const objectId = presentation?.objectId;
    const objectAddress = `${object?.city}, ${object?.address}`;

    const currentUserId = useSelector(getCurrentUserId());
    const isCurator = useSelector(getIsUserCurator(currentUserId));
    const manager = useSelector(getUserNameById(presentation?.userId));

    const status = useSelector(
      getPresentationStatusNameById(presentation?.status)
    );

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
        {isCurator && <Attribute title="Менеджер:" subTitle={manager} />}
        {presentation?.curatorComment && (
          <>
            <Typography>
              <b>Комментарий Куратора:</b>
            </Typography>
            <Attribute subTitle={presentation?.curatorComment} gap="0" />
          </>
        )}

        {objectId ? (
          <>
            <Divider />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "4px"
              }}
            >
              <ButtonStyled
                title="Страница объекта"
                style="OBJECT"
                size="small"
                onClick={() => onOpenObjectPage(objectId)}
              />
              <ButtonStyled
                title="Править презентацию"
                style="PRESENTATION"
                size="small"
                onClick={() => onOpenUpdatePresentationPage(presentationId)}
              />
            </Box>
          </>
        ) : null}
      </BaloonContainer>
    );
  }
);

export default PresentationBalloon;
