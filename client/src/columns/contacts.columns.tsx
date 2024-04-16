import { useSelector } from "react-redux";
// utils
import { FormatDate } from "@utils/date/format-date";
// styled
import { AlignCenter } from "@styled/styled-columns";
// components
import EmptyTd from "@components/common/columns/empty-td";
import { FormatPhone } from "@components/common/table/helpers/helpers.table";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import CompanyTableEntity from "@components/common/table-entities/company.4table-entity";
import ObjectTableEntity from "@components/common/table-entities/object.table-entity";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getPositionNameById } from "@store/contact/contact-positions.store";

export const contactsColumns = (
  setState,
  isCurrentUserRoleManager,
  object = {}
) => {
  let columns = [];

  const {
    handleOpenContactPage,
    handleOpenUpdateCompanyPage,
    handleOpenObjectPage
  } = useDialogHandlers(setState);

  const dateColumn = {
    accessorKey: "created_at",
    header: "Дата",
    enableSorting: false,
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    }
  };

  const commentColumn = {
    accessorKey: "comment",
    header: "Комментарий",
    enableSorting: false,
    cell: (info) => {
      const comment = info.getValue();
      return comment ? <AlignCenter>{comment}</AlignCenter> : <EmptyTd />;
    }
  };

  const contactsColumn = {
    id: "contactsColumn",
    header: "Контакт",
    columns: [
      {
        accessorFn: (row) => row,
        header: "Имя",
        enableSorting: false,
        cell: (info) => {
          const row = info.getValue();
          const name = row?.name;

          return <AlignCenter>{name}</AlignCenter>;
        }
      },

      {
        accessorFn: (row) => row,
        header: "Телефон",
        enableSorting: false,
        cell: (info) => {
          const row = info.getValue();
          const phone = row?.phones.find(
            (phone) => phone?.isDefault === true
          )?.phone;
          return phone ? (
            <AlignCenter>{FormatPhone(phone)}</AlignCenter>
          ) : (
            <EmptyTd />
          );
        }
      },
      {
        accessorFn: (row) => row,
        header: "Почта",
        enableSorting: false,
        cell: (info) => {
          const row = info.getValue();
          const email = row?.emails.find(
            (email) => email?.isDefault === true
          )?.email;
          return email ? <AlignCenter>{email}</AlignCenter> : <EmptyTd />;
        }
      },
      {
        accessorKey: "position",
        header: "Позиция",
        enableSorting: false,
        cell: (info) => {
          const positionId = info.getValue();
          const positionName = useSelector(getPositionNameById(positionId));

          return <AlignCenter>{positionName}</AlignCenter>;
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
      },
      {
        accessorFn: (row) => row,
        header: "Объекты контакта",
        enableSorting: false,
        cell: (info) => {
          const row = info.getValue();
          const objects = row.objects;
          const objectId = object?._id;

          const filteredObject = objects?.filter(
            (obj) => obj.object !== objectId
          );

          return (
            <ObjectTableEntity
              objects={filteredObject}
              onOpenObjectPage={handleOpenObjectPage}
            />
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

  const openContactColumn = {
    accessorKey: "_id",
    header: "Контакт",
    enableSorting: false,
    cell: (info) => {
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
