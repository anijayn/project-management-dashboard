import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Property } from "@/lib/types";

const propertyFormSchema = z.object({
  name: z.string().min(1, "Property name is required"),
  assetType: z.string().min(1, "Asset type is required"),
  model: z.string().min(1, "Model is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "Zip code is required"),
  note: z.string().optional(),
});
export type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface UsePropertyFormProps {
  propertyToEdit: Property | null | undefined;
  userId: string;
  onSuccess: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function usePropertyForm({
  propertyToEdit,
  userId,
  onSuccess,
  onOpenChange,
  open,
}: UsePropertyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      name: "",
      assetType: "Multi Family",
      model: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      note: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (propertyToEdit) {
        form.reset({
          name: propertyToEdit.name,
          assetType: propertyToEdit.assetType,
          model: propertyToEdit.model,
          address: propertyToEdit.address,
          city: propertyToEdit.city,
          state: propertyToEdit.state,
          zip: propertyToEdit.zip,
          note: propertyToEdit.note || "",
        });
      } else {
        form.reset({
          name: "",
          assetType: "Multi Family",
          model: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          note: "",
        });
      }
    }
  }, [open, propertyToEdit, form]);

  const onSubmit = async (data: PropertyFormValues) => {
    setIsSubmitting(true);
    setError("");
    try {
      const url = propertyToEdit
        ? `/api/properties/${propertyToEdit.id}`
        : "/api/properties";
      const method = propertyToEdit ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userId,
        }),
      });
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || "Failed to save property");
      }
      toast.success(
        `Property has been ${propertyToEdit ? "updated" : "added"} successfully`
      );
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    error,
    onSubmit: form.handleSubmit(onSubmit),
  };
} 