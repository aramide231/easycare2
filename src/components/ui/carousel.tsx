import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import imageone from "@/assets/image/Frame 132 (2).png";
import imagetwo from "@/assets/image/Frame 132.png";
import imagethree from "@/assets/image/Frame 132 (2).png";
import imagefour from "@/assets/image/Frame 132.png";

const images = [imageone, imagetwo, imagethree, imagefour];

export default function ImageCarousel() {
  const [carouselRef, api] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-10">
      {/* Image Carousel */}
      <div ref={carouselRef} className="overflow-hidden">
        <div className="flex">
          {images.map((src, index) => (
            <div key={index} className="min-w-full">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button onClick={scrollPrev} className="rounded-full bg-[#6C47FF] p-2">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Button>

        <Button onClick={scrollNext} className="rounded-full bg-[#EDE9FE] p-2">
          <ArrowRight className="h-6 w-6 text-[#6C47FF]" />
        </Button>
      </div>
    </div>
  );
}
