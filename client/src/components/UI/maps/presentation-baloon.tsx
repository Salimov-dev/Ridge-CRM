import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Typography, styled } from "@mui/material";
// utils
import { FormatDate } from "../../../utils/date/format-date";
// store
import {
  getCurrentUserId,
  getIsUserCurator,
  getUserNameById,
} from "../../../store/user/users.store";
import { getObjectById } from "../../../store/object/objects.store";
// components
import Attribute from "../../common/map/baloon/attribute";
import DividerStyled from "../../common/divider/divider-styled";
import MultiColorOutlinedButton from "../../common/buttons/multi-color-outlined-button";
// store
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../store/object/open-object-page.store";
import { getPresentationById } from "../../../store/presentation/presentations.store";
import { getPresentationStatusNameById } from "../../../store/presentation/presentation-status.store";
import {
  setUpdatePresentationId,
  setUpdatePresentationOpenState,
} from "../../../store/presentation/update-presentation.store";
import React from "react";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
`;

const PresentationBaloon = React.memo(({ presentationId }) => {
  const dispatch = useDispatch();
  const presentation = useSelector(getPresentationById(presentationId));

  const object = useSelector(getObjectById(presentation?.objectId));
  const objectId = presentation?.objectId;
  const objectAddress = `${object?.location.city}, ${object?.location.address}`;

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const manager = useSelector(getUserNameById(presentation?.userId));

  const status = useSelector(
    getPresentationStatusNameById(presentation?.status)
  );

  const handleOpenObjectPage = () => {
    dispatch<any>(setOpenObjectPageId(objectId));
    dispatch<any>(setOpenObjectPageOpenState(true));
  };

  const handleOpenUpdatePresentation = () => {
    dispatch<any>(setUpdatePresentationId(presentationId));
    dispatch<any>(setUpdatePresentationOpenState(true));
  };

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
          <Box sx={{ width: "100%", display: "flex", gap: "4px" }}>
            <MultiColorOutlinedButton
              text="Править презентацию"
              fontColor="black"
              borderColor="SaddleBrown"
              backgroundHover="Chocolate"
              onClick={handleOpenUpdatePresentation}
            />
            <MultiColorOutlinedButton
              text="Страница объекта"
              fontColor="black"
              borderColor="SlateGrey"
              backgroundHover="ForestGreen"
              onClick={handleOpenObjectPage}
            />
          </Box>
        </>
      ) : null}
    </BaloonContainer>
  );
});

export default PresentationBaloon;
