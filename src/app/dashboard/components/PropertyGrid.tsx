"use client";

import { Property, AssetEnum } from "@/lib/types";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import PropertyActions from "./PropertyActions";
import { Folder } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const assetEnum: AssetEnum = {
  Retail: "Retail",
  "Self Storage": "Self Storage",
  "Multi Family": "Multi Family",
};

const getEnumColumnParams = (enumMap: AssetEnum) => {
  return {
    cellRenderer: (params: ICellRendererParams) => {
      if (!params.data) return "";
      const { value } = params;
      return enumMap[value];
    },
    filterParams: {
      buttons: ["reset", "apply"],
      closeOnApply: true,
      filterOptions: [
        "empty",
        ...Object.keys(enumMap).map((key) => {
          return {
            displayKey: key,
            displayName: enumMap[key],
            test: (filterValue: string, cellValue: string) => {
              return cellValue === key;
            },
            hideFilterInput: true,
          };
        }),
      ],
      suppressAndOrCondition: true,
    },
  };
};

interface PropertyGridProps {
  properties: Property[];
  onEditProperty: (property: Property) => void;
  onDeleteProperty: (propertyId: string) => void;
}

export default function PropertyGrid({
  properties,
  onEditProperty,
  onDeleteProperty,
}: PropertyGridProps) {
  const columnDefs: ColDef[] = [
    {
      headerName: "",
      field: "icon",
      width: 50,
      sortable: false,
      filter: false,
      flex: 0,
      cellClass: "ag-cell-center",
      cellRenderer: () => <Folder className="w-5 h-5 text-gray-500" />,
    },
    {
      field: "name",
      filter: true,
    },
    {
      field: "assetType",
      type: ["assetColumn"],
      filter: "agTextColumnFilter",
    },
    {
      field: "model",
      filter: "agTextColumnFilter",
    },
    {
      field: "createdAt",
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "updatedAt",
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      headerName: "",
      field: "actions",
      sortable: false,
      filter: false,
      cellRenderer: (params: ICellRendererParams) => (
        <PropertyActions
          data={params.data}
          onEdit={onEditProperty}
          onDelete={onDeleteProperty}
        />
      ),

      flex: 0.5,
    },
  ];
  return (
    <div className="h-[calc(100vh-8rem)]">
      <style jsx global>{`
        .ag-cell-center {
          display: flex !important;
          align-items: center;
          justify-content: center;
        }
        .ag-theme-alpine {
          height: 100%;
        }
      `}</style>
      <AgGridReact
        className="ag-theme-alpine h-full w-full"
        rowData={properties}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={50}
        defaultColDef={{
          flex: 1,
          unSortIcon: true,
          autoHeight: true,
          filterParams: {
            buttons: ["reset", "apply"],
            closeOnApply: true,
          },
          resizable: false,
        }}
        columnTypes={{
          assetColumn: {
            ...getEnumColumnParams(assetEnum),
          },
        }}
      />
    </div>
  );
}
