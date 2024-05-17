import { Dispatch, SetStateAction } from "react";
import { Row } from "react-table";
// styled
import { AlignCenter } from "@styled/styled-columns";
// components
import ObjectTableEntity from "@components/common/table-entities/object/object.table-entity";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ContactTableEntity from "@components/common/table-entities/contact.table-entity";
// utils
import { FormatDate } from "@utils/date/format-date";
// hooks
import companiesDialogsState from "@dialogs/dialog-handlers/companies.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface CompaniesColumnsProps {
  isCurrentUserRoleCurator: boolean;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

export const companiesColumns = ({
  setState,
  isCurrentUserRoleCurator
}: CompaniesColumnsProps) => {
  let columns = [];

  const { handleOpenUpdateCompanyPage } = companiesDialogsState({ setState });

  const dateColumn = {
    accessorKey: "created_at",
    header: "Дата",
    enableSorting: false,
    cell: (info: { getValue: () => any }) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    }
  };

  const companyNameColumn = {
    accessorKey: "name",
    header: "Название",
    enableSorting: false,
    cell: (info: { getValue: () => any }) => {
      const name = info.getValue();

      return <AlignCenter>{name}</AlignCenter>;
    }
  };

  const objectsColumn = {
    accessorFn: (row: Row) => row,
    header: "Объекты компании",
    enableSorting: false,
    cell: (info: { getValue: () => any }) => {
      const row = info.getValue();
      const objects = row.objects;

      return <ObjectTableEntity objects={objects} setState={setState} />;
    }
  };

  const contactsColumn = {
    accessorKey: "contacts",
    header: "Контакты",
    enableSorting: false,
    cell: (info: { getValue: () => any }) => {
      const contacts = info.getValue();

      return <ContactTableEntity contacts={contacts} setState={setState} />;
    }
  };

  const openCompanyColumn = {
    accessorKey: "_id",
    header: "Компания",
    enableSorting: false,
    cell: (info: { getValue: () => any }) => {
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
