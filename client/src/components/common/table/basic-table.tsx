// libraries
import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
// styles
import "./styles/styles.css";
// components
import Pagination from "./components/pagination";
import Thead from "./components/thead";
import Tbody from "./components/tbody";
import Loader from "../loader/loader";

const BasicTable = ({
  items,
  itemsColumns,
  rowSelection = [],
  setRowSelection = () => {},
  hasFooter = false,
  isLoading = false,
  isPaginate = true,
  isDialogMode = false,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const data = useMemo(() => items || [], [items]);
  const columns = useMemo(() => itemsColumns || [], [items]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
