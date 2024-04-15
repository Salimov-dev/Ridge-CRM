// components
import { AlignCenter } from "@components/common/columns/styled";
import ObjectTableEntity from "@components/common/table-entities/object-table-entity";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ContactTableEntity from "@components/common/table-entities/contact-table-entity";
// utils
import { FormatDate } from "@utils/date/format-date";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";

export const companiesColumns = (
  setState,
  isCurrentUserRoleCurator,
  object = {}
) => {
  let columns = [];

  const {
    handleOpenObjectPage,
    handleOpenContactPage,
    handleOpenUpdateCompanyPage
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

  const companyNameColumn = {
    accessorKey: "name",
    header: "Название",
    enableSorting: false,
    cell: (info) => {
      const name = info.getValue();

      return <AlignCenter>{name}</AlignCenter>;
    }
  };

  const objectsColumn = {
    accessorFn: (row) => row,
    header: "Другие объекты компании",
    enableSorting: false,
    cell: (info) => {
      const row = info.getValue();
      const objects = row.objects;
      const objectId = object?._id;
      const filteredObject = objects?.filter((obj) => obj.object !== objectId);

      return (
        <ObjectTableEntity
          objects={filteredObject}
          onOpenObjectPage={handleOpenObjectPage}
        />
      );
    }
  };

  const contactsColumn = {
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
  };

  const openCompanyColumn = {
    accessorKey: "_id",
    header: "Компания",
    enableSorting: false,
    cell: (info) => {
      const companyId = info.getValue();

      return (
        <AlignCenter>
          <ButtonStyled
            title="Открыть"
            style="COMPANY"
            size="small"
            onClick={() => handleOpenUpdateCompanyPage(companyId)}
          />
        </AlignCenter>
      );
    }
  };

  if (isCurrentUserRoleCurator) {
    columns = [
      dateColumn,
      companyNameColumn,
      contactsColumn,
      objectsColumn,
      openCompanyColumn
    ];
  } else {
    columns = [
      dateColumn,
      companyNameColumn,
      contactsColumn,
      objectsColumn,
      openCompanyColumn
    ];
  }

  return columns;
};
