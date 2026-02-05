import Image from "next/image";
import { Button } from "@/components/ui/UI/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="pb -16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center realtive z-10">
          
            {/* Left Content */}
            <div className="text-center sm:text-left">
              <span className="text-gray-500 font-light tracking-wide mb-6">
                MeetMates<span className="text-purple-400">*</span>
              </span>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[0.95] tracking-tight">
                Crafting<br />
                extraordinary events<br />
                with timeless<br />
                <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">elegance.</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-lg font-light">
                Whether you&apos;re hosting or attending, M² makes every event
                memorable. join our community today.
              </p>

              <Link href="/explore">
                <Button size="xl" className={"rounded-full"}>
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Right Content */}
            <div>
              <Image 
              src= "/LandPage.png"
              alt = "Land Page"
              width={700}
              height={700}
              className="w-full h-auto"
              priority
              />
            </div>
          
        </div>
      </section>

    </div>
  );
}
