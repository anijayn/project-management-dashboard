"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import PropertyGrid from "./components/PropertyGrid";
import PropertyHeader from "./components/PropertyHeader";
import PropertyModal from "./components/PropertyModal";
import QuickAccess from "./components/QuickAccess";
import { useProperties } from "@/hooks/useProperties";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  const {
    properties,
    isModalOpen,
    propertyToEdit,
    setIsModalOpen,
    handlePropertyCreated,
    handleDeleteProperty,
    openCreateModal,
    openEditModal,
  } = useProperties();
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <Navbar />
      <QuickAccess />
      <div className="flex-1 bg-gray-50 overflow-hidden">
        <PropertyHeader onAddProperty={openCreateModal} />
        <PropertyGrid
          properties={properties}
          onEditProperty={openEditModal}
          onDeleteProperty={handleDeleteProperty}
        />
        <PropertyModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          userId={session?.user?.id || ""}
          onSuccess={handlePropertyCreated}
          propertyToEdit={propertyToEdit}
        />
      </div>
    </div>
  );
}
