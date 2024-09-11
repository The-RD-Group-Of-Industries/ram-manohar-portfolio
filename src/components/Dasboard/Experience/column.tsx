/**
 * Defines the columns for a table displaying work experience data.
 *
 * The `columns` array contains the column definitions for the table, including the accessor keys, headers, and a custom cell renderer for the "Actions" column.
 *
 * The "Actions" column uses the `ActionsDropdown` component to render a dropdown menu with options to edit or delete the work experience entry.
 *
 * The `deleteProject` function is used to handle the deletion of a work experience entry. It calls the `deleteWorks` function to delete the entry and displays a success or error message using the `toast` component.
 */
import { ColumnDef } from "@tanstack/react-table"
import { toast } from "@/components/ui/use-toast"
import { deleteWorks } from "@/core/actions/Dashboard/Expericence/deleteExp" 
import type { Works } from "@prisma/client"
import EditExpForm from "./ExpEditForm"
import ActionsDropdown from "@/components/Reusable/deleteEdit"


async function deleteProject(id:string) {
        const res = await deleteWorks(id);
        console.log(res)
        if (res.success) {
          toast({
            description: 'Row Deleted Successfully'
            });
        }else {
            if(res.error){
                toast({
                    description: res.error,
                    variant: 'destructive',
                  });
            }
          toast({
            description: 'Record not Found ',
            variant: 'destructive',
          });
        }
}

export const columns: ColumnDef<Works>[] = [
  {
    accessorKey: "id",
    header: "ID",
},
    {
        accessorKey: "title",
        header: "Title",
    },
  {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => {
        const listing = row.original;
        return (
          <ActionsDropdown
            listing={listing}
            EditFormComponent={({ listing }) => <EditExpForm Exp={listing} />}
            deleteFunction={(id) => deleteProject(id)}
          />
        );
      },
    },
]
