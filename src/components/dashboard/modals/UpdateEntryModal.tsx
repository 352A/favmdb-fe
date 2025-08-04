import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DialogDescription } from "@radix-ui/react-dialog";
import EntryForm from "../EntryForm";
import type { Entry } from "@/types";

type UpdateEntryModalProps = {
  entry: Entry | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function UpdateEntryModal({
  entry,
  isOpen,
  onClose,
}: UpdateEntryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mt-1 h-[90vh] overflow-hidden lg:mt-4">
        <div className="hide-scrollbar h-full overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Update {entry?.title}</DialogTitle>
            <DialogDescription></DialogDescription>
            <EntryForm entry={entry} type="update" onClose={onClose} />
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}
