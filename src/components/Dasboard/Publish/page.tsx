/**
 * The `PublishPage` component is responsible for rendering the publication management interface.
 * It includes functionality to create new publications, search and filter existing publications,
 * and paginate the results.
 *
 * The component uses various UI components from the `@/components/ui` module, such as `Dialog`,
 * `Select`, `Button`, and `Input`. It also utilizes the `DataTable` component to display the
 * publication data in a tabular format.
 *
 * The component fetches the publication data from the server and provides it as a prop to the
 * `PublishPage` function. It then filters and paginates the data based on the user's search
 * input and current page.
 *
 * The component also includes a form for creating new publications, which includes fields for
 * the publication's heading, authors, journal, year, image, weblinks, and contribution. The
 * form is displayed in a modal dialog and submits the new publication data to the server using
 * the `createPublish` function from `@/core/actions/Dashboard/Published/createPublish`.
 */
"use client";
import { Published, ptype } from "@prisma/client";
import React, { useState } from "react";
import { columns } from "./column";
import { DataTable } from "@/components/Reusable/data-table";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import Heading from "@/components/site/heading";
import { createPublish } from "@/core/actions/Dashboard/Published/createPublish";
import { quillFormats, quillModules } from "@/components/ui/quillModulesTE";
import { Add } from "@carbon/icons-react";

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
export function PublishPage({ data }: { data: Published[] }) {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [newBlog, setNewBlog] = useState({
    image: imageUrl,
    heading: "",
    year: 0,
    journal: "",
    authors: "",
    weblinks: "",
    myContribution: "",
    type: ptype.GOVT,
  });
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createPublish({
        ...newBlog,
        year: Number(newBlog.year),
        image: imageUrl,
      });
      if (result?.success) {
        setNewBlog({
          image: "",
          heading: "",
          year: 0,
          journal: "",
          authors: "",
          weblinks: "",
          myContribution: "",
          type: ptype.GOVT,
        });
        setImageUrl("");
        toast({
          title: "Added",
          description: "Your new Publication has been added successfully.",
        });
        setOpen(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to add new Publication.",
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
    item.heading.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="w-[100%]">
        <div className="flex-1 flex md:justify-center justify-start items-center">
          <p className="bg-gradient-to-r from-[#0851ee8f] via-[#407cff8f] to-blue-900 dark:from-[#407cff8f] dark:to-white bg-clip-text text-left text-transparent text-[26px] tracking-tight font-mono font-thin md:text-[4vh] lg:text-[7vh] py-2">
            Publication
          </p>
          <div
            className={`shadowHeading T4DHeading absolute p-[10vw]`}
            style={{ left: "50%", transform: "translateX(-50%)" }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6 ">
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
              setNewBlog({
                image: "",
                heading: "",
                year: 0,
                journal: "",
                authors: "",
                weblinks: "",
                myContribution: "",
                type: ptype.GOVT,
              });
              setImageUrl("");
            }
          }}
        >

          <DialogTrigger asChild>
            <Button className="bg-dashMain text-white  hover:bg-dashMainHover relative z-40 ">
              Add Publications <Add />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-6">
            <DialogHeader>
              <DialogTitle className="bg-gradient-to-r from-dashMain via-dashMainHover to-blue-900 dark:from-dashMain dark:to-white bg-clip-text text-left  w-full justify-center text-transparent text-[16px] tracking-tight font-mono font-thin md:text-[4vh] lg:text-[3vh]">
                Add New Publication
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="md:mx-3 mx-2 md:w-[80vw] w-[90vw]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="flex flex-col">
                  <Label htmlFor="heading" className="capitalize dark:text-white text-gray-900">
                    Heading
                  </Label>
                  <Input
                    id="heading"
                    value={newBlog.heading}
                    onChange={(e) =>
                      setNewBlog((prev) => ({
                        ...prev,
                        heading: e.target.value,
                      }))
                    }
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="authors" className="capitalize dark:text-white text-gray-900">
                    Authors
                  </Label>
                  <Input
                    id="authors"
                    value={newBlog.authors}
                    onChange={(e) =>
                      setNewBlog((prev) => ({
                        ...prev,
                        authors: e.target.value,
                      }))
                    }
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="journal" className="capitalize dark:text-white text-gray-900">
                    Journal
                  </Label>
                  <Input
                    id="journal"
                    value={newBlog.journal}
                    onChange={(e) =>
                      setNewBlog((prev) => ({
                        ...prev,
                        journal: e.target.value,
                      }))
                    }
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="year" className="capitalize dark:text-white text-gray-900">
                    Year
                  </Label>
                  <Input
                    id="year"
                    type="number"
                    value={newBlog.year}
                    onChange={(e) =>
                      setNewBlog((prev) => ({
                        ...prev,
                        year: parseInt(e.target.value),
                      }))
                    }
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <Label htmlFor="image" className="capitalize dark:text-white text-gray-900">
                    Image
                  </Label>
                  {imageUrl ? (
                    <Image
                      width={200}
                      height={200}
                      src={imageUrl}
                      alt="Uploaded Preview"
                      className="w-full h-auto mt-2 rounded-lg"
                    />
                  ) : (
                    <UploadButton
                      className="mt-2"
                      endpoint="imageUploader"
                      onClientUploadComplete={async (res) => {
                        if (res.length > 0) {
                          setImageUrl(res[0].url);
                          toast({
                            description: "Image uploaded successfully",
                          });
                        }
                      }}
                      onUploadError={(error: Error) => {
                        toast({
                          description: "Image cannot be uploaded",
                          variant: "destructive",
                        });
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-col md:flex-row  md:w-[80vw] gap-4 ">
                  <div className="flex flex-col w-[50%]">
                    <Label htmlFor="weblinks" className="capitalize dark:text-white text-gray-900">
                      Weblinks
                    </Label>
                    <Input
                      id="weblinks"
                      value={newBlog.weblinks}
                      onChange={(e) =>
                        setNewBlog((prev) => ({
                          ...prev,
                          weblinks: e.target.value,
                        }))
                      }
                      className="mt-1"
                      required
                    />
                  </div>



                  <div className="flex flex-col md:col-span-2 w-[50%]">
                    <Label htmlFor="type" className=" text-left capitalize dark:text-gray-100 text-gray-900 ">
                      Type
                    </Label>
                    <Select

                      onValueChange={(value) =>
                        setNewBlog((prev) => ({ ...prev, type: value as any }))
                      }
                      defaultValue={ptype.GOVT}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ptype).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col md:col-span-2">
                  <Label htmlFor="myContribution" className="capitalize dark:text-white text-gray-900">
                    My Contribution
                  </Label>
                  <div className="h-full md:w-[80vw] w-[90vw]">
                    <QuillEditor
                      value={newBlog.myContribution}
                      onChange={(value) =>
                        setNewBlog((prev) => ({
                          ...prev,
                          myContribution: value,
                        }))
                      }
                      modules={quillModules}
                      formats={quillFormats}
                      className="w-full mt-4 bg-white dark:bg-gray-950"
                    />
                  </div>
                </div>

              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-dashMain text-white relative z-40"
                >
                  Add Publish
                </Button>
              </DialogFooter>
            </form>

          </DialogContent>
        </Dialog>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs justify-end"
        />
      </div>
      <div className="py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
        Total Rows:{" "}
        <span className="text-base font-bold text-dashMain">{data.length}</span>
      </div>
      <DataTable columns={columns} data={paginatedData} type="Published" />

      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="bg-dashMain text-white hover:bg-dashMainHover relative z-40"
        >
          Previous
        </Button>
        <span>
          Page {currentPage + 1} of {pageCount}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === pageCount - 1}
          className="bg-dashMain text-white  hover:bg-dashMainHover relative z-40"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
