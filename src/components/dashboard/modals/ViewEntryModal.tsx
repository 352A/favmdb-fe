import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Entry } from "@/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import { LucidePopcorn, LucideVideo } from "lucide-react";

type ViewEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  entry: Entry | null;
};

export default function ViewEntryModal({
  entry,
  isOpen,
  onClose,
}: ViewEntryModalProps) {
  if (!entry) return null;

  const fields = [
    { label: "Type", value: entry.type },
    { label: "Director", value: entry.director },
    { label: "Year", value: entry.year.toString() },
    { label: "Location", value: entry.location },
    entry.type === "Movie"
      ? {
          label: "Duration",
          value: `${entry.durationHours}h ${entry.durationMinutes}m`,
        }
      : { label: "Seasons", value: `${entry.seasons}` },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mt-1 h-[90vh] overflow-hidden lg:mt-4">
        <div className="hide-scrollbar h-full overflow-y-auto">
          {" "}
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {entry.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Detailed information about this entry
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            {fields.map(({ label, value }) => (
              <InfoRow key={label} label={label} value={value} />
            ))}

            <div className="sm:col-span-2">
              <h3 className="text-muted-foreground mb-1 text-sm font-semibold">
                Details
              </h3>
              <p className="mt-4 rounded-sm border bg-white/3 p-4 text-sm leading-relaxed dark:text-gray-300">
                {entry.details || "No additional details provided."}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative flex flex-col gap-1 rounded-sm bg-white/3 p-4">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-base font-medium">{value}</span>
      {label === "Type" && (
        <div className="absolute top-5 right-5 -z-10 opacity-40">
          {value === "Movie" ? (
            <LucideVideo size={40} />
          ) : (
            <LucidePopcorn size={40} />
          )}
        </div>
      )}
    </div>
  );
}
