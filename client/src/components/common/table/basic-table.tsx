// libraries
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
// MUI
import { useTheme } from "@mui/material";
// styles
import "./styles/styles.css";
// components
import Pagination from "./components/pagination";
import Thead from "./components/thead";
import Tbody from "./components/tbody";
import Loader from "../loader/loader";
// react-table
import {
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
// store
import { getOpenObjectPageOpenState } from "../../../store/object/open-object-page.store";
// theme
import { tokens } from "../../../theme";

const BasicTable = ({
  rowSelection = [],
  setRowSelection = () => {},
  items,
  itemsColumns,
  hasFooter=false,
  isLoading,
  isPaginate = true,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useMemo(() => items || [], [items]);
  const columns = useMemo(() => itemsColumns || [], [items]);

  const isObjectPageOpen = useSelector(getOpenObjectPageOpenState());
  const isDialogMode = isObjectPageOpen;

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
        <Thead table={table} colors={colors} isDialogMode={isDialogMode} />
        {!isLoading && <Tbody table={table} hasFooter={hasFooter}/>}
      </table>
      {isLoading && <Loader />}

      {isPaginate && (
        <Pagination table={table} colors={colors} quantity={items?.length} />
      )}
    </>
  );
};

export default BasicTable;
