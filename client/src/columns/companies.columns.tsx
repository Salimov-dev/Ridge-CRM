import React, { HTMLProps } from "react";
import { useSelector } from "react-redux";
// utils
import { FormatDate } from "@utils/date/format-date";
// components
import { AlignCenter } from "@components/common/columns/styled";
import EmptyTd from "@components/common/columns/empty-td";
import { FormatPhone } from "@components/common/table/helpers/helpers";
import ButtonStyled from "@components/common/buttons/button-styled.button";
// store
// import { getPositionNameById } from "@store/companies/companies.store";
import { getObjectAddressById } from "@store/object/objects.store";
import {
  getCompanyById,
  getCompanyNameById
} from "@store/company/company.store";
import { getPositionNameById } from "@store/contact/contact-positions.store";

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

export const companiesColumns = (handleOpenCompaniesPage, isCurator) => {
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

  // const positionColumn = {
  //   accessorKey: "position",
  //   header: "Позиция",
  //   enableSorting: false,
  //   cell: (info) => {
  //     const positionId = info.getValue();
  //     const positionName = useSelector(getPositionNameById(positionId));

  //     return <AlignCenter>{positionName}</AlignCenter>;
  //   }
  // };

  // const objectsColumn = {
  //   accessorKey: "objects",
  //   header: "Объект",
  //   enableSorting: false,
  //   cell: (info) => {
  //     const objects = info.getValue();
  //     const objectIds = [...new Set(objects?.map((obj) => obj.object))];

  //     const result = objectIds?.map((obj) => (
  //       <AlignCenter>{useSelector(getObjectAddressById(obj))}</AlignCenter>
  //     ));

  //     return result.length ? result : <EmptyTd />;
  //   }
  // };

  // const commentColumn = {
  //   accessorKey: "comment",
  //   header: "Комментарий",
  //   enableSorting: false,
  //   cell: (info) => {
  //     const comment = info.getValue();
  //     return <AlignCenter>{comment}</AlignCenter>;
  //   }
  // };

  // const opencompaniesColumn = {
  //   accessorKey: "_id",
  //   header: "Контакт",
  //   enableSorting: false,
  //   cell: (info) => {
  //     const companiesId = info.getValue();

  //     return (
  //       <AlignCenter>
  //         <ButtonStyled
  //           title="Открыть"
  //           style="companies"
  //           size="small"
  //           // onClick={() => handleOpencompaniesPage(companiesId)}
  //         />
  //       </AlignCenter>
  //     );
  //   }
  // };

  // const contactsColumn = {
  //   header: "Контакты",
  //   columns: [
  //     {
  //       accessorFn: (row) => row,
  //       header: "Почта",
  //       cell: (info) => {
  //         const row = info.getValue();
  //         const email = row?.emails.find(
  //           (email) => email?.isDefault === true
  //         )?.email;
  //         return email ? <AlignCenter>{email}</AlignCenter> : <EmptyTd />;
  //       }
  //     },
  //     {
  //       accessorFn: (row) => row,
  //       header: "Телефон",
  //       cell: (info) => {
  //         const row = info.getValue();
  //         const phone = row.phones.find(
  //           (phone) => phone.isDefault === true
  //         ).phone;
  //         return phone ? (
  //           <AlignCenter>{FormatPhone(phone)}</AlignCenter>
  //         ) : (
  //           <EmptyTd />
  //         );
  //       }
  //     }
  //   ]
  // };

  if (isCurator) {
    columns = [
      selectColumn,
      dateColumn,
      companyNameColumn
      // contactsColumn
      // positionColumn,
      // objectsColumn,
      // commentColumn,
      // opencompaniesColumn
    ];
  } else {
    columns = [
      dateColumn,
      companyNameColumn
      // contactsColumn
      // positionColumn,
      // objectsColumn,
      // commentColumn,
      // opencompaniesColumn
    ];
  }

  return columns;
};
