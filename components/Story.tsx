export default function Story() {
    return (
        <div className="flex flex-col items-center space-y-12 w-full">
            <div className="flex-1 flex flex-col space-y-5 text-center items-center px-4">
                <div className="text-5xl">Through The Years</div>
                <div>Sophia and Patrick met at a yoga studio in Miami Beach in 2016. After 7 loving years, they can&#39;t wait to celebrate their marriage with all their family and friends!</div>
                <div className="max-w-[1400px]">
                  <DemoCarousel />
                </div>
            </div>
        </div>
    )
}

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function DemoCarousel () {
        return (
            <Carousel>
                <div>
                    <img src="/sp1.jpg" className="max-h-[700px] object-cover" />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src="/sp2.jpg" className="max-h-[700px] object-cover" />
                </div>
                <div>
                    <img src="/sp3.jpg" className="max-h-[700px] object-cover" />
                </div>
            </Carousel>
        );
    }