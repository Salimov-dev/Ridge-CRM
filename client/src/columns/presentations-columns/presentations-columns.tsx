// libraries
import { useDispatch, useSelector } from "react-redux";
// components
import MultiColorContainedButton from "../../components/common/buttons/multi-color-contained-button";
import {
  FormatPhone,
  UserAvatar,
} from "../../components/common/table/helpers/helpers";
// mock
import { gendersArray } from "../../mock/genders";
// store
import { getCurrentUserId, getIsUserAuthorThisEntity, getUserNameById } from "../../store/user/users.store";
import { getUserStatusNameById } from "../../store/user/user-statuses.store";
// utils
import { FormatDate } from "../../utils/date/format-date";
import {
  setUpdateManagerId,
  setUpdateManagerOpenState,
} from "../../store/user/update-user.store";
import { AlignCenter } from "../../components/common/columns/styled";
import Loader from "../../components/common/loader/loader";
import RedirectButton from "../../components/common/buttons/redirect-button";
import { loadOpenObjectPageOpenState, setOpenObjectPageId, setOpenObjectPageOpenState } from "../../store/object/open-object-page.store";
import { getObjectById } from "../../store/object/objects.store";
import { Box, Button, Tooltip } from "@mui/material";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";

export const presentationsColumns = [
  {
    accessorKey: "created_at",
    header: "Дата",
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter> ;
    },
  },
  {
    accessorKey: "objectId",
    header: "Объект встречи",
    cell: (info) => {
      const objectId = info.getValue();
      const object = useSelector(getObjectById(objectId));
      const fullAddress = `${object?.location.city}, ${object?.location.address}`;
      const isObjectPage = useSelector(loadOpenObjectPageOpenState());
      const dispatch = useDispatch();

      const handleClick = () => {
        dispatch<any>(setOpenObjectPageId(objectId));
        dispatch<any>(setOpenObjectPageOpenState(true));
      };

      return objectId ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {fullAddress}
          {!isObjectPage && objectId ? (
            <RedirectButton
              text="Открыть"
              color="neutral"
              onClick={handleClick}
            />
          ) : null}
        </Box>
      ) : (
        <AlignCenter>-</AlignCenter>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: (info) => {
      const status = info.getValue();
      // const name = useSelector(getMeetingStatusNameById(status));
      // return <AlignCenter>{name}</AlignCenter>;
      return <AlignCenter>Статус</AlignCenter>;
    },
  },
  {
    accessorKey: "curatorComment",
    header: "Комментарий Куратора",
    cell: (info) => {
      const curatorComment = info.getValue();
      // const name = useSelector(getMeetingStatusNameById(status));
      // return <AlignCenter>{name}</AlignCenter>;
      return curatorComment
    },
  },
  {
    accessorKey: "cloudLink",
    header: "Облако",
    cell: (info) => {
      const cloudLink = info.getValue();

      const handleOpenCloud = () => {
        const cloudLink = info.getValue();

        if (cloudLink) {
          window.open(cloudLink, "_blank"); // Открывает ссылку в новой вкладке браузера
        }
      };
      return cloudLink?.length ? (
        <AlignCenter>
          <Tooltip title="Открыть облако" placement="top-start" arrow>
            <Button onClick={handleOpenCloud}>
              <CloudDoneIcon sx={{ color: "white" }} />
            </Button>
          </Tooltip>
        </AlignCenter>
      ) : (
        <AlignCenter>
          <Tooltip title="Облако отсутствует" placement="top-start" arrow>
            <CloudOffIcon sx={{ color: "white" }} />
          </Tooltip>
        </AlignCenter>
      );
    },
  },
  {
    accessorKey: "_id",
    header: "",
    cell: (info) => {
      // const meetingId = info.getValue();
      // const meeting = useSelector(getMeetingById(meetingId))
      // const dispatch = useDispatch();
      // const currentUserId = useSelector(getCurrentUserId())
      // const isAuthorEntity = useSelector(
      //   getIsUserAuthorThisEntity(currentUserId, meeting)
      // );

      const handleClick = () => {
        // dispatch<any>(setUpdateMeetingId(meetingId));
        // dispatch<any>(setUpdateMeetingOpenState(true));
      };

      return (
        <MultiColorContainedButton
          text="Править"
          fontColor="white"
          background="royalBlue"
          backgroudHover="cornflowerBlue"
          onClick={handleClick}
          // disabled={!isAuthorEntity}
        />
      );
    },
  },

      // {
      //   accessorKey: "name.firstName",
      //   header: "Имя",
      //   cell: (info) => {
      //     const firstName = info.getValue();
      //     return <AlignCenter>{firstName}</AlignCenter>;
      //   },

];
