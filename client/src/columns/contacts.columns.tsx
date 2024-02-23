import { orderBy } from "lodash";
import React, { HTMLProps } from "react";
import { useSelector } from "react-redux";
// MUI
import { Box, Button, Tooltip, Typography } from "@mui/material";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
// utils
import { FormatDate } from "@utils/date/format-date";
// components
import Flags from "@components/common/columns/flags";
import { AlignCenter } from "@components/common/columns/styled";
import EmptyTd from "@components/common/columns/empty-td";
import UserNameWithAvatar from "@components/common/user-name-with-avatar";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import {
  FormatMetro,
  FormatPhone
} from "@components/common/table/helpers/helpers";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// store
import { getLastContactsList } from "@store/last-contact/last-contact.store";
import { getDistrictName } from "@store/contact-params/districts.store";
import { getUserDataById } from "@store/user/users.store";
import { getTasksList } from "@store/task/tasks.store";
import {
  getMeetingsList,
  getcontactMeetingsList
} from "@store/meeting/meetings.store";

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps) {
  const ref = React.useRef(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

export const contactsColumns = (handleOpenContactPage, isCurator) => {
  let columns = [];

  const selectColumn = {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler()
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler()
          }}
        />
      </div>
    )
  };

  const dateColumn = {
    accessorKey: "created_at",
    header: "Дата",
    enableSorting: false,
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    }
  };

  const positionColumn = {
    accessorKey: "position",
    header: "Позиция",
    enableSorting: false,
    cell: (info) => {
      const position = info.getValue();
      return <AlignCenter>{position}</AlignCenter>;
    }
  };

  const commentColumn = {
    accessorKey: "comment",
    header: "Комментарий",
    enableSorting: false,
    cell: (info) => {
      const comment = info.getValue();
      return <AlignCenter>{comment}</AlignCenter>;
    }
  };

  const contactsColumn = {
    header: "Контакты",
    columns: [
      {
        accessorKey: "company",
        header: "Компания",
        cell: (info) => {
          const company = info.getValue();

          return <AlignCenter>{company}</AlignCenter>;
        }
      },
      {
        accessorKey: "email",
        header: "Почта",
        cell: (info) => {
          const email = info.getValue();
          return email;
        }
      },
      {
        accessorKey: "phone",
        header: "Телефон",
        cell: (info) => {
          const phone = info.getValue();
          return phone ? (
            <AlignCenter>{FormatPhone(phone)}</AlignCenter>
          ) : (
            <EmptyTd />
          );
        }
      }
    ]
  };

  // const contactsColumn = {
  //   header: "Контактная информация",
  //   columns: [
  //     {
  //       accessorKey: "phone",
  //       header: "Телефон",
  //       cell: (info) => {
  //         const phone = info.getValue();
  //         return phone ? (
  //           <AlignCenter>
  //             <Typography sx={{ whiteSpace: "nowrap" }}>
  //               {FormatPhone(phone)}
  //             </Typography>
  //           </AlignCenter>
  //         ) : (
  //           <EmptyTd />
  //         );
  //       }
  //     },
  //     {
  //       accessorKey: "name",
  //       header: "Имя",
  //       cell: (info) => {
  //         const name = info.getValue();
  //         return name ? <AlignCenter>{name}</AlignCenter> : <EmptyTd />;
  //       }
  //     }
  //   ]
  // };

  const lastContactsColumn = {
    header: "Последние контакты",
    columns: [
      {
        accessorFn: (row) => row,
        header: "Встреча",
        cell: (info) => {
          const contact = info.getValue();
          const contactId = contact?._id;
          const meetingsList = useSelector(getMeetingsList());
          const contactMeetings = meetingsList?.filter(
            (meet) => meet.contactId === contactId
          );
          const iscontactMeetings = Boolean(contactMeetings?.length);
          const sortedcontactMeetings = orderBy(
            contactMeetings,
            ["date"],
            ["asc"]
          );
          const lastMeeting =
            sortedcontactMeetings[sortedcontactMeetings?.length - 1];
          const dateOfLastMeeting = FormatDate(lastMeeting?.date);

          return iscontactMeetings ? (
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
          const contact = info.getValue();
          const contactId = contact?._id;
          const lastContactsList = useSelector(getLastContactsList());
          const lastContacts = lastContactsList?.filter(
            (contact) => contact.contactId === contactId
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
    columns: [
      {
        accessorKey: "userId",
        header: "Фамилия и Имя",
        cell: (info) => {
          const userId = info.getValue();
          const user = useSelector(getUserDataById(userId));
          const { getAvatarSrc, isLoading } = useGetUserAvatar(user?._id);

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
          return <AlignCenter>{FormatcontactStatus(status)}</AlignCenter>;
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
          const contactId = info.getValue();

          return (
            <AlignCenter>
              <ButtonStyled
                title="Открыть"
                style="contact"
                size="small"
                variant="contained"
                onClick={() => handleOpencontactPage(contactId)}
              />
            </AlignCenter>
          );
        }
      }
    ]
  };

  if (isCurator) {
    columns = [
      selectColumn,
      dateColumn,
      contactsColumn,
      positionColumn,
      commentColumn
    ];
  } else {
    columns = [dateColumn, contactsColumn, positionColumn, commentColumn];
  }

  return columns;
};
