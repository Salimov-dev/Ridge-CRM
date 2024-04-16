// icons
import FirstPageOutlinedIcon from "@mui/icons-material/FirstPageOutlined";
import LastPageOutlinedIcon from "@mui/icons-material/LastPageOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
// MUI
import { Box, Typography, Select, MenuItem } from "@mui/material";
// styles
import {
  PaginationButton,
  PageBlock,
  PaginationBlock,
  PaginationContainer,
  PaginationPageNavigation,
  SearchedRows
} from "@styled/styled-table";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";

const Pagination = ({ table, quantity }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <PaginationContainer>
      <SearchedRows>
        <Typography>Найдено строк:</Typography> {quantity}
      </SearchedRows>

      <PaginationBlock>
        <PaginationPageNavigation>
          <PaginationButton
            variant="outlined"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            sx={{
              "&:hover": {
                borderColor: "yellow"
              }
            }}
          >
            <FirstPageOutlinedIcon
              sx={{
                color: !table.getCanPreviousPage()
                  ? "inherit"
                  : colors.grey[100]
              }}
            />
          </PaginationButton>
          <PaginationButton
            variant="outlined"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            sx={{
              "&:hover": {
                borderColor: "yellow"
              }
            }}
          >
            <ChevronLeftOutlinedIcon
              sx={{
                color: !table.getCanPreviousPage()
                  ? "inherit"
                  : colors.grey[100]
              }}
            />
          </PaginationButton>
          <PaginationButton
            variant="outlined"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            sx={{
              "&:hover": {
                borderColor: "yellow"
              }
            }}
          >
            <ChevronRightOutlinedIcon
              sx={{
                color: !table.getCanNextPage() ? "inherit" : colors.grey[100]
              }}
            />
          </PaginationButton>
          <PaginationButton
            variant="outlined"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            sx={{
              "&:hover": {
                borderColor: "yellow"
              }
            }}
          >
            <LastPageOutlinedIcon
              sx={{
                color: !table.getCanNextPage() ? "inherit" : colors.grey[100]
              }}
            />
          </PaginationButton>
        </PaginationPageNavigation>

        <PageBlock>
          <Typography>Страница:</Typography>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <Typography>
              {table.getState().pagination.pageIndex + 1} из{" "}
            </Typography>
            <Typography>{table.getPageCount()}</Typography>
          </Box>
        </PageBlock>

        <Select
          size="small"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <MenuItem key={pageSize} value={pageSize}>
              <Typography>Показать по: {pageSize}</Typography>
            </MenuItem>
          ))}
        </Select>
      </PaginationBlock>
    </PaginationContainer>
  );
};

export default Pagination;
