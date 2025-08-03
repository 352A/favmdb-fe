import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DialogDescription } from "@radix-ui/react-dialog";
import EntryForm from "../EntryForm";

type CreateEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateEntryModal({
  isOpen,
  onClose,
}: CreateEntryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mt-4 h-[90vh] overflow-hidden">
        <div className="hide-scrollbar h-full overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add A New Entry</DialogTitle>
            <DialogDescription></DialogDescription>
            <EntryForm type="create" onClose={onClose} />
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}
