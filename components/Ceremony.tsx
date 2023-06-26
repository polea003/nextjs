import Image from "next/image"
import { useEffect, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader";

export default function Ceremony() {
    return (
        <div className="flex flex-col space-y-12 items-center w-full">
            <div className="flex-1 flex flex-col space-y-5 text-center px-4">
                <div className="text-5xl">St. Patrick&apos;s Catholic Church</div>
                <div className="font-medium">2:30p January 27, 2024</div>
                <div className="font-medium">3716 Garden Ave, Miami Beach, FL 33140</div>
                <div className="italic font-medium">*Transportation provided from ceremony to reception</div>
            </div>
            <div className="relative w-full lg:w-3/4 h-64 sm:h-[600px]">
                <Image 
                src="/St-Patrick.jpg"
                alt=''
                fill={true}
                style={{ 'objectFit': "cover", objectPosition: "top" }}
                />
            </div>
            <div className="w-full lg:w-3/4 h-96 mx-2">
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
          center: { lat: 25.81179241, lng: -80.1351167 },
          zoom: 15,
        });
  
        const marker = new google.maps.Marker({
          position: { lat: 25.8117924, lng: -80.1351167 },
          map,
          title: 'St. Patrick\'s Catholic Church'
        });
      });
    }, [apiKey]);
  
    return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
  };
  