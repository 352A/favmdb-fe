import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LucideEllipsis } from "lucide-react";
import type { Entry } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Each entry should capture detailed information such as title, director, budget, location,
// duration, year/time, and any other relevant details.

export default function EntriesTable({
  entries,
  onView,
}: {
  entries: Entry[];
  onView: (entry: Entry) => void;
}) {
  console.log(entries);
  return (
    <Table className="mt-12">
      <TableHeader>
        <TableRow>
          <TableHead className="">Title</TableHead>
          <TableHead>Director</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Year/time</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => {
          return (
            <TableRow key={entry.id}>
              <TableCell>{entry.title}</TableCell>
              <TableCell>{entry.director}</TableCell>
              <TableCell>{entry.budget}</TableCell>
              <TableCell>{entry.location}</TableCell>
              <TableCell>{entry.duration}</TableCell>
              <TableCell>{entry.year}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer outline-0">
                    <LucideEllipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onView(entry)}>
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
