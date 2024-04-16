import { useTheme } from "@emotion/react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { flexRender } from "@tanstack/react-table";
import { tokens } from "@theme/theme";

const Thead = ({ table, isDialogMode }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{
                  cursor: "pointer",
                  background: !isDialogMode
                    ? `${colors.primary[400]}`
                    : `${colors.grey[800]}`,
                }}
              >
                {header.isPlaceholder ? null : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" && (
                      <KeyboardArrowDownOutlinedIcon />
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <KeyboardArrowUpOutlinedIcon />
                    )}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default Thead;
