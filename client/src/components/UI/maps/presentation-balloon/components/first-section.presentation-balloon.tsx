import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
// components
import RowItemMap from "@components/common/map/balloon/row-item.map";
import DividerStyled from "@components/common/divider/divider-styled";
// store
import { getObjectAddressById } from "@store/object/objects.store";
import { getPresentationById } from "@store/presentation/presentations.store";
import { getPresentationStatusNameById } from "@store/presentation/presentation-statuses.store";

interface FirstSectionPresentationBalloonProps {
  presentationId: string;
}

const FirstSectionPresentationBalloon = ({
  presentationId
}: FirstSectionPresentationBalloonProps) => {
  const presentation = useSelector(getPresentationById(presentationId));

  const objectId = presentation?.objectId;
  const objectAddress = useSelector(getObjectAddressById(objectId));

  const presentationStatus = useSelector(
    getPresentationStatusNameById(presentation?.status)
  );

  return (
    <>
      <Typography>
        <b>Объект презентации:</b>
      </Typography>
      <RowItemMap gap="0" subTitle={objectAddress} />
      <RowItemMap title="Статус:" subTitle={presentationStatus} />
      <DividerStyled />
    </>
  );
};

export default FirstSectionPresentationBalloon;
