import { orderBy } from "lodash";
import { useSelector } from "react-redux";
// MUI
import { Box, Button, Tooltip, Typography } from "@mui/material";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
// AlignCenter
import { AlignCenter } from "@styled/styled-columns";
// utils
import { FormatDate } from "@utils/date/format-date";
// components
import Flags from "@components/common/columns/flags";
import EmptyTd from "@components/common/columns/empty-td";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import { FormatMetro, FormatObjectStatus } from "@utils/table/helpers.table";
import ContactTableEntity from "@components/common/table-entities/contact.table-entity";
import CompanyTableEntity from "@components/common/table-entities/company.table-entity";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// dialogs
import objectsDialogsState from "@dialogs/dialog-handlers/objects.dialog-handlers";
import contactsDialogsState from "@dialogs/dialog-handlers/contacts.dialog-handlers";
import companiesDialogsState from "@dialogs/dialog-handlers/companies.dialog-handlers";
// store
import { getLastContactsList } from "@store/last-contact/last-contact.store";
import { getDistrictName } from "@store/object-params/object-districts.store";
import { getTasksList } from "@store/task/tasks.store";
import {
  getMeetingsList,
  getObjectMeetingsList
} from "@store/meeting/meetings.store";

export const objectsDatabaseColumns = (setState, isCurrentUserRoleManager) => {
  let columns = [];

  const { handleOpenObjectPage } = objectsDialogsState({ setState });
  const { handleOpenContactPage } = contactsDialogsState({ setState });
  const { handleOpenUpdateCompanyPage } = companiesDialogsState({ setState });

  const dateColumn = {
    accessorKey: "created_at",
    header: "Дата",
    enableSorting: false,
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    }
  };

  const locationColumn = {
    header: "Расположение объекта",
    columns: [
      {
        accessorKey: "city",
        header: "Город",
        cell: (info) => {
          const city = info.getValue();
          return city;
        }
      },
      {
        accessorKey: "district",
        header: "Район",
        cell: (info) => {
          const district = info.getValue();
          const distName = useSelector(getDistrictName(district));

          return <AlignCenter>{distName}</AlignCenter>;
        }
      },
      {
        accessorKey: "metro",
        header: "Метро",
        cell: (info) => {
          const metro = info.getValue();
          return metro ? (
            <AlignCenter>{FormatMetro(metro)}</AlignCenter>
          ) : (
            <EmptyTd />
          );
        }
      },
      {
        accessorFn: (row) => row,
        header: "Адрес",
        cell: (info) => {
          const object = info.getValue();
          const objectId = object?._id;
          const meetings = useSelector(getObjectMeetingsList(objectId));
          const tasksList = useSelector(getTasksList());
          const tasks = tasksList?.filter((task) => task.objectId === objectId);
          const lastContactsList = useSelector(getLastContactsList());
          const lastContacts = lastContactsList?.filter(
            (contact) => contact.objectId === objectId
          );

          if (objectId) {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px"
                }}
              >
                <Typography>{object?.address}</Typography>
                <Flags
                  meetings={meetings}
                  tasks={tasks}
                  lastContacts={lastContacts}
                  onClick={() => handleOpenObjectPage(objectId)}
                />
              </Box>
            );
          } else return null;
        }
      }
    ]
  };

  const contactsColumn = {
    header: "Контактная информация",
    columns: [
      {
        accessorKey: "contacts",
        header: "Контакты",
        enableSorting: false,
        cell: (info) => {
          const contacts = info.getValue();

          return (
            <ContactTableEntity
              contacts={contacts}
              onOpenContactPage={handleOpenContactPage}
            />
          );
        }
      },
      {
        accessorKey: "companies",
        header: "Связан с компаниями",
        enableSorting: false,
        cell: (info) => {
          const companies = info.getValue();
          return (
            <CompanyTableEntity
              companies={companies}
              onOpenCompanyPage={handleOpenUpdateCompanyPage}
            />
          );
        }
      }
    ]
  };

  const lastContactsColumn = {
    header: "Последние контакты",
    columns: [
      {
        accessorFn: (row) => row,
        header: "Встреча",
        cell: (info) => {
          const object = info.getValue();
          const objectId = object?._id;
          const meetingsList = useSelector(getMeetingsList());
          const objectMeetings = meetingsList?.filter(
            (meet) => meet.objectId === objectId
          );
          const isObjectMeetings = Boolean(objectMeetings?.length);
          const sortedObjectMeetings = orderBy(
            objectMeetings,
            ["date"],
            ["asc"]
          );
          const lastMeeting =
            sortedObjectMeetings[sortedObjectMeetings?.length - 1];
          const dateOfLastMeeting = FormatDate(lastMeeting?.date);

          return isObjectMeetings ? (
            <AlignCenter>{dateOfLastMeeting}</AlignCenter>
          ) : (
            <AlignCenter>-</AlignCenter>
          );
        }
      },
      {
        accessorFn: (row) => row,
        header: "Звонок",
        cell: (info) => {
          const object = info.getValue();
          const objectId = object?._id;
          const lastContactsList = useSelector(getLastContactsList());
          const lastContacts = lastContactsList?.filter(
            (contact) => contact.objectId === objectId
          );
          const sortedLastContacts = orderBy(lastContacts, "date", ["desc"]);
          const isSortedLastContacts = Boolean(sortedLastContacts?.length);

          const dateLastContact = () => {
            if (isSortedLastContacts) {
              const date = FormatDate(sortedLastContacts[0]?.date);
              return date;
            } else {
              return null;
            }
          };

          return isSortedLastContacts ? (
            <AlignCenter>{dateLastContact()}</AlignCenter>
          ) : (
            <EmptyTd />
          );
        }
      }
    ]
  };

  const managerColumn = {
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

  const otherColumn = {
    header: "Другое",
    columns: [
      {
        accessorKey: "status",
        header: "Статус",
        cell: (info) => {
          const status = info.getValue();
          return <AlignCenter>{FormatObjectStatus(status)}</AlignCenter>;
        }
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
        }
      },
      {
        accessorKey: "_id",
        header: "Объект",
        enableSorting: false,
        cell: (info) => {
          const objectId = info.getValue();

          return (
            <AlignCenter>
              <ButtonStyled
                title="Открыть"
                style="OBJECT"
                size="small"
                variant="contained"
                onClick={() => handleOpenObjectPage(objectId)}
              />
            </AlignCenter>
          );
        }
      }
    ]
  };

  if (!isCurrentUserRoleManager) {
    columns = [
      dateColumn,
      locationColumn,
      contactsColumn,
      managerColumn,
      lastContactsColumn,
      otherColumn
    ];
  } else {
    columns = [
      dateColumn,
      locationColumn,
      contactsColumn,
      lastContactsColumn,
      otherColumn
    ];
  }

  return columns;
};
