import { useRouter } from "next/router";
import Image from "next/image";
import {
  ChartBarIcon,
  ClockIcon,
  DotsHorizontalIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiCompassFill } from "react-icons/ri";

function Sidebar() {
  const router = useRouter();
  return (
    <section className="fixed top-0 left-0 z-40 flex flex-col p-4 items-center bg-black w-[90px] h-screen space-y-8">
      <Image
        src="https://rb.gy/xkacau"
        width={56}
        height={56}
        objectFit="contain"
      />
      <div className="flex flex-col space-y-8 ">
        <HomeIcon
          className="sidebarIcon text-white opacity-[1]"
          onClick={() => router.push("/")}
        />
        <RiCompassFill className="sidebarIcon text-2xl" onClick={() => router.push("/albums")} />
        <FaMicrophoneAlt className="sidebarIcon ml-1" />
        <ChartBarIcon className="sidebarIcon" />
        <ClockIcon className="sidebarIcon" />
        <DotsHorizontalIcon className="sidebarIcon" />
      </div>
    </section>
  );
}

export default Sidebar;
