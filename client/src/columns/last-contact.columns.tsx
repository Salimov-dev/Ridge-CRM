import { Row } from "react-table";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
import { Dispatch, SetStateAction } from "react";
// mui
import { Box, Typography } from "@mui/material";
// styled
import { AlignCenter } from "@styled/styled-columns";
// components
import EmptyTd from "@components/common/columns/empty-td";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ContactTableEntity from "@components/common/table-entities/contact.table-entity";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// utils
import { FormatDate } from "@utils/date/format-date";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// dialogs
import lastContactsDialogsState from "@dialogs/dialog-handlers/last-contacts.dialog-handlers";
// store
import { getLastContactsById } from "@store/last-contact/last-contact.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity
} from "@store/user/users.store";

interface LastContactColumnsProps {
  isCurrentUserRoleManager: boolean;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

export const lastContactColumns = ({
  setState,
  isCurrentUserRoleManager
}: LastContactColumnsProps) => {
  let columns = [];

  const { handleOpenUpdateLastContactPage } = lastContactsDialogsState({
    setState
  });

  const mainColumns = [
    {
      accessorKey: "date",
      header: "Дата",
      enableSorting: false,
      size: 30,
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
      accessorFn: (row: Row) => row,
      header: "Контакты",
      enableSorting: false,
      cell: (info: { getValue: () => any }) => {
        const row = info.getValue();
        const contacts = row.contacts;

        return <ContactTableEntity contacts={contacts} setState={setState} />;
      }
    },
    {
      accessorKey: "result",
      header: "Результат",
      enableSorting: false,
      cell: (info: { getValue: () => any }) => {
        const result = info.getValue();
        return result ? <AlignCenter>{result}</AlignCenter> : <EmptyTd />;
      }
    }
  ];

  const managerColumn =
    isCurrentUserRoleManager !== undefined
      ? [
          {
            id: "manager",
            accessorKey: "userId",
            header: "Менеджер",
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
      : [];

  const updateColumn: any = {
    accessorKey: "_id",
    header: "Править",
    cell: (info: { getValue: () => any }) => {
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
            onClick={() => handleOpenUpdateLastContactPage(lastContactId)}
          />
        </AlignCenter>
      );
    }
  };

  if (!isCurrentUserRoleManager) {
    columns = [...mainColumns, ...managerColumn];
  } else {
    columns = [...mainColumns];
  }

  columns.push(updateColumn);

  return columns;
};
