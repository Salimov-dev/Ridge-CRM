import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
// mui
import { Box, Typography } from "@mui/material";
// components
import RedirectButton from "../../components/common/buttons/redirect-button";
import MultiColorContainedButton from "../../components/common/buttons/multi-color-contained-button";
import DoneStatusIcon from "../../components/common/columns/done-status-icon";
import UserNameWithAvatar from "../../components/common/table/helpers/user-name-with-avatar";
// store
import { getObjectById } from "../../store/object/objects.store";
import { getMeetingStatusNameById } from "../../store/meeting/meeting-status.store";
import { getMeetingTypeNameById } from "../../store/meeting/meeting-types.store";
// styled
import { AlignCenter } from "../../components/common/columns/styled";
// utils
import { FormatDate } from "../../utils/date/format-date";
import { FormatTime } from "../../utils/date/format-time";
import {
  setUpdateMeetingId,
  setUpdateMeetingOpenState,
} from "../../store/meeting/update-meeting.store";
import {
  getOpenObjectPageOpenState,
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../store/object/open-object-page.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
  getUserDataById,
} from "../../store/user/users.store";
import { getMeetingById } from "../../store/meeting/meetings.store";
import useGetUserAvatar from "../../hooks/user/use-get-user-avatar";

export const meetingsCuratorColumns = [
  {
    accessorKey: "isDone",
    header: "",
    enableSorting: false,
    cell: (info) => {
      const isDone = info.getValue();
      return <DoneStatusIcon isDone={isDone} />;
    },
  },
  {
    accessorKey: "date",
    header: "Дата",
    enableSorting: false,
    cell: (info) => {
      const date = info.getValue();
      const formattedDate = FormatDate(date);
      const dayOfWeek = dayjs(date).locale("ru").format("dd");
      return (
        <Box sx={{ display: "flex", gap: "6px" }}>
          <Typography>{formattedDate}</Typography>
          <Typography>{dayOfWeek}</Typography>
        </Box>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Время",
    enableSorting: false,
    cell: (info) => {
      const time = info.getValue();
      return <AlignCenter>{FormatTime(time)}</AlignCenter>;
    },
  },
  {
    accessorKey: "location",
    header: "Адрес встречи",
    cell: (info) => {
      const location = info.getValue();
      return (
        <Typography>
          {location.city}, {location.address}
        </Typography>
      );
    },
  },
  {
    accessorKey: "meetingType",
    header: "Тип",
    cell: (info) => {
      const type = info.getValue();
      const name = useSelector(getMeetingTypeNameById(type));
      return <AlignCenter>{name}</AlignCenter>;
    },
  },
  {
    accessorKey: "objectId",
    header: "Объект встречи",
    cell: (info) => {
      const objectId = info.getValue();
      const object = useSelector(getObjectById(objectId));
      const fullAddress = `${object?.location.city}, ${object?.location.address}`;
      const isObjectPage = useSelector(getOpenObjectPageOpenState());
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
      const name = useSelector(getMeetingStatusNameById(status));
      return <AlignCenter>{name}</AlignCenter>;
    },
  },

  {
    accessorKey: "userId",
    header: "Менеджер",
    cell: (info) => {
      const userId = info.getValue();
      const getAvatarSrc = () => {
        const { avatarSrc, isLoading } = useGetUserAvatar(userId);
        return isLoading ? null : avatarSrc;
      };
      return <UserNameWithAvatar userId={userId}  avatarSrc={getAvatarSrc()} />;
    },
  },
  {
    accessorKey: "comment",
    header: "Комментарий",
    cell: (info) => {
      const comment = info.getValue();
      return comment;
    },
  },
  {
    accessorKey: "result",
    header: "Результат",
    cell: (info) => {
      const result = info.getValue();
      return result ? result : <AlignCenter>-</AlignCenter>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Дата создания",
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    },
  },
  {
    accessorKey: "_id",
    header: "",
    cell: (info) => {
      const meetingId = info.getValue();
      const meeting = useSelector(getMeetingById(meetingId));
      const dispatch = useDispatch();
      const currentUserId = useSelector(getCurrentUserId());
      const isAuthorEntity = useSelector(
        getIsUserAuthorThisEntity(currentUserId, meeting)
      );

      const handleClick = () => {
        dispatch<any>(setUpdateMeetingId(meetingId));
        dispatch<any>(setUpdateMeetingOpenState(true));
      };

      return (
        <MultiColorContainedButton
          text="Править"
          fontColor="white"
          background="royalBlue"
          backgroudHover="cornflowerBlue"
          onClick={handleClick}
          disabled={!isAuthorEntity}
        />
      );
    },
  },
];
