import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
];

interface TimeSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (time: string) => void;
  patientName: string;
  treatment: string;
  date: string | null;
}

const TimeSelectionModal = ({ open, onClose, onConfirm, patientName, treatment, date }: TimeSelectionModalProps) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [customTime, setCustomTime] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const handleConfirm = () => {
    const time = useCustom ? customTime : selectedSlot;
    if (time) {
      onConfirm(time);
      setSelectedSlot(null);
      setCustomTime("");
      setUseCustom(false);
    }
  };

  const isValid = useCustom ? customTime.trim().length > 0 : !!selectedSlot;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading">
            <Clock className="w-5 h-5 text-primary" />
            Assign Appointment Time
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm space-y-1 p-3 rounded-lg bg-muted/50">
            <p><span className="text-muted-foreground">Patient:</span> <span className="font-medium">{patientName}</span></p>
            <p><span className="text-muted-foreground">Treatment:</span> <span className="font-medium">{treatment}</span></p>
            <p><span className="text-muted-foreground">Date:</span> <span className="font-medium">{date || "Not specified"}</span></p>
          </div>

          {!useCustom ? (
            <>
              <Label className="font-heading text-sm">Select a Time Slot</Label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <Button
                    key={slot}
                    size="sm"
                    variant={selectedSlot === slot ? "default" : "outline"}
                    className="text-xs rounded-lg"
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
              <button
                type="button"
                className="text-xs text-primary hover:underline"
                onClick={() => { setUseCustom(true); setSelectedSlot(null); }}
              >
                Enter custom time instead
              </button>
            </>
          ) : (
            <>
              <Label className="font-heading text-sm">Enter Custom Time</Label>
              <Input
                placeholder="e.g. 1:45 PM"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                className="rounded-xl"
              />
              <button
                type="button"
                className="text-xs text-primary hover:underline"
                onClick={() => { setUseCustom(false); setCustomTime(""); }}
              >
                Choose from time slots instead
              </button>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="rounded-full">Cancel</Button>
          <Button onClick={handleConfirm} disabled={!isValid} className="rounded-full">
            Confirm Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimeSelectionModal;
