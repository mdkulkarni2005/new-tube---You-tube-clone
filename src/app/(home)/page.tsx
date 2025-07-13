import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Image src="logo.svg" alt="logo" height={50} width={50} />
     <p className="text-xl font-semibold tracking-tight">NewTube</p>
    </div>
  )
}
