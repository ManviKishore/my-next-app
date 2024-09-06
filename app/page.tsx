import Image from "next/image";
import Dashboard from "./front-end/dashboard";

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr] justify-items-center min-h-screen  pb-20  sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <Dashboard></Dashboard>
      </main>
    </div>
  );
}
