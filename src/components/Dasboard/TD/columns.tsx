/**
 * Defines the columns for a table displaying TD (Task/Deliverable) data.
 * The columns include an ID, title, type, and actions (edit and delete).
 * The `deleteProject` function is used to delete a TD record, displaying a success or error message using the `toast` component.
 */
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "@/components/ui/use-toast";
import { deleteTD } from "@/core/actions/Dashboard/T4/deleteTd";
import { TD } from "@prisma/client";
import EditTDForm from "./udateTDForm";
import ActionsDropdown from "@/components/Reusable/deleteEdit";

async function deleteProject(id: string) {
  const res = await deleteTD(id);
  if (res.success) {
    toast({
      description: 'Row Deleted Successfully'
    });
  } else {
    toast({
      description: res.error || 'Record not Found',
      variant: 'destructive',
    });
  }
}

export const columns: ColumnDef<TD>[] = [
  {
    accessorKey: "id",
    header: "ID"
   
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Type",
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
          EditFormComponent={({ listing }) => <EditTDForm Exp={listing} />}
          deleteFunction={(id) => deleteProject(id)}
        />
      );
    },
  },
];
