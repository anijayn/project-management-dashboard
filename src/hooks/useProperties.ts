import { useState, useEffect } from "react";
import { Property } from "@/lib/types";
import { toast } from "sonner";

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties");
      if (!response.ok) throw new Error("Failed to fetch properties");
      const data = await response.json();
      setProperties(data.properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to fetch properties");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handlePropertyCreated = () => {
    fetchProperties();
    setIsModalOpen(false);
    setPropertyToEdit(null);
  };

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete property");
      toast.warning("Property deleted successfully");
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property");
    }
  };

  const openCreateModal = () => {
    setPropertyToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (property: Property) => {
    setPropertyToEdit(property);
    setIsModalOpen(true);
  };

  return {
    properties,
    isModalOpen,
    propertyToEdit,
    setIsModalOpen,
    fetchProperties,
    handlePropertyCreated,
    handleDeleteProperty,
    openCreateModal,
    openEditModal,
  };
} 