
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { records } from "./RecordPage";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";

const PAGE_SIZE = 10;

export default function ListPage() {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(records.length / PAGE_SIZE));
  const paginatedRecords = records.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-10 pb-20">
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-200 text-center">
          <CardTitle className="text-2xl font-bold">Workout Records</CardTitle>
          <CardDescription className="text-purple-800">
            Your saved strength records
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {paginatedRecords.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No records found. Start recording your workouts!
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedRecords.map((record, index) => (
                <div
                  key={record.date}
                  className="p-3 border border-blue-100 rounded-lg bg-blue-50"
                >
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    {format(new Date(record.date), "PPP")}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <span className="font-bold text-purple-700">{record.pushup}</span>
                      <div className="text-xs text-gray-500">Push-ups</div>
                    </div>
                    <div>
                      <span className="font-bold text-purple-700">{record.indianPushup}</span>
                      <div className="text-xs text-gray-500">Indian Push-ups</div>
                    </div>
                    <div>
                      <span className="font-bold text-purple-700">{record.seatup}</span>
                      <div className="text-xs text-gray-500">Seat-ups</div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center mt-6">
                <Button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-500">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <Button
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Navigation />
    </div>
  );
}
