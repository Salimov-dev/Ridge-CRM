// libraries
import { useMemo, useState } from "react";
// MUI
import { Box, useTheme, styled } from "@mui/material";
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
// other
import { tokens } from "../../../theme";
import { useSelector } from "react-redux";
import { loadOpenObjectPageOpenState } from "../../../store/object/open-object-page.store";

const Component = styled(Box)`
  margin-bottom: 20px;
`;

const BasicTable = ({ items, itemsColumns, isLoading, isPaginate = true }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useMemo(() => items || [], [items]);
  const columns = useMemo(() => itemsColumns || [], [items]);

  const isObjectPageOpen = useSelector(loadOpenObjectPageOpenState());
  const isDialogMode = isObjectPageOpen;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Component>
      <table>
        <Thead table={table} colors={colors} isDialogMode={isDialogMode} />
        {!isLoading && <Tbody table={table} />}
      </table>
      {isLoading && <Loader />}

      {isPaginate && (
        <Pagination table={table} colors={colors} quantity={items?.length} />
      )}
    </Component>
  );
};

export default BasicTable;
