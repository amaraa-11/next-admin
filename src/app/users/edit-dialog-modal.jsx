import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export const EditDialog = ({ open, onClose, item }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const saveUser = async () => {
    await fetch("/api/users/" + item.id, {
      method: "PUT",
      body: JSON.stringify({
        email: email,
        firstname: firstname,
        lastname: lastname,
        imageUrl: "http://dummyimage.com/117x116.png/cc0000/ffffff",
      }),
    });

    onClose(false);
  };
  useEffect(() => {
    setFirstName(item?.firstname);
    setLastName(item?.lastname);
    setEmail(item?.email);
  }, [item]);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              value={firstname}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              id="name"
              defaultValue=""
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              value={lastname}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              id="username"
              defaultValue=""
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              defaultValue=""
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => onClose(false)}
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={saveUser}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
