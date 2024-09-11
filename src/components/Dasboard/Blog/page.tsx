/**
 * The `BlogPage` component is responsible for rendering the blog management interface in the dashboard. It includes functionality for creating new blog posts, searching through existing blog posts, and paginating the results.
 *
 * The component uses the `DataTable` component to display the list of blog posts, and the `QuillEditor` component for the blog post description input. It also integrates with the `UploadButton` component to allow users to upload an image for the blog post.
 *
 * The component handles the state for the new blog post form, including the title, author, trending status, type, and description. It also manages the state for the current page and search term.
 *
 * When a new blog post is submitted, the component calls the `createBlog` function to save the new post, and then updates the blog data by calling the `getBlog` function.
 *
 * @param {BlogPageProps} props - The props passed to the `BlogPage` component.
 * @param {any} props.data - The initial blog data to be displayed.
 * @returns {JSX.Element} - The rendered `BlogPage` component.
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
import { UploadButton } from "@/utils/uploadthing";
import { createBlog } from "@/core/actions/Dashboard/Blog/createBlog";
import { BlogPageProps } from "@/resourse/types";
import { getBlog } from "@/core/actions/Dashboard/Blog/getBlog";
import Image from "next/image";
import { quillFormats, quillModules } from "@/components/ui/quillModulesTE";

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export function BlogPage({ data }: BlogPageProps) {
  const [open, setOpen] = useState(false);
  const [uData, setData] = useState(data);
  const [imageUrl, setImageUrl] = useState("");
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    desc: "",
    trending: 0,
    image: "",
    type: "",
  });
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;



  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { id, value } = e.target as string | any;
    setNewBlog((prev) => ({
      ...prev,
      [id]: id === "trending" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(newBlog.desc)
    e.preventDefault();
    if (newBlog.trending <= 0 ) {
      toast({
        title: "Validation Error",
        description: "Please provide a valid trending number.",
        variant: "destructive",
      });
      return; // Prevent form submission
    }
    

    try {
      const result = await createBlog({
        ...newBlog,
        trending: Number(newBlog.trending),
        image: imageUrl,
      });
      if (result?.success) {
        setNewBlog({
          title: "",
          author: "",
          desc: "",
          trending: 0,
          image: "",
          type: "",
        });
        setImageUrl("");
        toast({
          title: "Added",
          description: "Your new blog has been added successfully.",
        });
        const updateData = await getBlog();
        setData(updateData);
        setOpen(false);
      } else {
        toast({
          title: "Error",
          description: `Failed to add new blog`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: `"An unexpected error occurred.${error}`,
        variant: "destructive",
      });
    }
  };




 
  if ("error" in data) {
    return <div>Error: {data.error}</div>;
  }

  const filteredData = Array.isArray(uData)
    ? uData.filter((item) =>
      item.title
        ? item.title.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
    : [];

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
            Blog
          </p>
          <div
            className={`shadowHeading T4DHeading absolute p-[10vw]`}
            style={{ left: "50%", transform: "translateX(-50%)" }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between items-start mb-4">
        <Dialog  open={open} 
  onOpenChange={(isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset form data when the dialog is closed
      setNewBlog({
        title: "",
        author: "",
        desc: "",
        trending: 0,
        image: "",
        type: "",
      });
      setImageUrl("");
    }
  }}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-dashMain text-white  hover:bg-dashMainHover relative z-40"
            >
              Add Blog
              <Add />
            </Button>
          </DialogTrigger>
          <DialogContent className=" bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-6">
            <DialogHeader>
              <DialogTitle className="bg-gradient-to-r from-dashMain via-dashMainHover to-blue-900 dark:from-dashMain dark:to-white bg-clip-text text-left text-transparent text-[16px] tracking-tight font-mono font-thin md:text-[4vh] lg:text-[3vh]">
                Add Blog
                <Add/>
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="w-[90vw] md:w-[80vw]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="flex flex-col">
                  <Label
                    htmlFor="title"
                    className="capitalize dark:text-white text-gray-900"
                  >
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newBlog.title}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <Label
                    htmlFor="author"
                    className="capitalize dark:text-white text-gray-900"
                  >
                    Author
                  </Label>
                  <Input
                    id="author"
                    value={newBlog.author}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>


                <div className="flex flex-col">
                  <Label
                    htmlFor="trending"
                    className="capitalize dark:text-white text-gray-900"

                  >
                    Trending
                  </Label>
                  <Input
                    id="trending"
                    type="number"
                    value={newBlog.trending}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div className="flex flex-col">
                  <Label
                    htmlFor="type"
                    className="capitalize dark:text-white text-gray-900"
                  >
                    Type
                  </Label>
                  <Input
                    id="type"
                    type="text"
                    value={newBlog.type}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <Label
                    htmlFor="image"
                    className="capitalize dark:text-white text-gray-900"
                  >
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
                      className="mt-1"
                      endpoint="imageUploader"
                      onClientUploadComplete={async (res) => {
                        console.log("Files: ", res);
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
                <div className="flex flex-col md:col-span-2">
                  <Label
                    htmlFor="desc"
                    className="capitalize dark:text-white text-gray-500"
                  >
                    Description
                  </Label>

                  <div className="h-full md:w-[80vw] w-[90vw]">
                  <QuillEditor
                    value={newBlog.desc}
                    onChange={(value) =>
                      setNewBlog((prev) => ({
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
                  className="bg-dashMain hover:bg-dashMainHover text-white "
                  type="submit"
                >
                  Add
                </Button>
              </DialogFooter>
            </form>

          </DialogContent>
        </Dialog>
        <div className="flex items-center">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-2 relative z-40"
          />
        </div>
      </div>
      <DataTable columns={columns} data={paginatedData} type="Blog" />
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="bg-dashMain hover:bg-dashMainHover text-white"
        >
          Previous
        </Button>
        <p>
          Page {currentPage + 1} of {pageCount}
        </p>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1))
          }
          disabled={currentPage === pageCount - 1}
          className="bg-dashMain hover:bg-dashMainHover  text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
