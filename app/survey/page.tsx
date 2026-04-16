import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TypeformSurvey from "./TypeformSurvey";

export const metadata: Metadata = {
  title: "BarterTogether Community Survey",
  description:
    "Help shape BarterTogether before the first Toronto launch and future city expansion.",
};

export default function SurveyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F5F0] text-[#0F172A]">
      <section className="relative px-5 pb-14 pt-6 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-0 h-36 bg-[#2563EB]" />
        <div className="relative mx-auto max-w-7xl">
          <nav className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-4 py-3 shadow-[6px_6px_0_rgba(15,23,42,0.9)]">
            <Link href="/waitlist" className="text-2xl font-black tracking-tight">
              BarterTogether
            </Link>
            <div className="flex gap-3">
              <Link
                href="/waitlist"
                className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-4 py-2 text-sm font-black uppercase tracking-[0.08em] text-[#0F172A] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#A3E635]"
              >
                Main Page
              </Link>
              <Link
                href="/waitlist#waitlist"
                className="rounded-lg bg-[#A3E635] px-4 py-2 text-sm font-black uppercase tracking-[0.08em] text-[#0F172A] transition hover:bg-[#bef264]"
              >
                Waitlist
              </Link>
            </div>
          </nav>

          <div className="mx-auto max-w-5xl">
            <TypeformSurvey />
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 shadow-[12px_12px_0_rgba(15,23,42,0.9)] sm:p-8 lg:grid-cols-[1fr_0.82fr] lg:p-10">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-[#0F172A]/15 bg-[#FDFCF9] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#2563EB] shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
              Why this matters
            </p>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-[#0F172A] sm:text-6xl">
              Help build the trade network your city actually needs.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-[#0F172A]/75 sm:text-xl">
              BarterTogether launches first in Toronto, but the idea belongs
              anywhere people want more access, less waste, and better local
              exchange.
            </p>
            <p className="mt-5 max-w-2xl rounded-lg border-2 border-[#0F172A] bg-[#A3E635] px-4 py-3 text-base font-black leading-7 shadow-[5px_5px_0_#0F172A]">
              Your answers shape trust, local events, launch cities, and the
              kinds of trades people actually want to make.
            </p>
            <Link
              href="/waitlist#waitlist"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#0F172A] shadow-[5px_5px_0_#A3E635] transition hover:-translate-y-1"
            >
              Join emails too
            </Link>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-lg border-2 border-[#0F172A] bg-[#2563EB] shadow-[8px_8px_0_#A3E635]">
            <Image
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=85"
              alt="A diverse group of friends laughing together"
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#2563EB]/35" />
            <div className="absolute bottom-5 left-5 right-5 rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 text-center shadow-[6px_6px_0_rgba(15,23,42,0.9)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2563EB]">
                Five minutes
              </p>
              <p className="mt-2 text-3xl font-black leading-none">
                Your city gets a vote.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-lg border-2 border-[#0F172A] bg-[#2563EB] p-5 text-white shadow-[8px_8px_0_#A3E635] sm:p-7">
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-2 border-[#0F172A] bg-[#FDFCF9] shadow-[5px_5px_0_rgba(15,23,42,0.75)] sm:mx-0 sm:h-32 sm:w-32">
              <Image
                src="/images/morgan-founder-optimized.jpg"
                alt="Morgan Blackman, founder of BarterTogether"
                fill
                sizes="128px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#2563EB]/15" />
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#A3E635]">
                A note from the founder
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                BarterTogether started with a simple question.
              </h2>
              <div className="mt-4 space-y-4 text-base font-semibold leading-7 text-white/90 sm:text-lg sm:leading-8">
                <p>
                  What if people had more options? Options to exchange what they
                  already have, reduce waste, and support each other more
                  directly through goods, services, skills, and whatever else
                  holds value.
                </p>
                <p>
                  This isn&apos;t about replacing one system with another. It&apos;s
                  about expanding what&apos;s possible, and creating space for
                  people to get what they need without money always being the
                  thing that stops them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
