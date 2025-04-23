
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";

// Simple in-memory storage for demo purposes
let records: Record[] = [];

type Record = {
  date: string;
  pushup: number;
  indianPushup: number;
  seatup: number;
};

export default function RecordPage() {
  const [pushup, setPushup] = useState("");
  const [indianPushup, setIndianPushup] = useState("");
  const [seatup, setSeatup] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const onSave = () => {
    if (!pushup || !indianPushup || !seatup) {
      toast({
        title: "Missing data",
        description: "Please fill all fields with numbers.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    const now = new Date();
    
    const newRecord = {
      date: now.toISOString(),
      pushup: Number(pushup),
      indianPushup: Number(indianPushup),
      seatup: Number(seatup),
    };

    // Save to in-memory storage
    records = [newRecord, ...records];
    
    // Reset form and show success message
    setPushup("");
    setIndianPushup("");
    setSeatup("");
    setSaving(false);
    
    toast({
      title: "Success!",
      description: "Your daily record has been saved!",
    });
  };

  return (
    <div className="container max-w-md mx-auto py-10 pb-20">
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-200 text-center">
          <CardTitle className="text-2xl font-bold">Daily Strength</CardTitle>
          <CardDescription className="text-purple-800">Record your workout</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pushup" className="font-bold text-purple-700">PushUP</Label>
              <Input
                id="pushup"
                type="number"
                value={pushup}
                onChange={(e) => setPushup(e.target.value)}
                placeholder="0"
                className="bg-blue-50 border-purple-300 font-medium"
                max={999}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="indianPushup" className="font-bold text-purple-700">Indian Pushup</Label>
              <Input
                id="indianPushup"
                type="number"
                value={indianPushup}
                onChange={(e) => setIndianPushup(e.target.value)}
                placeholder="0"
                className="bg-blue-50 border-purple-300 font-medium"
                max={999}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="seatup" className="font-bold text-purple-700">Seatups</Label>
              <Input
                id="seatup"
                type="number"
                value={seatup}
                onChange={(e) => setSeatup(e.target.value)}
                placeholder="0"
                className="bg-blue-50 border-purple-300 font-medium"
                max={999}
              />
            </div>
            
            <Button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3"
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Navigation />
    </div>
  );
}

// Export the records for access in list view
export { records };
