import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useDispatch, useSelector } from "react-redux";
// mui
import { Box, Typography } from "@mui/material";
// components
import EmptyTd from "@components/common/columns/empty-td";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import { AlignCenter } from "@components/common/columns/styled";
import ContactTableEntity from "@components/common/table-entities/contact-table-entity";
// utils
import { FormatDate } from "@utils/date/format-date";
import { getLastContactsById } from "@store/last-contact/last-contact.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
  getIsUserManager
} from "@store/user/users.store";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";

export const lastContactColumns = (onUpdate, onOpenContactPage) => {
  let columns = [];
  const currentUserId = useSelector(getCurrentUserId());
  const isManager = useSelector(getIsUserManager(currentUserId));

  const mainColumns = [
    {
      accessorKey: "date",
      header: "Дата",
      enableSorting: false,
      size: 30,
      cell: (info) => {
        const date = info.getValue();
        const formattedDate = FormatDate(date);
        const dayOfWeek = dayjs(date).locale("ru").format("dd");
        return (
          <Box sx={{ display: "flex", justifyContent: "center", gap: "6px" }}>
            <Typography>{formattedDate}</Typography>
            <Typography>{dayOfWeek}</Typography>{" "}
          </Box>
        );
      }
    },
    {
      accessorFn: (row) => row,
      header: "Контакты",
      enableSorting: false,
      cell: (info) => {
        const row = info.getValue();
        const contacts = row.contacts;

        return (
          <ContactTableEntity
            contacts={contacts}
            onOpenContactPage={onOpenContactPage}
          />
        );
      }
    },
    {
      accessorKey: "result",
      header: "Результат",
      enableSorting: false,
      cell: (info) => {
        const result = info.getValue();
        return result ? <AlignCenter>{result}</AlignCenter> : <EmptyTd />;
      }
    }
  ];

  const managerColumn =
    isManager !== undefined
      ? [
          {
            id: "manager",
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
      : [];

  const updateColumn = {
    accessorKey: "_id",
    header: "Править",
    cell: (info) => {
      const lastContactId = info.getValue();
      const lastContact = useSelector(getLastContactsById(lastContactId));
      const currentUserId = useSelector(getCurrentUserId());
      const isAuthorEntity = useSelector(
        getIsUserAuthorThisEntity(currentUserId, lastContact)
      );

      return (
        <AlignCenter>
          <ButtonStyled
            title="Править"
            style="LAST_CONTACT"
            disabled={!isAuthorEntity}
            onClick={() => onUpdate(lastContactId)}
          />
        </AlignCenter>
      );
    }
  };

  if (!isManager) {
    columns = [...mainColumns, ...managerColumn];
  } else {
    columns = [...mainColumns];
  }

  columns.push(updateColumn);

  return columns;
};
