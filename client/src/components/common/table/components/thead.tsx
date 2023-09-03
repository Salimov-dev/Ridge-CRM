import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { flexRender } from "@tanstack/react-table";

const Thead = ({ table, colors, isDialogMode }) => {
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
                    : "#2d2d2d",
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
