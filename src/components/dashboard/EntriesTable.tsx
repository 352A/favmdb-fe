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

// formatBudget function formats the budget string into a more readable format
function formatBudget(budget: number) {
  const value = Number(budget);
  if (isNaN(value)) return budget;

  const formatNumber = (num: number) => {
    // Convert to string and remove trailing zeros after decimal
    const formatted = num.toFixed(2).replace(/\.?0+$/, "");
    return formatted;
  };

  if (value >= 1_000_000_000) {
    return `${formatNumber(value / 1_000_000_000)}B`;
  } else if (value >= 1_000_000) {
    return `${formatNumber(value / 1_000_000)}M`;
  } else if (value >= 1_000) {
    return `${formatNumber(value / 1_000)}K`;
  }
  return budget;
}

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
                <TableCell>{formatBudget(entry.budget)}</TableCell>
                <TableCell>{entry.location}</TableCell>
                {entry.type === "Movie" ? (
                  <TableCell>
                    {entry.durationHours}h {entry.durationMinutes}m
                  </TableCell>
                ) : (
                  <TableCell>{entry.seasons} Seasons</TableCell>
                )}
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
