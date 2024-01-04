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
// store
import { getUserNameById } from "@store/user/users.store";
import { getObjectById } from "@store/object/objects.store";
import { getMeetingTypeNameById } from "@store/meeting/meeting-types.store";
import { getMeetingStatusNameById } from "@store/meeting/meeting-status.store";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
`;

const MeetingBaloon = React.memo(
  ({ meeting, onOpenObjectPage, onOpenUpdateMeetingPage }) => {
    const object = useSelector(getObjectById(meeting?.objectId));
    const objectId = meeting?.objectId;
    const meetingId = meeting?._id;
    const objectAddress = `${object?.location.city}, ${object?.location.address}`;

    const meetingType = useSelector(
      getMeetingTypeNameById(meeting?.meetingType)
    );
    const status = useSelector(getMeetingStatusNameById(meeting?.status));
    const manager = useSelector(getUserNameById(meeting?.userId));

    const time = FormatTime(meeting?.time);
    const date = FormatDate(meeting?.date);

    return (
      <BaloonContainer>
        <Attribute title="Дата встречи:" subTitle={date} />
        <Attribute title="Время встречи:" subTitle={time} />
        <Attribute title="Повод:" subTitle={meetingType} />
        <Typography>
          <b>Адрес:</b>
        </Typography>
        <Attribute
          gap="0"
          subTitle={`${meeting?.location?.city}, ${meeting?.location?.address}`}
        />
        <Typography>
          <b>Коммент:</b>
        </Typography>
        <Attribute subTitle={meeting?.comment} gap="0" />

        <DividerStyled />
        <Attribute title="Статус:" subTitle={status} />
        <Attribute title="Менеджер:" subTitle={manager} />

        {objectId ? (
          <>
            <DividerStyled />
            <Typography>
              <b>Объект встречи:</b>
            </Typography>
            <Attribute title="" subTitle={objectAddress} gap="0" />
            <Divider />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <ButtonStyled
                title="Страница объекта"
                style="OBJECT"
                size="small"
                onClick={() => onOpenObjectPage(objectId)}
              />
              <ButtonStyled
                title="Править встречу"
                style="MEETING"
                size="small"
                onClick={() => onOpenUpdateMeetingPage(meetingId)}
              />
            </Box>
          </>
        ) : null}
      </BaloonContainer>
    );
  }
);

export default MeetingBaloon;
