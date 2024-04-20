import dayjs from "dayjs";
import { useSelector } from "react-redux";
// mui
import { Box, Typography } from "@mui/material";
// styled
import { AlignCenter } from "@styled/styled-columns";
// components
import DoneStatusIcon from "@components/common/columns/done-status-icon";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import OpenPageElementIconButton from "@components/common/button-icons/open-page-element.button-icon";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
// utils
import { FormatDate } from "@utils/date/format-date";
import { FormatTime } from "@utils/date/format-time";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getObjectById } from "@store/object/objects.store";
import { getMeetingStatusNameById } from "@store/meeting/meeting-status.store";
import { getMeetingTypeNameById } from "@store/meeting/meeting-types.store";
import { getMeetingById } from "@store/meeting/meetings.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity
} from "@store/user/users.store";

export const meetingsColumns = (
  setState,
  isCurrentUserRoleManager,
  isDialogPage
) => {
  let columns = [];

  const { handleOpenUpdateMeetingPage, handleOpenObjectPage } =
    useDialogHandlers(setState);

  const dateColumn = {
    header: "Дата и время встречи",
    columns: [
      {
        accessorKey: "isDone",
        header: "",
        enableSorting: false,
        cell: (info) => {
          const isDone = info.getValue();
          return <DoneStatusIcon isDone={isDone} />;
        }
      },
      {
        accessorKey: "date",
        header: "Дата встречи",
        enableSorting: false,
        cell: (info) => {
          const date = info.getValue();
          const formattedDate = FormatDate(date);
          const dayOfWeek = dayjs(date).locale("ru").format("dd");
          return (
            <Box sx={{ display: "flex", justifyContent: "center", gap: "6px" }}>
              <Typography>{formattedDate}</Typography>
              <Typography>{dayOfWeek}</Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: "time",
        header: "Время",
        enableSorting: false,
        cell: (info) => {
          const time = info.getValue();
          return <AlignCenter>{FormatTime(time)}</AlignCenter>;
        }
      },
      {
        accessorFn: (row) => row,
        header: "Адрес встречи",
        enableSorting: false,
        cell: (info) => {
          const meeting = info.getValue();
          return (
            <AlignCenter>
              <Typography>
                {meeting.city}, {meeting.address}
              </Typography>
            </AlignCenter>
          );
        }
      }
    ]
  };

  const meetingObjectColumn = {
    header: "Объект встречи",
    columns: [
      {
        accessorKey: "objectId",
        header: "Объект встречи",
        enableSorting: false,
        cell: (info) => {
          const objectId = info.getValue();
          const object = useSelector(getObjectById(objectId));
          const fullAddress = `${object?.city}, ${object?.address}`;

          return objectId ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start"
              }}
            >
              {fullAddress}
              <OpenPageElementIconButton
                title="Открыть объект"
                height="20px"
                heightButton="20px"
                width="20px"
                onClick={() => handleOpenObjectPage(objectId)}
              />
            </Box>
          ) : (
            <AlignCenter>-</AlignCenter>
          );
        }
      }
    ]
  };

  const managerColumn = {
    id: "managerColumn",
    header: "Менеджер",
    columns: isCurrentUserRoleManager !== undefined && [
      {
        accessorKey: "userId",
        header: "Фамилия и Имя",
        cell: (info) => {
          const userId = info.getValue();
          const { getAvatarSrc, isLoading } = useGetUserAvatar(userId);

          return (
            <AlignCenter>
              <UserNameWithAvatar
                userId={userId}
                avatarSrc={getAvatarSrc()}
                isLoading={isLoading}
              />
            </AlignCenter>
          );
        }
      }
    ]
  };

  const otherColumns = {
    header: "Встреча",
    columns: [
      {
        accessorKey: "type",
        header: "Тип",
        enableSorting: false,
        cell: (info) => {
          const type = info.getValue();

          const name = useSelector(getMeetingTypeNameById(type));
          return <AlignCenter>{name}</AlignCenter>;
        }
      },

      {
        accessorKey: "status",
        header: "Статус",
        enableSorting: false,
        cell: (info) => {
          const status = info.getValue();
          const name = useSelector(getMeetingStatusNameById(status));
          return <AlignCenter>{name}</AlignCenter>;
        }
      },
      {
        accessorKey: "comment",
        header: "Комментарий",
        enableSorting: false,
        cell: (info) => {
          const comment = info.getValue();
          return <AlignCenter>{comment}</AlignCenter>;
        }
      },
      {
        accessorKey: "result",
        header: "Результат",
        enableSorting: false,
        cell: (info) => {
          const result = info.getValue();
          return result ? (
            <AlignCenter>{result}</AlignCenter>
          ) : (
            <AlignCenter>-</AlignCenter>
          );
        }
      },
      {
        accessorKey: "created_at",
        header: "Дата создания встречи",
        enableSorting: false,
        cell: (info) => {
          const date = info.getValue();
          return <AlignCenter>{FormatDate(date)}</AlignCenter>;
        }
      }
    ]
  };

  const updateColumn = {
    header: "Встреча",
    columns: [
      {
        accessorKey: "_id",
        header: "Править",
        enableSorting: false,
        cell: (info) => {
          const meetingId = info.getValue();
          const meeting = useSelector(getMeetingById(meetingId));
          const currentUserId = useSelector(getCurrentUserId());
          const isAuthorEntity = useSelector(
            getIsUserAuthorThisEntity(currentUserId, meeting)
          );

          return (
            <AlignCenter>
              <ButtonStyled
                title="Править"
                style="MEETING"
                disabled={!isAuthorEntity}
                onClick={() => handleOpenUpdateMeetingPage(meetingId)}
              />
            </AlignCenter>
          );
        }
      }
    ]
  };

  if (!isCurrentUserRoleManager) {
    columns = [dateColumn, otherColumns, managerColumn, updateColumn];
  } else {
    columns = [dateColumn, otherColumns, updateColumn];
  }

  if (!isDialogPage) {
    columns.splice(3, 0, meetingObjectColumn);
  }

  return columns;
};
