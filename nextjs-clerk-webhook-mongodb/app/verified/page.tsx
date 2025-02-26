import Image from "next/image";

export default function Verified() {
  return (
    <>
      <div className="grid grid-rows-[10px_1fr_20px] items-center justify-items-center p-4 pb-10 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Image
          src="/tick.svg"
          alt="Tick logo"
          width={180}
          height={38}
          priority
        />
        <h2 className="m-2 text-4xl font-semibold">Verified</h2>
      </div>
    </>
  );
}
