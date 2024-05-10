import { FC } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import RowItemMap from "@components/common/map/balloon/row-item.map";
import DividerStyled from "@common/divider/divider-styled";
// utils
import { FormatTime } from "@utils/date/format-time";
import { FormatDate } from "@utils/date/format-date";
// store
import { getMeetingTypeNameById } from "@store/meeting/meeting-types.store";
import { getMeetingById } from "@store/meeting/meetings.store";

interface FirstSectionMeetingBalloonProps {
  meetingId: string;
}

const DateAndTimeMeeting = styled(Box)`
  display: flex;
  gap: 4px;
`;

const FirstSectionMeetingBalloon: FC<FirstSectionMeetingBalloonProps> = ({
  meetingId
}) => {
  const meeting = useSelector(getMeetingById(meetingId));
  const meetingType = useSelector(getMeetingTypeNameById(meeting?.type));
  const time = FormatTime(meeting?.time);
  const date = FormatDate(meeting?.date);

  return (
    <>
      <DateAndTimeMeeting>
        <Typography>
          <b>Встреча:</b>
        </Typography>
        <Typography>
          {date} в {time}
        </Typography>
      </DateAndTimeMeeting>
      <RowItemMap title="Тип:" subTitle={meetingType} />
      <Typography>
        <b>Адрес встречи:</b>
      </Typography>
      <RowItemMap gap="0" subTitle={`${meeting?.city}, ${meeting?.address}`} />
      <Typography>
        <b>Комментарий:</b>
      </Typography>
      <RowItemMap subTitle={meeting?.comment} gap="0" />
      <DividerStyled />
    </>
  );
};

export default FirstSectionMeetingBalloon;
