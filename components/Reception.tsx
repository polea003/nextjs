import Image from "next/image"
import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Reception() {
    return (
        <div className="flex flex-col items-center space-y-12 w-full">
            <div className="flex-1 flex flex-col space-y-5 text-center px-4">
                <div className="text-5xl">Seacoast Towers</div>
                <div className="font-medium">5p-11p January 27, 2024</div>
                <div className="font-medium">5161 Collins Ave, Miami Beach, FL 33140</div>
                <div className="italic font-medium">Black Tie</div>
            </div>
            <div className="relative w-full lg:w-3/4 h-64 sm:h-[600px]">
                <Image 
                src="/seacoast.jpeg"
                alt=''
                fill={true}
                style={{ 'objectFit': "cover" }}
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
          center: { lat: 25.829047, lng: -80.121241 },
          zoom: 15,
        });
  
        const marker = new google.maps.Marker({
          position: { lat: 25.829047, lng: -80.121241 },
          map,
          title: 'Seacoast Towers'
        });
      });
    }, [apiKey]);
  
    return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
  };
  