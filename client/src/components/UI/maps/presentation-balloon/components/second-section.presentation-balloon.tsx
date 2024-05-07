import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
// components
import RowItemMap from "@components/common/map/balloon/row-item.map";
// store
import { getPresentationById } from "@store/presentation/presentations.store";
import {
  getIsCurrentUserRoleCurator,
  getUserNameById
} from "@store/user/users.store";
// utils
import { FormatDate } from "@utils/date/format-date";

interface SecondSectionPresentationBalloonProps {
  presentationId: string;
}

const SecondSectionPresentationBalloon = ({
  presentationId
}: SecondSectionPresentationBalloonProps) => {
  const presentation = useSelector(getPresentationById(presentationId));
  const managerUserData = useSelector(getUserNameById(presentation?.userId));

  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  return (
    <>
      <Typography>
        <b>Дата добавления:</b> {FormatDate(presentation?.created_at)}
      </Typography>
      {isCurrentUserRoleCurator && (
        <RowItemMap title="Менеджер:" subTitle={managerUserData} />
      )}
      {presentation?.curatorComment && (
        <>
          <Typography>
            <b>Комментарий Куратора:</b>
          </Typography>
          <RowItemMap subTitle={presentation?.curatorComment} gap="0" />
        </>
      )}
    </>
  );
};

export default SecondSectionPresentationBalloon;
