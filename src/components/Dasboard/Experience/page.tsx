/**
 * The `ExperiencePage` component is responsible for rendering the work experience section of the dashboard. It includes a data table to display the user's work experience, a search input to filter the data, and a dialog to add new work experience.
 *
 * The component uses the `createWorks` function from `@/core/actions/Dashboard/Expericence/createExp` to create new work experience entries. It also uses the `useToast` hook from `@/components/ui/use-toast` to display success or error messages.
 *
 * The component receives a `data` prop of type `Works[]` which represents the user's work experience data.
 */
"use client";

import React, { useState } from "react";
import { columns } from "./column";
import { DataTable } from "@/components/Reusable/data-table";
import { Add } from "@carbon/icons-react";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createWorks } from "@/core/actions/Dashboard/Expericence/createExp";
import { Works } from "@prisma/client";
import Heading from "@/components/site/heading";
import DOMPurify from "dompurify";
import { quillFormats, quillModules } from "@/components/ui/quillModulesTE";

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
export function ExperiencePage({ data }: { data: Works[] }) {
  const [open, setOpen] = useState(false);
  const [newWork, setNewWork] = useState({
    start: 0,
    end: "",
    title: "",
    place: "",
    desc: "",
  });

  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setNewWork((prev) => ({
      ...prev,
      [id]: id === "start" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Sanitize the description to prevent XSS attacks
      const sanitizedDesc = DOMPurify.sanitize(newWork.desc);
      const result = await createWorks({
        ...newWork,
        desc: sanitizedDesc,
      });
      if (result?.success) {
        setNewWork({
          start: 0,
          end: "",
          title: "",
          place: "",
          desc: "",
        });
        toast({
          title: "Added",
          description: "Your new work experience has been added successfully.",
        });
        setOpen(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to add new work experience.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  // Filter data based on the search term
  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
      item.title
        ? item.title.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
    : [];

  // Pagination logic
  const pageCount = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  return (
    <div className="w-[98%] md:m-3 m-1 md:p-2 p-1 flex flex-col">
      <div className="w-[100%]">
        <div className="flex-1 flex md:justify-center justify-start items-center">
          <p className="bg-gradient-to-r from-[#0851ee8f] via-[#407cff8f] to-blue-900 dark:from-[#407cff8f] dark:to-white bg-clip-text text-left text-transparent text-[26px] tracking-tight font-mono font-thin md:text-[4vh] lg:text-[7vh] py-2">
            Work Experience <Add />
          </p>
          <div
            className={`shadowHeading T4DHeading absolute p-[10vw]`}
            style={{ left: "50%", transform: "translateX(-50%)" }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between items-start mb-4">
      <Dialog 
  open={open} 
  onOpenChange={(isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset form data when the dialog is closed
      setNewWork({
        start: 0,
        end: "",
        title: "",
        place: "",
        desc: "",
      });
    }
  }}
>

          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-dashMain dark:text-white text-gray-900 hover:bg-dashMainHover relative z-40"
            >
              Add Work <Add />
            </Button>
          </DialogTrigger>
          <DialogContent className=" bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-6">
            <DialogHeader>
              <DialogTitle className="bg-gradient-to-r from-dashMain via-dashMainHover to-blue-900 dark:from-dashMain dark:to-white bg-clip-text text-left text-transparent text-[16px] tracking-tight font-mono font-thin md:text-[4vh] lg:text-[3vh]">
                Add New Work Experience
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="w-[90vw] md:w-[80vw]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="flex flex-col">
                  <Label
                    htmlFor="start"
                    className="capitalize dark:text-white text-gray-900"
                  >
                    Start Year
                  </Label>
                  <Input
                    id="start"
                    type="number"
                    value={newWork.start}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <Label
                    htmlFor="end"
                    className="capitalize dark:text-white text-gray-900"
                  >
                    End Year
                  </Label>
                  <Input
                    id="end"
                    value={newWork.end}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <Label
                    htmlFor="title"
                    className="capitalize dark:text-white text-gray-900"
                  >
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newWork.title}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <Label
                    htmlFor="place"
                    className="capitalize dark:text-white text-gray-900"
                  >
                    Place
                  </Label>
                  <Input
                    id="place"
                    value={newWork.place}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <Label
                    htmlFor="desc"
                    className="capitalize dark:text-white text-gray-900 mb-1"
                  >
                    Description
                  </Label>
                  <div className="h-full md:w-[80vw] w-[90vw]">
                    <QuillEditor
                      value={newWork.desc}
                      onChange={(value) =>
                        setNewWork((prev) => ({
                          ...prev,
                          desc: value,
                        }))
                      }
                      modules={quillModules}

                      formats={quillFormats}
                      className="w-full  mt-4 bg-white dark:bg-gray-950 "
                    />
                  </div>

                </div>
              </div>
              <DialogFooter>
                <Button
                  className="bg-dashMain text-whitehover:bg-dashMainHover relative z-40"
                  type="submit"
                >
                  Add Work
                </Button>
              </DialogFooter>
            </form>

          </DialogContent>
        </Dialog>
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-2 relative z-40"
          />
        </div>
      </div>
      <div className="py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
        Total Rows:{" "}
        <span className="text-base font-bold text-dashMain">{data.length}</span>
      </div>
      <DataTable columns={columns} data={paginatedData} type="Expericence" />
      <div className="flex justify-between items-center mt-2">
        <Button
          className="bg-dashMain text-white  hover:bg-dashMainHover relative z-40"
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <span>
          Page {currentPage + 1} of {pageCount}
        </span>
        <Button
          variant="outline"
          className="bg-dashMain text-white hover:bg-dashMainHover relative z-40"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(pageCount - 1, prev + 1))
          }
          disabled={currentPage === pageCount - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
