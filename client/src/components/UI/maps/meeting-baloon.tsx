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
import OpenObjectButton from "../../common/map/baloon/open-object-button";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../store/object/open-object-page.store";

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
  const objectAddress = `${object?.location.city}, ${object?.location.address}`;

  const meetingType = useSelector(getMeetingTypeNameById(meeting?.meetingType));
  const status = useSelector(getMeetingStatusNameById(meeting?.status));
  const manager = useSelector(getUserNameById(meeting?.userId));

  const time = FormatTime(meeting?.time);
  const date = FormatDate(meeting?.date);

  const handleOpenObjectPage = () => {
    dispatch(setOpenObjectPageId(objectId));
    dispatch(setOpenObjectPageOpenState(true));
  };

  return (
    <BaloonContainer>
      <Attribute title="Дата встречи:" subTitle={date} />
      <Attribute title="Время встречи:" subTitle={time} />
      <Attribute
        title="Адрес:"
        subTitle={`${meeting?.location?.city}, ${meeting?.location?.address}`}
      />
      <Attribute title="Коммент:" subTitle={meeting?.comment} />

      <DividerStyled />
      <Attribute title="Статус:" subTitle={status} />
      <Attribute title="Повод:" subTitle={meetingType} />
      <Attribute title="Менеджер:" subTitle={manager} />

      <DividerStyled />
      <Typography>
        <b>Объект встречи:</b>
      </Typography>
      <Attribute title="" subTitle={objectAddress} gap="0" />
      <Divider />

      <OpenObjectButton onClick={handleOpenObjectPage} />
    </BaloonContainer>
  );
};

export default MeetingBaloon;
