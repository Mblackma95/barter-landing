import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SurveyForm from "./SurveyForm";

export const metadata: Metadata = {
  title: "BarterTogether Community Survey",
  description:
    "Help shape BarterTogether before the first Toronto launch and future city expansion.",
};

export default function SurveyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F5F0] text-[#0F172A]">
      <section className="relative px-5 pb-16 pt-6 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-0 h-44 bg-[#2563EB]" />
        <div className="relative mx-auto max-w-7xl">
          <nav className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-4 py-3 shadow-[6px_6px_0_rgba(15,23,42,0.9)]">
            <Link href="/waitlist" className="text-2xl font-black tracking-tight">
              BarterTogether
            </Link>
            <div className="flex gap-3">
              <Link
                href="/waitlist"
                className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-4 py-2 text-sm font-black uppercase tracking-[0.08em] text-[#0F172A] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#A3E635]"
              >
                Landing page
              </Link>
              <Link
                href="/waitlist#waitlist"
                className="rounded-lg bg-[#A3E635] px-4 py-2 text-sm font-black uppercase tracking-[0.08em] text-[#0F172A] transition hover:bg-[#bef264]"
              >
                Waitlist
              </Link>
            </div>
          </nav>

          <div className="grid gap-8 rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 shadow-[12px_12px_0_rgba(15,23,42,0.9)] sm:p-8 lg:grid-cols-[1fr_0.78fr] lg:p-10">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-[#0F172A]/15 bg-[#FDFCF9] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#2563EB] shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
                Community survey
              </p>
              <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-[#0F172A] sm:text-7xl lg:text-8xl">
                Help build the trade network your city actually needs.
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-[#0F172A]/75 sm:text-xl">
                BarterTogether launches first in Toronto, but the idea belongs
                anywhere people want more access, less waste, and better local
                exchange.
              </p>
              <p className="mt-5 max-w-2xl rounded-lg border-2 border-[#0F172A] bg-[#A3E635] px-4 py-3 text-base font-black leading-7 shadow-[5px_5px_0_#0F172A]">
                Share what you would offer, what you need, and where
                BarterTogether should go next.
              </p>
            </div>

            <div className="relative min-h-[420px] overflow-hidden rounded-lg border-2 border-[#0F172A] bg-[#2563EB] shadow-[8px_8px_0_#A3E635]">
              <Image
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=85"
                alt="A diverse group of friends laughing together"
                fill
                priority
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#2563EB]/35" />
              <div className="absolute bottom-5 left-5 right-5 rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 shadow-[6px_6px_0_rgba(15,23,42,0.9)]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2563EB]">
                  Five minutes
                </p>
                <p className="mt-2 text-3xl font-black leading-none">
                  Your city gets a vote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <aside className="rounded-lg border-2 border-[#0F172A] bg-[#2563EB] p-6 text-white shadow-[8px_8px_0_#0F172A] lg:sticky lg:top-8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#A3E635]">
              Why this matters
            </p>
            <h2 className="mt-4 text-4xl font-black leading-none">
              We are not guessing our way into community.
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-white/85">
              This survey helps shape trust, local events, launch cities, and
              the kinds of trades people actually want to make.
            </p>
            <Link
              href="/waitlist#waitlist"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#0F172A] shadow-[5px_5px_0_#A3E635] transition hover:-translate-y-1"
            >
              Join emails too
            </Link>
          </aside>

          <SurveyForm />
        </div>
      </section>
    </main>
  );
}
