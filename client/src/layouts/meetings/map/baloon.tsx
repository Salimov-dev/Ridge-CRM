import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Typography, styled } from "@mui/material";
// utils
import { FormatDate } from "../../../utils/format-date";
import { FormatTime } from "../../../utils/format-time";
// store
import { getUserNameById } from "../../../store/users.store";
import { getObjectById } from "../../../store/objects.store";
import { getMeetingTypeNameById } from "../../../store/meeting-types.store";
import { getMeetingStatusNameById } from "../../../store/meeting-status.store";
// components
import DividerStyled from "../../../components/common/divider/divider-styled";
import Attribute from "../../../components/common/map/baloon/attribute";
import OpenObjectButton from "../../../components/common/map/baloon/open-object-button";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
`;

const Baloon = ({ meeting }) => {
  const object = useSelector(getObjectById(meeting?.objectId));
  const objectId = meeting?.objectId;
  const objectAddress = `${object?.location.city}, ${object?.location.address}`;
  const meetingType = useSelector(getMeetingTypeNameById(meeting?.meetingType));
  const status = useSelector(getMeetingStatusNameById(meeting?.status));
  const manager = useSelector(getUserNameById(meeting?.userId));
  const time = FormatTime(new Date(meeting?.time));
  const date = FormatDate(meeting?.date);

  return (
    <BaloonContainer>
      <Attribute
        title="Дата встречи:"
        subTitle={date}
        withoutTypography={true}
      />
      <Attribute
        title="Время встречи:"
        subTitle={time}
        withoutTypography={true}
      />
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
      <Attribute title={null} subTitle={objectAddress} />
      <Divider />

      <OpenObjectButton path={`/objects/${objectId}`} />
    </BaloonContainer>
  );
};

export default Baloon;
