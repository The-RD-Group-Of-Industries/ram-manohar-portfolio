/**
 * Renders a data table component with the provided columns and data.
 *
 * @template TData - The type of the data items in the table.
 * @template TValue - The type of the values in the table cells.
 * @param {DataTableProps<TData, TValue>} props - The props for the data table component.
 * @param {ColumnDef<TData, TValue>[]} props.columns - The column definitions for the table.
 * @param {TData[]} props.data - The data to be displayed in the table.
 * @param {string} props.type - The type of the data, used for generating links.
 * @returns {JSX.Element} - The rendered data table component.
 */
"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  type: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  type,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md md:w-[75vw] bg-neutral-100 dark:bg-neutral-800">
      {/* Row count display */}

      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableHeader className="bg-neutral-300 dark:bg-neutral-900 text-center">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="text-center">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white dark:bg-gray-800">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="bg-neutral-100 dark:bg-neutral-800 text-left px-5"
              >
                {row.getVisibleCells().map((cell) => {
                  const isIdColumn = cell.column.columnDef.header === "ID";
                  return (
                    <TableCell
                      key={cell.id}
                      className="px-3 py-2 min-w-32 text-sm font-medium bg-neutral-100 dark:bg-neutral-800"
                    >
                      {isIdColumn ? (
                        <Link
                          href={`./${type}/Data?id=${cell.getValue()}`}
                          passHref
                          className="text-blue-600 hover:underline"
                        >
                          <p>{cell.getValue() as string}</p>
                        </Link>
                      ) : (
                        <span className="m-0 text-center px-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
