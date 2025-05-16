"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export interface SuccessErrorModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  type: "success" | "error"
  autoClose?: boolean
  autoCloseTime?: number
  onConfirm?: () => void
  confirmText?: string
  showCloseButton?: boolean
}

export function SuccessErrorModal({
  open,
  onOpenChange,
  title,
  description,
  type = "success",
  autoClose = false,
  autoCloseTime = 3000,
  onConfirm,
  confirmText = "OK",
  showCloseButton = true,
}: SuccessErrorModalProps) {
  const [isOpen, setIsOpen] = useState(open || false)

  // Sync with external open state
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  // Handle auto close
  useEffect(() => {
    if (autoClose && isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false)
        onOpenChange?.(false)
      }, autoCloseTime)

      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseTime, isOpen, onOpenChange])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    onOpenChange?.(open)
  }

  const handleConfirm = () => {
    onConfirm?.()
    if (!onConfirm) {
      setIsOpen(false)
      onOpenChange?.(false)
    }
  }

  const isSuccess = type === "success"

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={cn("sm:max-w-md", isSuccess ? "border-green-200" : "border-red-200")}>
        {showCloseButton && (
          <button
            onClick={() => handleOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
        <DialogHeader>
          <div className="flex items-center gap-3">
            {isSuccess ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
            <DialogTitle>{title || (isSuccess ? "Success" : "Error")}</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            {description || (isSuccess ? "Operation completed successfully." : "An error occurred.")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            onClick={handleConfirm}
            className={cn(isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700")}
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
