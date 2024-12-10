"use client";

import * as React from "react";

import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Settings } from "lucide-react";
import { useState } from "react";
import { EditDialog } from "./edit-dialog-modal";

export function UsersTable(props) {
  const { data } = props;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [search, setSearch] = useState("");
  const filteredData = data?.filter((el) => {
    return el.firstname.toLowerCase().includes(search.toLowerCase());
  });
  console.log(data, filteredData);
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Нэрээр хайх..."
          className="max-w-sm"
        />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1">#</TableHead>
              <TableHead className="w-1">Зураг</TableHead>
              <TableHead className="w-1">Овог</TableHead>
              <TableHead>Нэр</TableHead>
              <TableHead>И-Мэйл</TableHead>
              <TableHead className="w-1">
                <Settings />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableHead>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={item.imageUrl} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableHead>
                <TableHead>{item.firstname}</TableHead>
                <TableHead>{item.lastname}</TableHead>
                <TableHead>{item.email}</TableHead>
                <TableHead className="w-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigator.clipboard.writeText(item.email)
                        }
                      >
                        Copy Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedItem(item);
                          setEditModalOpen(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={async () => {
                          await fetch(`api/users/${item.id}`, {
                            method: "DELETE",
                          });
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
          <EditDialog
            open={editModalOpen}
            onClose={setEditModalOpen}
            item={selectedItem}
          />
        </Table>
      </div>
    </div>
  );
}
