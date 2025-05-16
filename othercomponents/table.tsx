"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EditDialog } from "./EditDialog"
import { Label } from "@/components/ui/label"
import {
  DialogFooter,
} from "@/components/ui/dialog"

async function deleteItemById(id: string) {
  try {
    const response = await axios.delete("http://localhost:5000", {
      data: { id },
    });

    console.log("Item deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}


export type Payment = {
  _id: string
  // id?: string
  name: string
  action: string
  sequence: string
  code: number
  // weightKG: number
  status: "pending" | "processing" | "success" | "failed"
  // weightFactor: string,
  // engine: string
}

// export const columns: ColumnDef<Payment>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("status")}</div>
//     ),
//   },
//   {
//     accessorKey: "code",
//     header: "code",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("code")}</div>
//     ),
//   },
//   {
//     accessorKey: "sequence",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           sequence
//           <ArrowUpDown />
//         </Button>
//       )
//     },
//     cell: ({ row }) => <div className="lowercase">{row.getValue("sequence")}</div>,
//   },
//   {
//     accessorKey: "name",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           name
//           <ArrowUpDown />
//         </Button>
//       )
//     },
//     cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
//   },
//   {
//     accessorKey: "edit",
//     header: "Edit",
//     cell: ({}) => <Button
//           variant="warning"
//           onClick={() => {}}
//         >
//           edit
//         </Button>
//   },
//   {
//     accessorKey: "delete",
//     header: "Delete",
//     cell: ({row}) => {

//         let rowData = row.original
//         return (

//           <Button
//           variant="destructive"
//           onClick={() => {deleteItemById(rowData.id)}}
//           >
//           delete
//         </Button>
//         )
//       }
//   },
// ]
// editingItem={editingItem ?? ''} setEditingItem={setEditingItem}
export function DataTableDemo({data, children}: {data:any, editingItem?:any, setEditingItem?:any, children: React.ReactNode}) {
    
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [editingItem, setEditingItem] = React.useState<Payment | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  
    const [sequence, setSequence] = React.useState('');
    const [code, setCode] = React.useState<string | number>('');
    const [name, setName] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [itemID, setitemID] = React.useState('');
      const [isSaving, setIsSaving] = React.useState(false);
      
  // Function to save edits
  const handleSaveEdit = async ({sequence, status, name, code, itemID}:{sequence:string, status:string, name:string, code:string | number, itemID:string}) => {
    setIsSaving(true);
    try {
      // Call your API to update the item
      const response = await axios.put(`http://localhost:5000/`, { id:itemID, sequence, status, name, code, action: "update" });
      setIsEditDialogOpen(false)
      setIsSaving(false);
      // In a real app, you would update your data state here or refetch
      console.log("Item updated successfully")
    } catch (error) {
      console.error("Error updating item:", error)
      throw error // This will be caught by the dialog
    }
  }

    console.log("sequence", sequence)
    console.log("editingItem", editingItem)

    React.useEffect(() => {
      if (editingItem) {
        setSequence(editingItem.sequence);
        setCode(editingItem.code);
        setName(editingItem.name);
        setStatus(editingItem.status);
        setitemID(editingItem._id)
      }
    }, [editingItem]);

  // Function to handle edit
  const handleEdit = (item: Payment) => {
    setEditingItem(item)
    setIsEditDialogOpen(true)
  }

  const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "code",
    header: "code",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("code")}</div>
    ),
  },
  {
    accessorKey: "sequence",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          sequence
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("sequence")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({row}) => {

        let rowData = row.original

        console.log("rowData", rowData)
        
        return (
          <Button
            variant="warning"
            onClick={() => handleEdit(rowData)}
            >
            edit
          </Button>
        )
      }
  },
  {
    accessorKey: "delete",
    header: "Delete",
    cell: ({row}) => {

        let rowData = row.original
        return (
          <Button
            variant="destructive"
            onClick={() => {deleteItemById(rowData._id)}}
            >
            delete
          </Button>
        )
      }
  }
]


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })


  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter sequences..."
          value={(table.getColumn("sequence")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("sequence")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {children}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border bg-white shadow">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <EditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      > 
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sequence" className="text-right">
              Sequence
            </Label>
            <Input
              id="sequence"
              name="sequence"
              value={sequence || ""}
              onChange={(e) => setSequence(e.target.value)}   
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Code
            </Label>
            <Input
              id="code"
              name="code"
              value={code || ""}
              onChange={(e) => setCode(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Input
              id="status"
              name="status"
              value={status || ""}
              onChange={(e) => setStatus(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={() => handleSaveEdit({sequence, status, name, code, itemID})} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>

      </EditDialog>

    </div>
  )
}
