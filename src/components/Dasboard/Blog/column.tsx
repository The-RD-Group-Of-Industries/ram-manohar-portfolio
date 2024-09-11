/**
 * Defines the column definitions for a table displaying blog data.
 * The columns include the blog ID, title, type, and actions (edit and delete).
 * The `deleteProject` function is used to handle the deletion of a blog post.
 */
import { ColumnDef } from "@tanstack/react-table";
import { TrashCan } from '@carbon/icons-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { deleteBlog } from "@/core/actions/Dashboard/Blog/deleteBlog";
import type { Blog } from "@prisma/client";
import EditBlogDialog from "./updateForm"; // Adjust the import path as needed
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import ActionsDropdown from "@/components/Reusable/deleteEdit";

async function deleteProject(id: string) {
    const res = await deleteBlog(id);
    console.log(res);
    if (res.success) {
        toast({
            description: 'Row Deleted Successfully'
        });
    } else {
        if (res.error) {
            toast({
                description: res.error,
                variant: 'destructive',
            });
        }
        toast({
            description: 'Record not Found',
            variant: 'destructive',
        });
    }
}

export const columns: ColumnDef<Blog>[] = [
    {
        accessorKey: "id",
        header: "ID",
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
              EditFormComponent={({ listing }) => <EditBlogDialog blog={listing} />}
              deleteFunction={(id) => deleteProject(id)}
            />
          );
        },
      },
];
