import Image from "next/image"
import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Button } from "@mui/material";

export default function Hotel() {
    return (
        <div className="flex flex-col items-center space-y-12 w-full">
            <div className="flex-1 flex flex-col space-y-5 text-center items-center">
                <div className="text-5xl">The Loews Hotel Miami Beach</div>
                <div className="font-medium">1601 Collins Ave, Miami Beach, FL 33139</div>
                <div className="font-medium">Room block available</div>
                <Button style={{ color: 'black', backgroundColor: 'white', width: '230px' }} variant="contained">Reserve</Button>
                <div className="font-medium italic">You're invited to consider the many neighboring hotels for alternative accommodations</div>
            </div>
            <div className="relative w-full lg:w-3/4 h-64 sm:h-[600px]">
                <Image 
                src="/loews.png"
                alt=''
                fill={true}
                style={{ 'objectFit': "cover", 'objectPosition': "top" }}
                />
            </div>
            <div className="w-full lg:w-3/4 h-96">
              <Map apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY} />
            </div>
        </div>
    )
}

const Map = ({ apiKey }) => {
    const mapRef = useRef(null);
  
    useEffect(() => {
      const loader = new Loader({
        apiKey,
        version: 'weekly',
      });
  
      loader.load().then(() => {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 25.789436, lng: -80.129732 },
          zoom: 15,
        });
  
        const marker = new google.maps.Marker({
          position: { lat: 25.789436, lng: -80.129732 },
          map,
          title: 'The Loews Miami Beach'
        });
      });
    }, [apiKey]);
  
    return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
  };
  