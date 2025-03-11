"use client";

import { FaEdit, FaEnvelope, FaTrash } from "react-icons/fa";
import { Property } from "@/lib/types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PropertyActionsProps {
  data: Property;
  onEdit: (property: Property) => void;
  onDelete: (propertyId: string) => void;
}

export default function PropertyActions({
  data,
  onEdit,
  onDelete,
}: PropertyActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(data.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting property:", error);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(data)}
          className="p-2 text-blue-400 hover:text-green-800 border rounded-sm"
          title="Edit property"
          disabled={isDeleting}
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="p-1 text-blue-400 hover:text-red-800 hover:bg-gray-200 border rounded-sm"
          title="Delete property"
          disabled={isDeleting}
        >
          <FaTrash size={16} />
        </button>
        <button className="p-2 text-blue-400 hover:text-black border rounded-sm">
          <FaEnvelope size={16} />
        </button>
      </div>
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{data.name}&rdquo;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
