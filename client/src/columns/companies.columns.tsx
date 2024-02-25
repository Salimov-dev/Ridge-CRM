import React, { HTMLProps } from "react";
import { useSelector } from "react-redux";
// utils
import { FormatDate } from "@utils/date/format-date";
// components
import { AlignCenter } from "@components/common/columns/styled";
import EmptyTd from "@components/common/columns/empty-td";
import ButtonStyled from "@components/common/buttons/button-styled.button";
// store
import { getObjectAddressById } from "@store/object/objects.store";
import { getUserNameById } from "@store/user/users.store";
import {
  getContactById,
  getContactsBycontactId
} from "@store/contact/contact.store";

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

export const companiesColumns = (handleOpenUpdateCompanyPage, isCurator) => {
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
    accessorKey: "objects",
    header: "Объект",
    enableSorting: false,
    cell: (info) => {
      const objects = info.getValue();
      const objectIds = [...new Set(objects?.map((obj) => obj.object))];

      const result = objectIds?.map((obj, index) => (
        <AlignCenter key={`${obj}-${index}`}>
          {useSelector(getObjectAddressById(obj))}
        </AlignCenter>
      ));

      return result.length ? result : <EmptyTd />;
    }
  };

  const contactsColumn = {
    accessorKey: "contacts",
    header: "Контакты",
    enableSorting: false,
    cell: (info) => {
      const contacts = info.getValue();
      const contactIds = [...new Set(contacts?.map((cont) => cont.contact))];

      const result = contactIds?.map((cont, index) => {
        const contact = useSelector(getContactById(cont));

        return <AlignCenter key={cont[index]}>{contact?.name}</AlignCenter>;
      });

      return result.length ? result : <EmptyTd />;
    }
  };

  const usersColumn = {
    accessorFn: (row) => row,
    header: "Менеджеры",
    enableSorting: false,
    cell: (info) => {
      const row = info.getValue();
      // const contactIds = [...new Set(contacts?.map((cont) => cont.contact))];

      // const result = contactIds?.map((cont) => (
      //   <AlignCenter>{useSelector(getUserNameById(cont))}</AlignCenter>
      // ));

      // return result.length ? result : <EmptyTd />;
      return <AlignCenter>Менеджер</AlignCenter>;
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

  if (isCurator) {
    columns = [
      selectColumn,
      dateColumn,
      companyNameColumn,
      contactsColumn,
      objectsColumn,
      usersColumn,
      openCompanyColumn
    ];
  } else {
    columns = [
      dateColumn,
      companyNameColumn,
      contactsColumn,
      objectsColumn,
      usersColumn,
      openCompanyColumn
    ];
  }

  return columns;
};
