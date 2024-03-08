"use client"
import Image from "next/image";
import TagList from "@/components/TagList";
export default function Home() {
  return (
    <main className="flex min-h-screen bg-white flex-col items-center justify-between p-24">
      <TagList/>
    </main>
  );
}
