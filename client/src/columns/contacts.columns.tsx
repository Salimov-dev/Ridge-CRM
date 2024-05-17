import { Row } from "react-table";
import { useSelector } from "react-redux";
// utils
import { FormatDate } from "@utils/date/format-date";
// styled
import { AlignCenter } from "@styled/styled-columns";
// components
import EmptyTd from "@components/common/columns/empty-td";
import { FormatPhone } from "@utils/table/helpers.table";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import CompanyTableEntity from "@components/common/table-entities/company.table-entity";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
import ObjectTableEntity from "@components/common/table-entities/object/object.table-entity";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// dialogs
import contactsDialogsState from "@dialogs/dialog-handlers/contacts.dialog-handlers";
// store
import { getPositionNameById } from "@store/contact/contact-positions.store";
import { Dispatch, SetStateAction } from "react";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface ContactsColumnsProps {
  isCurrentUserRoleManager: boolean;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

export const contactsColumns = ({
  setState,
  isCurrentUserRoleManager
}: ContactsColumnsProps) => {
  let columns = [];

  const { handleOpenContactPage } = contactsDialogsState({ setState });

  const dateColumn = {
    accessorKey: "created_at",
    header: "Дата",
    enableSorting: false,
    cell: (info: { getValue: () => any }) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    }
  };

  const commentColumn = {
    accessorKey: "comment",
    header: "Комментарий",
    enableSorting: false,
    cell: (info: { getValue: () => any }) => {
      const comment = info.getValue();
      return comment ? <AlignCenter>{comment}</AlignCenter> : <EmptyTd />;
    }
  };

  const contactsColumn = {
    id: "contactsColumn",
    header: "Контакт",
    columns: [
      {
        accessorFn: (row: Row) => row,
        header: "Имя",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const row = info.getValue();
          const name = row?.name;

          return <AlignCenter>{name}</AlignCenter>;
        }
      },

      {
        accessorFn: (row: Row) => row,
        header: "Телефон",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const row = info.getValue();
          const phone = row?.phones.find(
            (phone: any) => phone?.isDefault === true
          )?.phone;
          return phone ? (
            <AlignCenter>{FormatPhone(phone)}</AlignCenter>
          ) : (
            <EmptyTd />
          );
        }
      },
      {
        accessorFn: (row: Row) => row,
        header: "Почта",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const row = info.getValue();
          const email = row?.emails.find(
            (email: any) => email?.isDefault === true
          )?.email;
          return email ? <AlignCenter>{email}</AlignCenter> : <EmptyTd />;
        }
      },
      {
        accessorKey: "position",
        header: "Позиция",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const positionId = info.getValue();
          const positionName = useSelector(getPositionNameById(positionId));

          return <AlignCenter>{positionName}</AlignCenter>;
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
      },
      {
        accessorFn: (row: Row) => row,
        header: "Объекты контакта",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const row = info.getValue();
          const objects = row.objects;

          return <ObjectTableEntity objects={objects} setState={setState} />;
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

  const openContactColumn = {
    accessorKey: "_id",
    header: "Контакт",
    enableSorting: false,
    cell: (info: { getValue: () => any }) => {
      const contactId = info.getValue();

      return (
        <AlignCenter>
          <ButtonStyled
            title="Открыть"
            style="CONTACT"
            size="small"
            onClick={() => handleOpenContactPage(contactId)}
          />
        </AlignCenter>
      );
    }
  };

  if (isCurrentUserRoleManager) {
    columns = [dateColumn, contactsColumn, commentColumn, openContactColumn];
  } else {
    columns = [
      dateColumn,
      contactsColumn,
      managerColumn,
      commentColumn,
      openContactColumn
    ];
  }

  return columns;
};
