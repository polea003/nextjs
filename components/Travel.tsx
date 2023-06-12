import Image from "next/image"
import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Travel() {
    return (
        <div className="flex flex-col items-center space-y-12 w-[500px]">
            <div className="flex-1 flex flex-col space-y-6 text-center">
                <div className="text-3xl sm:text-5xl">Airports</div>
                <div className="flex flex-col space-y-1 text-2xl">
                  <div>Miami International Airport</div>
                  <div>MIA</div>
                  <div className="text-lg text-slate-600">25 minutes from Miami Beach</div>
                </div>
                <div className="flex flex-col space-y-1 text-2xl">
                  <div>Fort Lauderdale International Airport  </div>
                  <div>FLL</div>
                  <div className="text-lg text-slate-600">50 minutes from Miami Beach</div>

                </div>
            </div>
            <div className="flex-1 flex flex-col space-y-6 text-center">
                <div className="text-3xl sm:text-5xl">Ground Transportation</div>
                <div className="flex flex-col space-y-1">
                  <div>Due to limited parking, Uber/Taxi is recommended</div>
                </div>
            </div>
        </div>
    )
}