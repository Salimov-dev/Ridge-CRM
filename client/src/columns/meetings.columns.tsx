import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Dispatch, SetStateAction } from "react";
// mui
import { Box, Typography } from "@mui/material";
// styled
import { AlignCenter } from "@styled/styled-columns";
// components
import DoneStatusIcon from "@components/common/columns/done-status-icon";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
import AnyObjectTableEntity from "@components/common/table-entities/any-object.table-entity";
// utils
import { FormatDate } from "@utils/date/format-date";
import { FormatTime } from "@utils/date/format-time";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import { getObjectById } from "@store/object/objects.store";
import { getMeetingStatusNameById } from "@store/meeting/meeting-status.store";
import { getMeetingTypeNameById } from "@store/meeting/meeting-types.store";
import { getMeetingById } from "@store/meeting/meetings.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity
} from "@store/user/users.store";
import { Row } from "react-table";

interface MeetingsColumnsProps {
  state: IDialogPagesState;
  isCurrentUserRoleManager: boolean;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

export const meetingsColumns = ({
  state,
  setState,
  isCurrentUserRoleManager
}: MeetingsColumnsProps) => {
  let columns = [];

  const isObjectPage = state?.objectPage;

  const { handleOpenUpdateMeetingPage, handleOpenObjectPage } =
    useDialogHandlers(setState);

  const dateColumn = {
    header: "Дата, время и место встречи",
    columns: [
      {
        accessorKey: "isDone",
        header: "",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const isDone = info.getValue();
          return <DoneStatusIcon isDone={isDone} />;
        }
      },
      {
        accessorKey: "date",
        header: "Дата встречи",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
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
        cell: (info: { getValue: () => any }) => {
          const time = info.getValue();
          return <AlignCenter>{FormatTime(time)}</AlignCenter>;
        }
      },
      {
        accessorFn: (row: Row) => row,
        header: "Адрес встречи",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
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
        header: "Адрес объекта",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const objectId = info.getValue();
          const object = useSelector(getObjectById(objectId));

          return objectId ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start"
              }}
            >
              <AnyObjectTableEntity
                object={object}
                onOpenObjectPage={handleOpenObjectPage}
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
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
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
        cell: (info: { getValue: () => any }) => {
          const type = info.getValue();

          const name = useSelector(getMeetingTypeNameById(type));
          return <AlignCenter>{name}</AlignCenter>;
        }
      },

      {
        accessorKey: "status",
        header: "Статус",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const status = info.getValue();
          const name = useSelector(getMeetingStatusNameById(status));
          return <AlignCenter>{name}</AlignCenter>;
        }
      },
      {
        accessorKey: "comment",
        header: "Комментарий",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const comment = info.getValue();
          return <AlignCenter>{comment}</AlignCenter>;
        }
      },
      {
        accessorKey: "result",
        header: "Результат",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
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
        cell: (info: { getValue: () => any }) => {
          const date = info.getValue();
          return <AlignCenter>{FormatDate(date)}</AlignCenter>;
        }
      }
    ]
  };

  const updateColumn = {
    header: "-",
    columns: [
      {
        accessorKey: "_id",
        header: "Править",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
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

  if (!isObjectPage) {
    columns.splice(3, 0, meetingObjectColumn);
  }

  return columns;
};
