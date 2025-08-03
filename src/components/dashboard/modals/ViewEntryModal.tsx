import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Entry } from "@/types";
import { DialogDescription } from "@radix-ui/react-dialog";

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{entry.title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <p>
            <strong>Type:</strong> {entry.type}
          </p>
          <p>
            <strong>Director:</strong> {entry.director}
          </p>
          <p>
            <strong>Year:</strong> {entry.year}
          </p>
          <p>
            <strong>Location:</strong> {entry.location}
          </p>
          <p>
            <strong>Budget:</strong> {entry.budget}
          </p>
          <p>
            <strong>Duration:</strong> {entry.duration}
          </p>
          <p>
            <strong>Details:</strong> {entry.details}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
