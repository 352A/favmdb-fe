import type { Entry } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteEntryModalProps {
  entry: Entry | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

export default function DeleteEntryModal({
  entry,
  isOpen,
  onClose,
  onConfirm,
}: DeleteEntryModalProps) {
  const handleDelete = () => {
    if (entry) {
      onConfirm(entry.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription></DialogDescription>

          <DialogDescription>
            Are you sure you want to delete "{entry?.title}"? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="cursor-pointer"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
