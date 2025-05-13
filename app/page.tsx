'use client';

import * as DialogPrimitive from "@radix-ui/react-dialog"
import ChartDashboard from "@/othercomponents/chartdashboard";
import { MenubarDemo } from "@/othercomponents/menubar";
import { DialogDemo } from "@/othercomponents/openpopup";
import { DataTableDemo } from "@/othercomponents/table";import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner"
import axios from "axios";
import { FaCircleCheck } from "react-icons/fa6";
import { XIcon } from "lucide-react"


export default function Home() {

  const [sequence, setSequence] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState('success');
  const [open, setOpen] = useState(false);

  const submitForm2 = async () => {
    console.log("Submitting form with Axios...");

    if (!sequence || !code || !name || !status || !action) {
      console.log("All fields are required!");
      toast.error("All fields are required!");
      return;
    }

    console.log("Form data: ", { sequence, code, name, status, action });

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000", {
        sequence,
        code,
        name,
        status,
        action,
      });

      console.log("Response: ", response);
      setResponseStatus('success')

      setOpen(false);

      if (response.data.message === "Maintenance created") {
        toast.success("Form submitted successfully!");
        // Reset the form
        setSequence("");
        setCode("");
        setName("");
        setStatus("");
        setAction("");
      } else {
        toast.error(`Error: ${response.data.message || "Something went wrong"}`);
      }
    } catch (error) {
      
      setResponseStatus('error')
      console.log("Error: ", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

    let submitForm = async () => {

      console.log("Submitting form...");

      if (!sequence || !code || !name || !status || !action) {
        console.log("All fields are required!");
        toast.error("All fields are required!");
        return;
      }

      console.log("Form data: ")

      setLoading(true);

      try {
        const response = await fetch("http://localhost:5000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sequence,
            code,
            name,
            status,
            action,
          }),
        });

        console.log("Response: ", response);
        // if (response.message === "Maintenance created") {
        //   toast.success("Form submitted successfully!");
        //   // Reset the form
        //   setSequence("");
        //   setCode("");
        //   setName("");
        //   setStatus("");
        //   setAction("");
        // } else {
        //   const errorData = await response.json();
        //   toast.error(`Error: ${errorData.message || "Something went wrong"}`);
        // }
      } catch (error) {
        console.log("Error: ", error);
        toast.error("Failed to submit the form. Please try again.");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        
        <MenubarDemo />

        <DataTableDemo>
          <Dialog  open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Create</Button>
              {/* <Button variant="outline">Create</Button> */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">

            {/* {responseStatus === 'success' && (
              <div className="">
                
                <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                  <XIcon />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
                <div className="flex flex-col items-center justify-between">
                  <FaCircleCheck color="green" size={80} />
                  <DialogTitle>Record created successfully</DialogTitle>
                </div>
              </div>
            )}
            
            {responseStatus === 'error' && (
              <div className="flex items-center justify-between">
                <DialogTitle>Create a record</DialogTitle>
                {responseStatus === 'error' && <FaCircleCheck color="red" size={20} />}
              </div>
            )}

            
            {responseStatus === '' && ( */}

              <>

                <DialogHeader>
                  <DialogTitle>Create a record</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Sequence
                    </Label>
                    <Input onChange={(e) => setSequence(e.target.value)} id="sequence" value={sequence} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Code
                    </Label>
                    <Input onChange={(e) => setCode(e.target.value)} id="code" value={code} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Name
                    </Label>
                    <Input onChange={(e) => setName(e.target.value)} id="name" value={name} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Status
                    </Label>
                    <Input onChange={(e) => setStatus(e.target.value)} id="status" value={status} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Action
                    </Label>
                    <Input onChange={(e) => setAction(e.target.value)}  id="action" value={action} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => submitForm2()}> { loading ? 'loading' : 'Save changes'}</Button>
                </DialogFooter>
              
              </>

            {/* )} */}

            </DialogContent>
          </Dialog>
        </DataTableDemo>
        
        {/* <div className="flex flex-col items-center justify-center">
          <ChartDashboard />
        </div> */}
    </div>
  );
}
