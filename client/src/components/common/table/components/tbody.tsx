import { flexRender } from "@tanstack/react-table";

const Tbody = ({ table, hasFooter }) => {
  const footerGroups = table.getFooterGroups()

  return (
    <>
    <tbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <tr key={row.id} >
            {row.getVisibleCells().map((cell) => {
              return (
                <td key={cell.id} >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
    {hasFooter && <tfoot>
        {footerGroups.slice(0, 1).map((footerGroup) => (
          // Use slice(0, 1) to get only the top-level footerGroup
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.footer)}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>}
   </>
  );
};

export default Tbody;
