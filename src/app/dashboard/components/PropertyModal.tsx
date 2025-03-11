"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Property } from "@/lib/types";
import { usePropertyForm } from "@/hooks/usePropertyForm";

interface PropertyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  onSuccess: () => void;
  propertyToEdit?: Property | null;
}

export default function PropertyModal({
  open,
  onOpenChange,
  userId,
  onSuccess,
  propertyToEdit,
}: PropertyModalProps) {
  const { form, isSubmitting, error, onSubmit } = usePropertyForm({
    propertyToEdit,
    userId,
    onSuccess,
    onOpenChange,
    open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-blue-400 text-white p-4 -m-6 mb-4 rounded-lg">
            {propertyToEdit ? "Edit Property" : "Add Property"}
          </DialogTitle>
        </DialogHeader>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="property-name"
              className="text-base font-medium block mb-2"
            >
              Property Name
            </label>
            <Input
              id="property-name"
              placeholder="Property name"
              className="w-full"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="asset-type"
              className="text-base font-medium block mb-2"
            >
              Asset Type
            </label>
            <Select
              onValueChange={(value) => form.setValue("assetType", value)}
              defaultValue={form.getValues("assetType")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Multi Family">Multi Family</SelectItem>
                <SelectItem value="Retail">Retail</SelectItem>
                <SelectItem value="Self Storage">Self Storage</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.assetType && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.assetType.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="model" className="text-base font-medium block mb-2">
              Model
            </label>
            <Input
              id="model"
              placeholder="Enter model"
              className="w-full"
              {...form.register("model")}
            />
            {form.formState.errors.model && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.model.message}
              </p>
            )}
          </div>
          <div className="p-4 border rounded-md space-y-4">
            <div>
              <label
                htmlFor="property-address"
                className="text-base font-medium block mb-2"
              >
                Property Address
              </label>
              <Input
                id="property-address"
                placeholder="Enter Property Address"
                className="w-full"
                {...form.register("address")}
              />
              {form.formState.errors.address && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="city"
                className="text-base font-medium block mb-2"
              >
                City
              </label>
              <Input
                id="city"
                placeholder="Enter City"
                className="w-full"
                {...form.register("city")}
              />
              {form.formState.errors.city && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.city.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="state"
                  className="text-base font-medium block mb-2"
                >
                  State
                </label>
                <Input
                  id="state"
                  placeholder="Enter State"
                  className="w-full"
                  {...form.register("state")}
                />
                {form.formState.errors.state && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.state.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="text-base font-medium block mb-2"
                >
                  Zip
                </label>
                <Input
                  id="zip"
                  placeholder="Enter Zip Code"
                  className="w-full"
                  {...form.register("zip")}
                />
                {form.formState.errors.zip && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.zip.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="property-note"
              className="text-base font-medium block mb-2"
            >
              Property Note
            </label>
            <Textarea
              id="property-note"
              placeholder="Add property note"
              className="w-full min-h-24"
              {...form.register("note")}
            />
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-red-300 text-red-400 hover:bg-red-50 hover:text-red-500"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : propertyToEdit
                ? "Save Changes"
                : "Add Property"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
