/**
 * A React component that renders a form for editing a blog post.
 *
 * @param {object} props - The component props.
 * @param {Blog} props.blog - The blog post to be edited.
 * @returns {JSX.Element} - The rendered form component.
 */

  // Component implementation;
"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/otherTextArea";
import type { Blog } from "@prisma/client";
import { UpdateBlog } from "@/core/actions/Dashboard/Blog/updateBlog";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";

const EditBlogForm = ({ blog }: { blog: Blog }) => {
  const [imageUrl, setImageUrl] = useState(blog.image || "");
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: blog.title ?? "",
      author: blog.author ?? "",
      desc: blog.desc ?? "",
      trending: blog.trending ?? 0,
      type: blog.type ?? "",
    }
  });


  const onSubmit = async (data: any) => {
    try {
      const updatedBlog = {
        ...blog,
        ...data,
        trending: Number(data.trending), // Ensure trending is a number
        image: imageUrl, // Use the updated image URL
      };
      const res = await UpdateBlog(updatedBlog);
      console.log(res);

      if (res?.success) {
        toast({
          description: "Blog updated successfully",
        });
        window.location.reload()
      } else {
        toast({
          description: res?.error || "Failed to update the blog",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="shadow-lg p-6 rounded-lg w-[80vw] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-[4px]"
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
          Title
        </label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
          className="w-full"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
          Author
        </label>
        <Input
          id="author"
          {...register("author", { required: "Author is required" })}
          className="w-full"
        />
        {errors.author && (
          <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="desc" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
          Description
        </label>
        <Textarea
          id="desc"
          {...register("desc", { required: "Description is required" })}
          className="w-full"
        />
        {errors.desc && (
          <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="trending" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
          Trending
        </label>
        <Input
          id="trending"
          type="number"
          {...register("trending", { required: "Trending is required" })}
          className="w-full"
        />
        {errors.trending && (
          <p className="text-red-500 text-sm mt-1">{errors.trending.message}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium mb-2 dark:text-white text-gray-900">Image</label>
        {imageUrl ? (
          <div className="flex flex-col items-center">
            <Image
              height={200}
              width={200}
              src={imageUrl}
              alt="Uploaded Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <Button
              className="bg-neutral-300 dark:bg-neutral-800 text-neutral-900 dark:dark:text-white hover:bg-neutral-400 mt-4 dark:hover:bg-neutral-700 relative z-40"
              variant="outline"
              onClick={() => setImageUrl("")}
            >
              Change Image
            </Button>
          </div>
        ) : (
          <div>
            <UploadButton
              className="ml-10"
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
          </div>
        )}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="type" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
          Type
        </label>
        <Input
          id="type"
          {...register("type", { required: "Type is required" })}
          className="w-full"
        />
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      <div className="sm:col-span-2 flex justify-end">
        <Button
          className="bg-dashMain dark:text-white text-gray-900 relative z-40"
          type="submit"
        >
          Update Blog
        </Button>
      </div>
    </form>
  );
};

export default EditBlogForm;
