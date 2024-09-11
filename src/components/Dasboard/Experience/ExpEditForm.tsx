/**
 * A React component that renders a form for editing an experience entry.
 *
 * @param {Object} props - The component props.
 * @param {Works} props.Exp - The experience entry to be edited.
 * @returns {JSX.Element} - The rendered form component.
 */
"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/otherTextArea";
import type { Works } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { UpdateWorks } from "@/core/actions/Dashboard/Expericence/updateExp";

const EditExpForm = ({ Exp }: { Exp: Works }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: Exp.title ?? "",
      start: Exp.start ?? 0,
      end: Exp.end ?? "",
      place: Exp.place ?? "",
      desc: Exp.desc ?? "",
    }
  });

  const onSubmit = async (data: any) => {
    try {
      const updatedExp = {
        ...Exp,
        ...data,
        start: Number(data.start), // Ensure start is a number
      };
      const res = await UpdateWorks(updatedExp);

      if (res?.success) {
        toast({
          description: "Experience updated successfully",
        });
        window.location.reload()

      } else {
        toast({
          description: res?.error || "Failed to update the experience",
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
      className=" shadow-lg p-6 rounded-lg w-[80vw] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-[4px] my-2  "
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
        <label htmlFor="start" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
          Start
        </label>
        <Input
          id="start"
          type="number"
          {...register("start", { required: "Start is required" })}
          className="w-full"
        />
        {errors.start && (
          <p className="text-red-500 text-sm mt-1">{errors.start.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="end" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
          End
        </label>
        <Input
          id="end"
          {...register("end", { required: "End is required" })}
          className="w-full"
        />
        {errors.end && (
          <p className="text-red-500 text-sm mt-1">{errors.end.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="place" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
          Place
        </label>
        <Input
          id="place"
          {...register("place")}
          className="w-full"
        />
        {errors.place && (
          <p className="text-red-500 text-sm mt-1">{errors.place.message}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="desc" className="block text-sm font-medium mb-2 dark:text-white text-gray-900">
          Description
        </label>
        <Textarea
          id="desc"
          {...register("desc")}
          className="md:w-[74.5vw] w-[68.5vw] lg:w-[76.5vw]"
        />
        {errors.desc && (
          <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>
        )}
      </div>

      <div className="sm:col-span-2 flex justify-end">
        <Button
          className="bg-dashMain dark:text-white text-gray-900 relative z-40"
          type="submit"
        >
          Update Experience
        </Button>
      </div>
    </form>
  );
};

export default EditExpForm;
