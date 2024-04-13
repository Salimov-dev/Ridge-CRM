import React from "react";
import { useSelector } from "react-redux";
import { Box, Divider, Typography, styled } from "@mui/material";
// components
import Attribute from "@common/map/baloon/attribute";
import DividerStyled from "@common/divider/divider-styled";
import ButtonStyled from "@components/common/buttons/button-styled.button";
// utils
import { FormatDate } from "@utils/date/format-date";
import { FormatTime } from "@utils/date/format-time";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getUserNameById } from "@store/user/users.store";
import { getObjectById } from "@store/object/objects.store";
import { getMeetingStatusNameById } from "@store/meeting/meeting-status.store";
import { getMeetingTypeNameById } from "@store/meeting/meeting-types.store";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
`;

const MeetingBalloon = React.memo(({ meeting, setState }) => {
  const object = useSelector(getObjectById(meeting?.objectId));
  const objectId = meeting?.objectId;
  const meetingId = meeting?._id;
  const objectAddress = `${object?.city}, ${object?.address}`;

  const meetingType = useSelector(getMeetingTypeNameById(meeting?.type));
  const status = useSelector(getMeetingStatusNameById(meeting?.status));
  const manager = useSelector(getUserNameById(meeting?.userId));

  const time = FormatTime(meeting?.time);
  const date = FormatDate(meeting?.date);

  const { handleOpenUpdateMeetingPage, handleOpenObjectPage } =
    useDialogHandlers(setState);

  return (
    <BaloonContainer>
      <Attribute title="Дата встречи:" subTitle={date} />
      <Attribute title="Время встречи:" subTitle={time} />
      <Attribute title="Тип:" subTitle={meetingType} />
      <Typography>
        <b>Адрес встречи:</b>
      </Typography>
      <Attribute gap="0" subTitle={`${meeting?.city}, ${meeting?.address}`} />
      <Typography>
        <b>Комментарий:</b>
      </Typography>
      <Attribute subTitle={meeting?.comment} gap="0" />

      <DividerStyled />
      <Attribute title="Статус:" subTitle={status} />
      <Attribute title="Менеджер:" subTitle={manager} />

      <ButtonStyled
        title="Править встречу"
        style="MEETING"
        size="small"
        width="100%"
        onClick={() => handleOpenUpdateMeetingPage(meetingId)}
      />

      {objectId ? (
        <>
          <DividerStyled />
          <Typography>
            <b>Объект встречи:</b>
          </Typography>
          <Attribute title="" subTitle={objectAddress} gap="0" />
          <Divider />

          <ButtonStyled
            title="Страница объекта"
            style="OBJECT"
            width="100%"
            size="small"
            onClick={() => handleOpenObjectPage(objectId)}
          />
        </>
      ) : null}
    </BaloonContainer>
  );
});

export default MeetingBalloon;
