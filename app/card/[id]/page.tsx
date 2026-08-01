import type { Metadata } from "next";
import Link from "next/link";
import { getCard } from "@/lib/db";
import { tonePreset } from "@/lib/tone";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const card = await getCard(id);
  if (!card) return { title: "Card not found · For You, Always" };
  const name = card.to?.trim();
  const tone = tonePreset(card.tone);
  const opener = tone.opener.charAt(0).toUpperCase() + tone.opener.slice(1);
  const title = name ? `${name}, ${tone.opener} ${tone.emoji}` : `${opener} ${tone.emoji}`;
  const description = `A ${tone.noun} is waiting for you — tap to open it. Made with For You, Always.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CardPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const preview = sp?.preview === "1"; // creator preview — never burns the seal
  const card = await getCard(id);

  if (!card) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#140a0e] px-6 text-center text-white">
        <div className="text-5xl">💔</div>
        <h1 className="mt-4 text-2xl font-semibold">This message couldn&apos;t be found</h1>
        <p className="mt-2 max-w-sm text-sm text-white/60">
          The link may be mistyped or expired. Ask the sender to share it again — or write your own.
        </p>
        <Link href="/" className="mt-6 rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-medium hover:brightness-110">
          Make a special message →
        </Link>
      </main>
    );
  }

  // Like a real letter: once opened it can't be resealed. Revisits open straight to the letter.
  const alreadyOpened = !!card.openedAt && !preview;
  return <Reveal key={card.id} card={card} alreadyOpened={alreadyOpened} preview={preview} />;
}
