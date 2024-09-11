/**
 * A React component that renders a form for editing a published item.
 *
 * @param {Object} props - The component props.
 * @param {Published} props.published - The published item to be edited.
 * @returns {JSX.Element} - The rendered form.
 */
"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/otherTextArea";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { $Enums, ptype, type Published } from "@prisma/client";
import { UpdatePublished } from "@/core/actions/Dashboard/Published/updatePublish";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";

const EditPublishedForm = ({ published }: { published: Published }) => {
    const [imageUrl, setImageUrl] = useState(published.image || "");
    const [selectedType, setSelectedType] = useState(published.type ?? "GOVT");
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            heading: published.heading ?? "",
            year: published.year ?? "",
            journal: published.journal ?? "",
            authors: published.authors ?? "",
            weblinks: published.weblinks ?? "",
            myContribution: published.myContribution ?? "",
            type: published.type ?? "GOVT", // Default to GOVT
        }
    });

    const onSubmit = async (data: any) => {
        try {
            const updatedPublished = {
                ...published,
                ...data,
                year: data.year ? Number(data.year) : null, // Convert year to number if present
                image: imageUrl, // Use the updated image URL
                type: selectedType, // Use the selected type
            };
            const res = await UpdatePublished(updatedPublished);
            console.log(res);

            if (res?.success) {
                toast({
                    description: "Publication data updated successfully",
                });
        window.location.reload()

            } else {
                toast({
                    description: res?.error || "Failed to update the Publication data",
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:p-4 p-2 md:w-[80vw] grid md:grid-cols-2 gap-x-6 gap-y-4 w-[90vw]">
            <div className="md:col-span-1 mt-[24px]">
                <label htmlFor="heading" className="block text-lg font-medium">Title</label>
                <Input
                    id="heading"
                    {...register("heading", { required: "Title is required" })}
                    placeholder="Enter the title of your blog post"
                    className="mt-1 w-full"
                />
                {errors.heading && <p className="text-red-500 mt-1">{errors.heading.message}</p>}
            </div>

            <div className="md:col-span-1">
                <label htmlFor="authors" className="block text-lg font-medium">Authors</label>
                <Input
                    id="authors"
                    {...register("authors", { required: "Author name is required" })}
                    placeholder="Enter the author's name"
                    className="mt-1 w-full"
                />
                {errors.authors && <p className="text-red-500 mt-1">{errors.authors.message}</p>}
            </div>

            <div className="md:col-span-2">
    <label htmlFor="myContribution" className="block text-lg font-medium">
        My Contribution
    </label>
    <Textarea
        id="myContribution"
       {...register("myContribution", { required: "Content is required" })}
        className="mt-1 w-full"
    />
    {errors.myContribution && (
        <p className="text-red-500 mt-1">
            {errors.myContribution.message}
        </p>
    )}
</div>


            <div className="md:col-span-1">
                <label htmlFor="weblinks" className="block text-lg font-medium">Weblinks</label>
                <Input
                    id="weblinks"
                    {...register("weblinks")}
                    placeholder="Add any relevant weblinks (optional)"
                    className="mt-1 w-full"
                />
                {errors.weblinks && <p className="text-red-500 mt-1">{errors.weblinks.message}</p>}
            </div>

            <div className="md:col-span-1">
                <label htmlFor="type" className="block text-lg font-medium">Type</label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="mt-1 w-full bg-neutral-300 dark:bg-neutral-800 text-neutral-900 dark:text-white :bg-neutral-400 dark:hover:bg-neutral-700 "
                        >
                            {selectedType || "Select Type"} {/* Show the current selection or a placeholder */}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                         className="md:w-[35vw]"
                            onClick={() => {
                                setSelectedType($Enums.ptype.GOVT);
                                setValue("type", $Enums.ptype.GOVT);
                            }}
                        >
                            GOVT
                        </DropdownMenuItem>
                        <DropdownMenuItem
                         className="md:w-[35vw]"
                            onClick={() => {
                                setSelectedType($Enums.ptype.RESEARCH);
                                setValue("type", $Enums.ptype.RESEARCH);
                            }}
                        >
                            RESEARCH
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {errors.type && <p className="text-red-500 mt-1">{errors.type.message}</p>}
            </div>

            <div className="md:col-span-2">
                <label className="block text-lg font-medium">Image</label>
                {imageUrl ? (
                    <div className="mt-1">
                        <Image height={200} width={200} src={imageUrl} alt="Uploaded Preview" className="w-32 h-32 object-cover rounded-lg" />
                        <Button
                            variant="outline"
                            onClick={() => setImageUrl("")}
                            className="mt-4 bg-dashMain text-white"
                        >
                            Change Image
                        </Button>
                    </div>
                ) : (
                    <div className="mt-1">
                        <UploadButton
                            className="ml-10"
                            endpoint="imageUploader"
                            onClientUploadComplete={async (res) => {
                                console.log("Files: ", res);
                                if (res.length > 0) {
                                    setImageUrl(res[0].url);
                                    toast({
                                        description: 'Image uploaded successfully',
                                    });
                                }
                            }}
                            onUploadError={(error: Error) => {
                                toast({
                                    description: 'Image cannot be uploaded',
                                    variant: 'destructive',
                                });
                            }}
                        />
                    </div>
                )}
            </div>

            <div className="md:col-span-2">
                <Button
                    type="submit"
                    className="w-full py-3 bg-dashMain text-white hover:bg-dashMainHover"
                >
                    Update
                </Button>
            </div>
        </form>
    );
};

export default EditPublishedForm;
