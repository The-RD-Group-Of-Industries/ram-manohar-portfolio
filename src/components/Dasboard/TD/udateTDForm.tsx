/**
 * A React component that renders a form for editing a Technical Document (TD) item.
 *
 * The form includes fields for the title, website, description, technology, contribution, username, password, and type of the TD. The form is pre-populated with the values from the `Exp` prop, which is an object of type `TD` (from the `@prisma/client` package).
 *
 * The component uses the `react-hook-form` library to manage the form state and validation. When the form is submitted, the `onSubmit` function is called, which updates the TD using the `UpdateTD` function from the `@/core/actions/Dashboard/T4/updateTD` module.
 *
 * The component also includes a dropdown menu for selecting the type of the TD, which is implemented using the `DropdownMenu` component from the `@/components/ui/dropdown-menu` module.
 *
 * @param {Object} props - The component props.
 * @param {TD} props.Exp - The TD object to be edited.
 * @returns {JSX.Element} - The rendered form component.
 */
"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/otherTextArea"; // Ensure this is the correct import
import { $Enums, TD } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { UpdateTD } from "@/core/actions/Dashboard/T4/updateTD";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

const EditTDForm = ({ Exp }: { Exp: TD }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: Exp.title ?? "",
      Desc: Exp.Desc ?? "",
      Website: Exp.Website ?? "",
      Tech: Exp.Tech ?? "",
      contribution: Exp.contribution ?? "",
      username: Exp.username ?? "",
      password: Exp.password ?? "",
      type: Exp.type ?? "",
    },
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Exp) {
      setOpen(true);
    }
  }, [Exp]);

  const selectedType = watch("type");

  const onSubmit = async (data: any) => {
    try {
      const updatedExp = {
        ...Exp,
        ...data,
        type: data.type as $Enums.Type,
      };
      const res = await UpdateTD(updatedExp);

      if (res?.success) {
        toast({
          description: "T4D updated successfully",
        });
        window.location.reload()

      } else {
        toast({
          description: res?.error || "Failed to update the T4D",
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
    } finally {
      setOpen(false);
    }
  };

  return (
    open && (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-lg p-6 rounded-lg w-[80vw] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-[20px]  "
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
          <label htmlFor="Website" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
            Website
          </label>
          <Input id="Website" {...register("Website")} className="w-full" />
          {errors.Website && (
            <p className="text-red-500 text-sm mt-1">{errors.Website.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="Desc" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
            Description
          </label>
          <Textarea id="Desc" {...register("Desc")} className="w-full" />
          {errors.Desc && (
            <p className="text-red-500 text-sm mt-1">{errors.Desc.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="Tech" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
            Technology
          </label>
          <Input id="Tech" {...register("Tech")} className="w-full" />
          {errors.Tech && (
            <p className="text-red-500 text-sm mt-1">{errors.Tech.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="contribution" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
            Contribution
          </label>
          <Textarea
            id="contribution"
            {...register("contribution")}
            className="w-full"
          />
          {errors.contribution && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contribution.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
            Username
          </label>
          <Input id="username" {...register("username")} className="w-full" />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
            Password
          </label>
          <Input id="password" {...register("password")} className="w-full" />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="type" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
            Type
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-dashMain text-white relative z-40"
              >
                {selectedType || "Select Type"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuItem
                onClick={() => setValue("type", $Enums.Type.WEB)}
              >
                WEB
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setValue("type", $Enums.Type.STATISTICAL)}
              >
                STATISTICAL
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        <div className="sm:col-span-2 flex justify-end">
          <Button
            type="submit"
            className="bg-dashMain text-white relative z-40"
          >
            Update T4D 
          </Button>
        </div>
      </form>
    )
  );
};

export default EditTDForm;
