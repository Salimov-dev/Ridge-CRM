// libraries
import { UseFormSetValue } from "react-hook-form";
import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState
} from "@tanstack/react-table";
// styles
import "@styled/styles-table.css";
// components
import Pagination from "./components/pagination.table";
import Thead from "./components/thead.table";
import Tbody from "./components/tbody.table.";
import Loader from "../loader/loader";
// interfaces
import { RowSelection } from "@interfaces/table/row-selection.type";

interface BasicTableProps {
  items: Record<string, any>;
  itemsColumns: any;
  rowSelection?: RowSelection;
  setRowSelection?: UseFormSetValue<RowSelection>;
  hasFooter?: boolean;
  isLoading?: boolean;
  isPaginate?: boolean;
  isDialogMode?: boolean;
}

const BasicTable = ({
  items,
  itemsColumns,
  rowSelection = [],
  setRowSelection = () => {},
  hasFooter = false,
  isLoading = false,
  isPaginate = true,
  isDialogMode = false
}: BasicTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const data = useMemo(() => items || [], [items]);
  const columns = useMemo(() => itemsColumns || [], [items]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <>
      <table>
        <Thead table={table} isDialogMode={isDialogMode} />
        {!isLoading && <Tbody table={table} hasFooter={hasFooter} />}
      </table>
      {isLoading && <Loader color="white" height="150px" />}

      {isPaginate && <Pagination table={table} quantity={items?.length} />}
    </>
  );
};

export default BasicTable;
