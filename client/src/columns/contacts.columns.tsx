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
import { getPositionNameById } from "@store/contact/contact-positions.store";
import { getObjectAddressById } from "@store/object/objects.store";
import { getCompanyNameById } from "@store/company/company.store";
import CompanyTableEntity from "@components/common/table-entities/company-table-entity";

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

export const contactsColumns = (
  handleOpenContactPage,
  isCurator,
  isHideCheckbox,
  handleOpenUpdateCompanyPage
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

  const positionColumn = {
    accessorKey: "position",
    header: "Позиция",
    enableSorting: false,
    cell: (info) => {
      const positionId = info.getValue();
      const positionName = useSelector(getPositionNameById(positionId));

      return <AlignCenter>{positionName}</AlignCenter>;
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
        <AlignCenter key={obj[index]}>
          {useSelector(getObjectAddressById(obj))}
        </AlignCenter>
      ));

      return result.length ? result : <EmptyTd />;
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

  const contactsColumn = [
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
    // {
    //   accessorFn: (row) => row,
    //   header: "Контакты",
    //   cell: (info) => {
    //     const row = info.getValue();
    //     const companies = row.companies;

    //     return (
    //       <CompanyTableEntity
    //         companies={companies}
    //         onOpenCompanyPage={handleOpenUpdateCompanyPage}
    //       />
    //     );
    //   }
    // },
    {
      accessorKey: "companies",
      header: "Компания",
      enableSorting: false,
      cell: (info) => {
        const companies = info.getValue();

        // const row = info.getValue();
        // const companies = row.companies;

        return (
          <CompanyTableEntity
            companies={companies}
            onOpenCompanyPage={handleOpenUpdateCompanyPage}
          />
        );
      }
    },
    // {
    //   accessorKey: "companies",
    //   header: "Компания",
    //   cell: (info) => {
    //     const companies = info.getValue();
    //     const companyIds = [...new Set(companies?.map((comp) => comp.company))];
    //     const result = companyIds?.map((comp, index) => {
    //       const companyName = useSelector(getCompanyNameById(comp));
    //       return <AlignCenter key={comp[index]}>{companyName}</AlignCenter>;
    //     });
    //     return result.length ? result : <EmptyTd />;
    //   }
    // },
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
      accessorFn: (row) => row,
      header: "Телефон",
      enableSorting: false,
      cell: (info) => {
        const row = info.getValue();
        const phone = row.phones.find(
          (phone) => phone.isDefault === true
        ).phone;
        return phone ? (
          <AlignCenter>{FormatPhone(phone)}</AlignCenter>
        ) : (
          <EmptyTd />
        );
      }
    }
  ];

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

  if (isCurator) {
    columns = [
      dateColumn,
      ...contactsColumn,
      positionColumn,
      objectsColumn,
      commentColumn,
      openContactColumn
    ];
  } else {
    columns = [
      dateColumn,
      ...contactsColumn,
      positionColumn,
      objectsColumn,
      commentColumn,
      openContactColumn
    ];
  }

  if (isCurator && !isHideCheckbox) {
    columns.unshift(selectColumn);
  }

  return columns;
};
