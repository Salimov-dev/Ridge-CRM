import React, { HTMLProps } from "react";
import { useSelector } from "react-redux";
// utils
import { FormatDate } from "@utils/date/format-date";
// components
import { AlignCenter } from "@components/common/columns/styled";
import EmptyTd from "@components/common/columns/empty-td";
import ObjectTableEntity from "@components/common/table-entities/object-table-entity";
import ButtonStyled from "@components/common/buttons/button-styled.button";
// store
import { getContactById } from "@store/contact/contact.store";
import ContactTableEntity from "@components/common/table-entities/contact-table-entity";

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

export const companiesColumns = (
  handleOpenUpdateCompanyPage,
  isCurator,
  isHideCheckbox,
  handleOpenObjectPage,
  object,
  handleOpenContactPage
) => {
  let columns = [];

  const selectColumn = {
    id: "select",
    header: ({ table }) => (
      <AlignCenter>
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler()
          }}
        />
      </AlignCenter>
    ),
    cell: ({ row }) => (
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

  // const contactsColumn = {
  //   accessorKey: "contacts",
  //   header: "Контакты",
  //   enableSorting: false,
  //   cell: (info) => {
  //     const contacts = info.getValue();
  //     const contactIds = [...new Set(contacts?.map((cont) => cont.contact))];

  //     const result = contactIds?.map((cont, index) => {
  //       const contact = useSelector(getContactById(cont));

  //       return <AlignCenter key={cont[index]}>{contact?.name}</AlignCenter>;
  //     });

  //     return result.length ? result : <EmptyTd />;
  //   }
  // };

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

  if (isCurator) {
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

  if (isCurator && !isHideCheckbox) {
    columns.unshift(selectColumn);
  }

  return columns;
};
