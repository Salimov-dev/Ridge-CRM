// libraries
import { useMemo, useState, useEffect } from "react";
// MUI
import { Box, useTheme } from "@mui/material";
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

const BasicTable = ({ items, itemsColumns, isLoading ,   sortingColumn="created_at", }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useMemo(() => items || [], [items]);
  const columns = useMemo(() => itemsColumns || [], [items]);

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

  useEffect(() => {
    setSorting([{ id: sortingColumn, desc: true }]);
  }, []);

  return (
    <Box>
      <table>
        <Thead table={table} colors={colors} />
        {!isLoading && <Tbody table={table} />}
      </table>
      {isLoading && <Loader />}

      <Pagination table={table} colors={colors} quantity={items?.length} />
    </Box>
  );
};

export default BasicTable;
