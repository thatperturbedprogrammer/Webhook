import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[10px_1fr_20px] items-center justify-items-center p-4 pb-10 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-semibold">
        Secure Authentication and Verification using Next.js + Webhook + Clerk
        Auth + MongoDB
      </h1>
      <main className="flex flex-row gap-8 row-start-2 items-center sm:items-start">
        <Image
          src="/next.svg"
          alt="NextJS logo"
          width={180}
          height={38}
          priority
        />

        <Image
          src="/webhook.svg"
          alt="Webhook logo"
          width={180}
          height={38}
          priority
        />

        <Image
          src="/clerkauth.svg"
          alt="Clerk Auth logo"
          width={180}
          height={38}
          priority
        />

        <Image
          src="/mongodb.svg"
          alt="MongoDB logo"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}
