import Image from "next/image"
import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Hotel() {
    return (
        <div className="flex flex-col items-center space-y-12 w-full">
            <div className="flex-1 flex flex-col space-y-3 text-center">
                <div className="text-5xl">The Loews Hotel Miami Beach</div>
                <div className="font-medium">1601 Collins Ave, Miami Beach, FL 33139</div>
                <div className="font-medium">Room block available: <span className="cursor-pointer underline text-red-700">reserve</span></div>
                <div className="font-medium italic">Please consider the many neighboring hotels for alternative accommodations</div>
            </div>
            <div className="relative w-full lg:w-1/2 h-64 sm:h-96">
                <Image 
                src="/loews.png"
                alt=''
                fill={true}
                style={{ 'objectFit': "cover" }}
                />
            </div>
            <div className="w-full h-96">
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
  