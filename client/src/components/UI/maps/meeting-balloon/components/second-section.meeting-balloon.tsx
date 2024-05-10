import { FC } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import RowItemMap from "@components/common/map/balloon/row-item.map";
// store
import { getMeetingStatusNameById } from "@store/meeting/meeting-status.store";
import { getUserNameById } from "@store/user/users.store";
import { getMeetingById } from "@store/meeting/meetings.store";
import { getObjectById } from "@store/object/objects.store";

interface SecondSectionMeetingBalloonProps {
  meetingId: string;
}

const MeetingObject = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SecondSectionMeetingBalloon: FC<SecondSectionMeetingBalloonProps> = ({
  meetingId
}) => {
  const meeting = useSelector(getMeetingById(meetingId));
  const status = useSelector(getMeetingStatusNameById(meeting?.status));
  const manager = useSelector(getUserNameById(meeting?.userId));

  const objectId = meeting?.objectId;
  const object = useSelector(getObjectById(objectId));
  const objectAddress = `${object?.city}, ${object?.address}`;

  return (
    <>
      <RowItemMap title="Статус:" subTitle={status} />
      <RowItemMap title="Менеджер:" subTitle={manager} />
      {objectId && (
        <MeetingObject>
          <Typography>
            <b>Объект встречи:</b>
          </Typography>
          <Typography>{objectAddress}</Typography>
        </MeetingObject>
      )}
    </>
  );
};

export default SecondSectionMeetingBalloon;
