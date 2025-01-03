import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal

const SheetContent = React.forwardRef(({ side = "left", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
    <SheetPrimitive.Content ref={ref} className={`fixed inset-y-0 ${side}-0 z-50 h-full w-3/4 max-w-sm bg-white p-6 shadow-lg`} {...props}>
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))

const SheetHeader = ({ className, ...props }) => (
  <div className="flex flex-col space-y-2 text-center sm:text-left" {...props} />
)

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className="text-lg font-semibold" {...props} />
))

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle }