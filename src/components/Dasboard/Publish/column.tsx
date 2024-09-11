/**
 * Defines the columns for a table displaying published content.
 * The columns include an ID, a heading, and an actions column that allows editing and deleting the published content.
 * The `deleteProject` function is used to handle the deletion of a published item, displaying a success or error message using the `toast` component.
 */

import { ColumnDef } from "@tanstack/react-table"
import { toast } from "@/components/ui/use-toast"
import { deletePublish } from "@/core/actions/Dashboard/Published/deletePublish" 
import {Published,$Enums} from "@prisma/client"
import EditPublishedForm from "./updatePublishForm"
import ActionsDropdown from "@/components/Reusable/deleteEdit"
$Enums.ptype
async function deleteProject(id:string) {
        const res = await deletePublish(id);
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
export const columns: ColumnDef<Published>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  
    {
      accessorKey: "heading",
      header: "Heading",
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
            EditFormComponent={({ listing }) => <EditPublishedForm published={listing} />}
            deleteFunction={(id) => deleteProject(id)}
          />
        );
      },
    },
  ]
  