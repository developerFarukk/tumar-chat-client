"use client";

import { Camera, Grid2x2Check, ImagePlus, Send } from "lucide-react";
import { Button } from "../ui/button";

export default function SendMessage() {
  return (
    <div className="w-full">
      <div className="relative flex font-sans py-8 w-full justify-center items-center gap-2">

        {/* message inpute  */}
        <div className="relative p-px rounded-2xl shadow-lg w-full">

          <div className="flex items-center px-4 py-2 rounded-[15px] w-full border-2 border-amber-600">
            <Grid2x2Check />

            <input
              type="text"
              placeholder="Input text message"
              className="flex-1 min-w-0 px-3 py-1 text-lg bg-transparent focus:outline-none"
            />

            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center p-1.5">
                <ImagePlus />
              </div>

              <div className="flex items-center justify-center w-6 h-6 p-1">
                <Camera />
              </div>
            </div>
          </div>
        </div>

        {/* send button */}
        <div>
          <Button variant="ghost" type="submit" className=" border-2 rounded-full p-2 bg-blue-400 hover:bg-blue-500">
            <Send className="text-yellow-400 hover:text-yellow-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
