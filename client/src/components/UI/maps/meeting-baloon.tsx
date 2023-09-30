import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Typography, styled } from "@mui/material";
// utils
import { FormatDate } from "../../../utils/date/format-date";
import { FormatTime } from "../../../utils/date/format-time";
// store
import { getUserNameById } from "../../../store/user/users.store";
import { getObjectById } from "../../../store/object/objects.store";
import { getMeetingTypeNameById } from "../../../store/meeting/meeting-types.store";
import { getMeetingStatusNameById } from "../../../store/meeting/meeting-status.store";
// components
import Attribute from "../../common/map/baloon/attribute";
import DividerStyled from "../../common/divider/divider-styled";

import MultiColorOutlinedButton from "../../common/buttons/multi-color-outlined-button";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../store/object/open-object-page.store";
import {
  setUpdateMeetingId,
  setUpdateMeetingOpenState,
} from "../../../store/meeting/update-meeting.store";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
`;

const MeetingBaloon = ({ meeting }) => {
  const dispatch = useDispatch();
  const object = useSelector(getObjectById(meeting?.objectId));
  const objectId = meeting?.objectId;
  const meetingId = meeting?._id;
  const objectAddress = `${object?.location.city}, ${object?.location.address}`;

  const meetingType = useSelector(getMeetingTypeNameById(meeting?.meetingType));
  const status = useSelector(getMeetingStatusNameById(meeting?.status));
  const manager = useSelector(getUserNameById(meeting?.userId));

  const time = FormatTime(meeting?.time);
  const date = FormatDate(meeting?.date);

  const handleOpenObjectPage = () => {
    dispatch<any>(setOpenObjectPageId(objectId));
    dispatch<any>(setOpenObjectPageOpenState(true));
  };

  const handleOpenUpdateMeeting = () => {
    dispatch<any>(setUpdateMeetingId(meetingId));
    dispatch<any>(setUpdateMeetingOpenState(true));
  };

  return (
    <BaloonContainer>
      <Attribute title="Дата встречи:" subTitle={date} />
      <Attribute title="Время встречи:" subTitle={time} />
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
      <Attribute title="Повод:" subTitle={meetingType} />
      <Attribute title="Менеджер:" subTitle={manager} />

      {objectId ? (
        <>
          <DividerStyled />
          <Typography>
            <b>Объект встречи:</b>
          </Typography>
          <Attribute title="" subTitle={objectAddress} gap="0" />
          <Divider />
          <Box sx={{width: "100%",display: 'flex', gap: '4px'}}>
            <MultiColorOutlinedButton
              text="Править встречу"
              fontColor="black"
              borderColor="royalBlue"
              backgroundHover="cornflowerBlue"
              onClick={handleOpenUpdateMeeting}
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
};

export default MeetingBaloon;
