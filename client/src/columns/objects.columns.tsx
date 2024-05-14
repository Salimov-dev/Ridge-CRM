import { orderBy } from "lodash";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { Row } from "react-table";
// MUI
import { Box, Button, Tooltip, Typography, styled } from "@mui/material";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
// styled
import { AlignCenter } from "@styled/styled-columns";
// utils
import { FormatDate } from "@utils/date/format-date";
import { IndeterminateCheckbox } from "@utils/table/indeterminate-checkbox";
import { FormatMetro, FormatObjectStatus } from "@utils/table/helpers.table";
// components
import Flags from "@components/common/columns/flags";
import EmptyTd from "@components/common/columns/empty-td";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ContactTableEntity from "@components/common/table-entities/contact.table-entity";
import CompanyTableEntity from "@components/common/table-entities/company.table-entity";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { IMeeting } from "@interfaces/meeting/meeting.interface";
import { ILastContact } from "@interfaces/last-contact/last-contact.interface";
// dialog-handlers
import objectsDialogsState from "@dialogs/dialog-handlers/objects.dialog-handlers";
// store
import { getLastContactsList } from "@store/last-contact/last-contact.store";
import { getDistrictName } from "@store/object-params/object-districts.store";
import { getMeetingsList } from "@store/meeting/meetings.store";

interface ObjectsColumnsProps {
  isCurrentUserRoleManager: boolean;
  isCurrentUserRoleCurator: boolean;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const AddressWithFlags = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const objectsColumns = ({
  setState,
  isCurrentUserRoleManager,
  isCurrentUserRoleCurator
}: ObjectsColumnsProps) => {
  let columns = [];

  const { handleOpenObjectPage } = objectsDialogsState({ setState });

  const selectColumn = {
    id: "select",
    header: ({ table }: any) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler()
        }}
      />
    ),
    cell: ({ row }: any) => (
      <div className="px-1">
        <AlignCenter>
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        </AlignCenter>
      </div>
    )
  };

  const dateColumn = {
    accessorKey: "created_at",
    header: "Дата",
    enableSorting: false,
    cell: (info: { getValue: () => any }) => {
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
        cell: (info: { getValue: () => any }) => {
          const city = info.getValue();
          return city;
        }
      },
      {
        accessorKey: "district",
        header: "Район",
        cell: (info: { getValue: () => any }) => {
          const district = info.getValue();
          const distName = useSelector(getDistrictName(district));

          return <AlignCenter>{distName}</AlignCenter>;
        }
      },
      {
        accessorKey: "metro",
        header: "Метро",
        cell: (info: { getValue: () => any }) => {
          const metro = info.getValue();
          return metro ? (
            <AlignCenter>{FormatMetro(metro)}</AlignCenter>
          ) : (
            <EmptyTd />
          );
        }
      },
      {
        accessorFn: (row: Row) => row,
        header: "Адрес",
        cell: (info: { getValue: () => any }) => {
          const object = info.getValue();
          const objectId = object?._id;

          if (objectId) {
            return (
              <AddressWithFlags>
                <Typography>{object?.address}</Typography>
                <Flags objectId={objectId} setState={setState} />
              </AddressWithFlags>
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
        cell: (info: { getValue: () => any }) => {
          const contacts = info.getValue();

          return <ContactTableEntity contacts={contacts} setState={setState} />;
        }
      },
      {
        accessorKey: "companies",
        header: "Связан с компаниями",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const companies = info.getValue();
          return (
            <CompanyTableEntity companies={companies} setState={setState} />
          );
        }
      }
    ]
  };

  const lastContactsColumn = {
    header: "Последние контакты",
    columns: [
      {
        accessorFn: (row: Row) => row,
        header: "Встреча",
        cell: (info: { getValue: () => any }) => {
          const object = info.getValue();
          const objectId = object?._id;

          const meetingsList = useSelector(getMeetingsList());
          const objectMeetings = meetingsList?.filter(
            (meet: IMeeting) => meet.objectId === objectId
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
        accessorFn: (row: Row) => row,
        header: "Звонок",
        cell: (info: { getValue: () => any }) => {
          const object = info.getValue();
          const objectId = object?._id;
          const lastContactsList = useSelector(getLastContactsList());
          const lastContacts = lastContactsList?.filter(
            (contact: ILastContact) => contact.objectId === objectId
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

  const otherColumn = {
    header: "Другое",
    columns: [
      {
        accessorKey: "status",
        header: "Статус",
        cell: (info: { getValue: () => any }) => {
          const status = info.getValue();
          return <AlignCenter>{FormatObjectStatus(status)}</AlignCenter>;
        }
      },
      {
        accessorKey: "cloudLink",
        header: "Облако",
        cell: (info: { getValue: () => any }) => {
          const cloudLink = info.getValue();

          const handleOpenCloud = () => {
            const cloudLink = info.getValue();

            if (cloudLink) {
              window.open(cloudLink, "_blank");
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
        cell: (info: { getValue: () => any }) => {
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
      ...(isCurrentUserRoleCurator ? [selectColumn] : []),
      dateColumn,
      locationColumn,
      contactsColumn,
      managerColumn,
      lastContactsColumn,
      otherColumn
    ];
  } else {
    columns = [
      ...(isCurrentUserRoleCurator ? [selectColumn] : []),
      dateColumn,
      locationColumn,
      contactsColumn,
      lastContactsColumn,
      otherColumn
    ];
  }

  return columns;
};
