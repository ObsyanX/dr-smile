import { useState } from "react";
<<<<<<< HEAD
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
=======
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
<<<<<<< HEAD

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
];
=======
import { generateClinicSlots, isClinicClosedOnDate } from "@/lib/clinic-rules";
>>>>>>> 20a29a9 (Fresh start for dr-smile project)

interface TimeSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (time: string) => void;
  patientName: string;
  treatment: string;
  date: string | null;
<<<<<<< HEAD
}

const TimeSelectionModal = ({ open, onClose, onConfirm, patientName, treatment, date }: TimeSelectionModalProps) => {
=======
  clinicLocation: string | null;
}

const TimeSelectionModal = ({ open, onClose, onConfirm, patientName, treatment, date, clinicLocation }: TimeSelectionModalProps) => {
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
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

<<<<<<< HEAD
  const isValid = useCustom ? customTime.trim().length > 0 : !!selectedSlot;
=======
  const isClosed = isClinicClosedOnDate(clinicLocation, date);
  const dynamicSlots = generateClinicSlots(clinicLocation, date);

  const isValid = !isClosed && (useCustom ? customTime.trim().length > 0 : !!selectedSlot);
>>>>>>> 20a29a9 (Fresh start for dr-smile project)

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading">
            <Clock className="w-5 h-5 text-primary" />
<<<<<<< HEAD
            Assign Appointment Time
          </DialogTitle>
=======
            Assign Time {clinicLocation ? `– ${clinicLocation}` : ""}
          </DialogTitle>
          <DialogDescription>
            {clinicLocation === "Madhyamgram" && "6:15 PM – 9:00 PM (Mon-Sun)"}
            {clinicLocation === "Dum Dum" && "10:30 AM – 2:30 PM (Mon-Sat)"}
            {!clinicLocation && "Select a time slot or enter a custom time."}
          </DialogDescription>
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm space-y-1 p-3 rounded-lg bg-muted/50">
            <p><span className="text-muted-foreground">Patient:</span> <span className="font-medium">{patientName}</span></p>
            <p><span className="text-muted-foreground">Treatment:</span> <span className="font-medium">{treatment}</span></p>
            <p><span className="text-muted-foreground">Date:</span> <span className="font-medium">{date || "Not specified"}</span></p>
          </div>

<<<<<<< HEAD
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
=======
          {isClosed ? (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium border border-red-200">
              Clinic is closed on the selected date. Please choose a different date.
            </div>
          ) : !useCustom ? (
            <>
              <Label className="font-heading text-sm">Select a Time Slot</Label>
              {dynamicSlots.length === 0 ? (
                <p className="text-sm text-muted-foreground italic mt-2">No standard time slots available.</p>
              ) : (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {dynamicSlots.map((slot) => (
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
              )}
              <button
                type="button"
                className="text-xs text-primary hover:underline mt-2 inline-block"
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
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
<<<<<<< HEAD
                className="rounded-xl"
=======
                className="rounded-xl mt-2"
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
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
