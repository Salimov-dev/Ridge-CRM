// libraries
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
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
// store
import { loadOpenObjectPageOpenState } from "../../../store/object/open-object-page.store";
import { loadUpdateRidgeObjectOpenState } from "../../../store/ridge-object/update-ridge-object.store";
// theme
import { tokens } from "../../../theme";

const Component = styled(Box)`
// height: calc(100vh - 60px); 
// overflow-y: auto;
// min-height: 1000px; 
  // overflow-y: auto
  // margin-bottom: 20px;
`;

const BasicTable = ({ items, itemsColumns, isLoading, isPaginate = true }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useMemo(() => items || [], [items]);
  const columns = useMemo(() => itemsColumns || [], [items]);

  const isObjectPageOpen = useSelector(loadOpenObjectPageOpenState());
  const isRidgeObjectPageOpen = useSelector(loadUpdateRidgeObjectOpenState());
  const isDialogMode = isObjectPageOpen || isRidgeObjectPageOpen;

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
    <Component >
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
