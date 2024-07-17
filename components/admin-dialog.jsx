import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const AdminDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>এডমিন প্যানেল</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">আপনি কি এডমিন?</DialogTitle>
          <DialogDescription className="text-center text-red-500">
            ( শুধুমাত্র এডমিনদের জন্য এই অপশন )
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center items-center align-middle gap-5">
          <DialogClose asChild className="">
            <Button type="button" variant="secondary">
              না
            </Button>
          </DialogClose>
          <DialogClose asChild className="">
            <Link href="/admin-pannel">
              <Button>হ্যাঁ</Button>
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDialog;
