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
  onEdit,
  onDelete,
}: {
  entries: Entry[];
  onView: (entry: Entry) => void;
  onEdit: (entry: Entry) => void;
  onDelete: (entry: Entry) => void;
}) {
  return (
    <>
      <Table className="mt-12 overflow-hidden rounded-t-xl bg-white/4 [&_td]:px-12 [&_td]:py-4 [&_th]:px-12 [&_th]:py-6">
        <TableHeader>
          <TableRow className="bg-linear-to-r from-rose-800 to-violet-900 bg-[length:200%_100%] *:font-semibold">
            <TableHead>Title</TableHead>
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
                    <DropdownMenuContent className="*:cursor-pointer">
                      <DropdownMenuItem onClick={() => onView(entry)}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(entry)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onDelete(entry)}
                      >
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
    </>
  );
}
