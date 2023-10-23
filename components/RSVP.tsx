import { Button, TextField } from "@mui/material"
import { useState } from "react";
import VerticalLinearStepper from "./VerticalLinearStepper";

export default function RSVP() {
    return (
        <div className="flex flex-col items-center space-y-12 px-4">
            <div className="flex-1 flex flex-col space-y-6 text-center">
                <div className="text-5xl">RSVP</div>
                <VerticalLinearStepper />
            </div>
        </div>
    )
}