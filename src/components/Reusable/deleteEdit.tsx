/**
 * A dropdown menu component that provides actions for a listing, including an edit form and a delete function.
 *
 * @param {Object} listing - The listing object to be displayed and acted upon.
 * @param {React.FC<{ listing: any }>} EditFormComponent - A React component that renders the edit form for the listing.
 * @param {(id: string) => void} deleteFunction - A function that deletes the listing with the provided ID.
 */
import React from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { TrashCan } from '@carbon/icons-react';
interface ActionsDropdownProps {
  listing: any;
  EditFormComponent: React.FC<{ listing: any }>;
  deleteFunction: (id: string) => void;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ listing, EditFormComponent, deleteFunction }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
        >
          <SquarePen className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger asChild className="hover:bg-neutral-400 dark:hover:bg-neutral-700">
              <Button
                variant="ghost"
                className="flex justify-between items-left  gap-2 w-full"
              >
                Edit <SquarePen className="h-4 w-4 ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="">
              <EditFormComponent listing={listing} />
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center justify-start gap-2 w-full"
          onClick={() => deleteFunction(listing.id)}
        >
          Delete
          <TrashCan className="ml-7" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsDropdown;
