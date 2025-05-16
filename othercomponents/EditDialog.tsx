"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export type Payment = {
  id: string
  name: string
  action: string
  sequence: string
  code: number
  status: "pending" | "processing" | "success" | "failed"
}

export function EditDialog({
  open,
  onOpenChange,
  // onSave,
  children
}: {
  // item: Payment | null
  open: boolean
  onOpenChange: (open: boolean) => void
  // onSave?: (updatedItem: Payment) => Promise<void>
  children: React.ReactNode
}) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Record</DialogTitle>
            <DialogDescription>
              Make changes to the item here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {children}
      </DialogContent>
    </Dialog>
  )
}