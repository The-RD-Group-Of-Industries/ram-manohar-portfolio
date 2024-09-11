/**
 * The `TDPage` component is responsible for rendering the T4D (Technical Delivery) page. It includes a data table to display the T4D data, a search input, and a dialog to create a new T4D.
 *
 * The component uses the `useState` hook to manage the state of the dialog, the new project data, and the search term. It also uses the `useToast` hook to display success or error messages.
 *
 * The `handleInputChange` function is used to update the new project data when the user types in the form fields. The `handleSelectChange` function is used to update the project type when the user selects a value from the dropdown.
 *
 * The `handleSubmit` function is called when the user submits the form to create a new T4D. It calls the `createTD` function from the `@/core/actions/Dashboard/T4/createTD` module to create the new T4D, and displays a success or error message using the `useToast` hook.
 *
 * The `filteredData` variable is used to filter the T4D data based on the search term. The `paginatedData` variable is used to display a subset of the filtered data based on the current page.
 *
 * The `handleNextPage` and `handlePreviousPage` functions are used to navigate through the paginated data.
 *
 * @param {Object} props - The component props.
 * @param {TD[]} props.data - The T4D data to be displayed in the data table.
 * @returns {JSX.Element} - The rendered `TDPage` component.
 */
"use client";
import React, { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/Reusable/data-table";
import { Add } from "@carbon/icons-react";
import { Button } from "@/components/ui/button";
import { TD } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; 
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Heading from "@/components/site/heading";
import { createTD } from "@/core/actions/Dashboard/T4/createTD";
import { quillFormats, quillModules } from "@/components/ui/quillModulesTE";

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
enum ProjectType {
  Web = "WEB",
  Statistical = "STATISTICAL",
}

interface Post {
  title: string;
  Desc: string;
  Website: string;
  Tech: string;
  contribution: string;
  type: ProjectType;
  username: string;
  password: string;
}

function TDPage({ data }: { data: TD[] }) {
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState<Post>({
    title: "",
    Desc: "",
    Website: "",
    Tech: "",
    contribution: "",
    type: ProjectType.Web,
    username: "",
    password: "",
  });
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 6;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setNewProject((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: ProjectType) => {
    setNewProject((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createTD(newProject);

      if (result?.success) {
        setNewProject({
          title: "",
          Desc: "",
          Website: "",
          Tech: "",
          contribution: "",
          type: ProjectType.Web,
          username: "",
          password: "",
        });
        toast({
          title: "Added",
          description: "Your new T4D has been added successfully.",
        });
        setOpen(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to add new T4D.",
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
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-[98%] md:m-3 m-1 md:p-2 p-1 flex flex-col">
      <div className="w-full">
        <div className="flex-1 flex md:justify-center justify-start items-center">
          <p className="bg-gradient-to-r from-dashMain via-dashMainHover to-blue-900 dark:from-dashMain dark:to-white bg-clip-text text-left text-transparent text-[26px] tracking-tight font-mono font-thin md:text-[4vh] lg:text-[7vh] py-2">
            T4D and Analytics
          </p>
          <div
            className={`shadowHeading T4DHeading absolute p-[10vw]`}
            style={{ left: "50%", transform: "translateX(-50%)" }}
          ></div>
        </div>
      </div>

      <div className="flex mb-4 justify-between ">
      <Dialog 
  open={open} 
  onOpenChange={(isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset form data when the dialog is closed
      setNewProject({
        title: "",
        Desc: "",
        Website: "",
        Tech: "",
        contribution: "",
        type: ProjectType.Web,
        username: "",
        password: "",
      })
    }
  }}
>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-dashMain text-white hover:bg-dashMainHover relative z-40"
            >
              Add T4D
              <Add />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-6">
            <DialogHeader>
              <DialogTitle className="bg-gradient-to-r from-dashMain via-dashMainHover to-blue-900 dark:from-dashMain dark:to-white bg-clip-text text-left  w-full justify-center text-transparent text-[16px] tracking-tight font-mono font-thin md:text-[4vh] lg:text-[3vh]">
                Add New T4D
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="md:mx-3 mx-2 md:w-[80vw] w-[90vw]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {/* Title */}
                <div className="flex flex-col">
                  <Label htmlFor="title" className="capitalize dark:text-white text-gray-900">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Enter title"
                    required
                  />
                </div>

                {/* Website */}
                <div className="flex flex-col ">
                  <Label htmlFor="Website" className="capitalize dark:text-white text-gray-900">
                    Website
                  </Label>
                  <Input
                    id="Website"
                    value={newProject.Website}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Enter website"
                  />
                </div>

               

                {/* Technology */}
                <div className="flex flex-col">
                  <Label htmlFor="Tech" className="capitalize dark:text-white text-gray-900">
                    Tech
                  </Label>
                  <Input
                    id="Tech"
                    value={newProject.Tech}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Enter tech"
                  />
                </div>

                {/* Type */}
                <div className="flex flex-col ">
                  <Label
                    htmlFor="type"
                    className="text-left dark:text-white text-gray-900 mb-1"
                  >
                    Type
                  </Label>
                  <Select
                    onValueChange={handleSelectChange}
                    defaultValue={newProject.type}
                  >
                    <SelectTrigger className="col-span-3 fborder border-dashMain">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-neutral-900">
                      {Object.values(ProjectType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Username */}
                <div className="flex flex-col ">
                  <Label htmlFor="username" className="capitalize dark:text-white text-gray-900">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={newProject.username}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Enter username"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col ">
                  <Label htmlFor="password" className="capitalize dark:text-white text-gray-900">
                    Password
                  </Label>
                  <Input
                    id="password"
                    value={newProject.password}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Enter password"
                  />
                </div>
                <div className="">
                   {/* Description */}
 <div className="flex flex-col ">
                  <Label htmlFor="Desc" className="capitalize dark:text-white text-gray-900">
                    Description
                  </Label>
                 
 <div className="h-full md:w-[80vw] w-[90vw] mb-4">
                    <QuillEditor
                      value={newProject.Desc}
                      onChange={(e) =>
                        setNewProject((prev) => ({
                          ...prev,
                          Desc: e,
                        }))
                      }
                      modules={quillModules}

                      formats={quillFormats}
                      className="w-full  mt-1 bg-white dark:bg-gray-950 "
                    />
                  </div>
                </div>
                {/* Contribution */}
                <div className="flex flex-col ">
                  <Label htmlFor="contribution" className="text-left capitalize  dark:text-white text-gray-900">
                    Contribution
                  </Label>
                  <div className="h-full md:w-[80vw] w-[90vw]">
                    <QuillEditor
                    id = "contribution"
                      value={newProject.contribution}
                      onChange={(e) =>
                        setNewProject((prev) => ({
                          ...prev,
                          contribution: e,
                        }))
                      }
                      modules={quillModules}

                      formats={quillFormats}
                      className="w-full  mt-1 bg-white dark:bg-gray-950 "
                    />
                  </div>
                 
                </div>

                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-dashMain text-white hover:bg-dashMainHover"
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>

          </DialogContent>
        </Dialog>
        <div className="">
          <Input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs "
          />

        </div>
      </div>
      <div className="py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
        Total Rows:{" "}
        <span className="text-base font-bold text-dashMain">{data.length}</span>
      </div>
      <DataTable columns={columns} data={paginatedData} type="TD" />
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="bg-dashMain text-white  hover:bg-dashMainHover relative z-40"
        >
          Previous
        </Button>
        <span>
          Page {currentPage + 1} of {pageCount}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === pageCount - 1}
          className="bg-dashMain text-white hover:bg-dashMainHover relative z-40"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default TDPage;
