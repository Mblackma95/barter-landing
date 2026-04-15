import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Join the BarterTogether Waitlist",
  description:
    "BarterTogether is a community-powered platform for local exchange, skill swaps, and people-first value.",
};

const tradeCards = [
  {
    offer: "Logo design",
    need: "haircut",
    note: "Brand polish for a fresh fade.",
    image:
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=240&q=80",
    imageAlt: "A barber cutting a client's hair",
    className: "lg:-rotate-2",
  },
  {
    offer: "Yoga session",
    need: "groceries",
    note: "Movement, breath, and a stocked fridge.",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=240&q=80",
    imageAlt: "A yoga instructor smiling in a bright studio",
    className: "lg:ml-auto lg:rotate-2",
  },
  {
    offer: "Photoshoot",
    need: "website help",
    note: "Portraits traded for a homepage tune-up.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=240&q=80",
    imageAlt: "Two people collaborating on a laptop",
    className: "lg:mx-auto lg:-rotate-1",
  },
];

const steps = [
  {
    title: "List what you offer",
    body: "Skills, services, items, time, expertise, extra things sitting in your home, or something digital you can create.",
  },
  {
    title: "Share what you need",
    body: "Furniture, photography, tutoring, hair services, design help, wellness support, childcare, or something completely different.",
  },
  {
    title: "Match and connect",
    body: "Find aligned local trades and start the conversation without the weirdness of scattered group threads and ghosting.",
  },
  {
    title: "Build trust over time",
    body: "Verified profiles, reviews, and community events help create an exchange ecosystem that actually feels safe.",
  },
];

const quoteCards = [
  "I have something to offer, I just don't always have cash.",
  "I want local exchange to feel easier and less awkward.",
  "I'd rather trade with real people than keep buying everything new.",
  "There has to be a better way to live than endless transactions.",
];

const cultureCards = [
  "Pop-up swap markets",
  "Skill-sharing events",
  "Neighborhood barter circles",
  "Digital and local exchange in one ecosystem",
];

const whyNowImages = [
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=420&q=85",
    alt: "A diverse group of friends laughing outside",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=420&q=85",
    alt: "People gathered around a laptop collaborating",
  },
  {
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=420&q=85",
    alt: "Two people smiling during a conversation",
  },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 inline-flex rounded-full border border-[#0F172A]/15 bg-[#FDFCF9] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#2563EB] shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
      {children}
    </p>
  );
}

function PrimaryButton({
  children,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "border-[#0F172A] bg-[#2563EB] text-white shadow-[5px_5px_0_#0F172A] hover:-translate-y-1 hover:shadow-[7px_7px_0_#0F172A]"
      : "border-[#0F172A] bg-[#FDFCF9] text-[#0F172A] shadow-[5px_5px_0_#A3E635] hover:-translate-y-1 hover:shadow-[7px_7px_0_#A3E635]";

  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-lg border-2 px-6 py-3 text-sm font-black uppercase tracking-[0.08em] transition ${styles}`}
    >
      {children}
    </a>
  );
}

function InfoCard({
  eyebrow,
  title,
  body,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <article
      className={`rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-6 shadow-[8px_8px_0_rgba(37,99,235,0.9)] transition hover:-translate-y-1 ${className}`}
    >
      {eyebrow ? (
        <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-[#2563EB]">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="text-2xl font-black leading-tight text-[#0F172A]">
        {title}
      </h3>
      <p className="mt-4 text-base leading-7 text-[#0F172A]/75">{body}</p>
    </article>
  );
}

export default function WaitlistPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F5F0] text-[#0F172A]">
      <section className="relative px-5 pb-20 pt-6 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-0 h-40 bg-[#2563EB]" />
        <div className="relative mx-auto max-w-7xl">
          <nav className="mb-10 flex items-center justify-between rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-4 py-3 shadow-[6px_6px_0_rgba(15,23,42,0.9)]">
            <a href="#top" className="text-2xl font-black tracking-tight">
              BarterTogether
            </a>
            <a
              href="#waitlist"
              className="rounded-lg bg-[#A3E635] px-4 py-2 text-sm font-black uppercase tracking-[0.08em] text-[#0F172A] transition hover:bg-[#bef264]"
            >
              Join
            </a>
          </nav>

          <div
            id="top"
            className="grid items-center gap-10 rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 shadow-[12px_12px_0_rgba(15,23,42,0.9)] sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10"
          >
            <div className="relative z-10">
              <SectionLabel>Global waitlist / Toronto first</SectionLabel>
              <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-[#0F172A] sm:text-7xl lg:text-8xl">
                What if you didn&apos;t need money to get what you need?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#0F172A]/78 sm:text-xl">
                BarterTogether is a new way to trade, share, and support each other
                through local exchange, skill swaps, and community-powered
                value. Built for people who know there&apos;s more to worth than
                just dollars.
              </p>
              <p className="mt-5 max-w-2xl rounded-lg border-2 border-[#0F172A] bg-[#A3E635] px-4 py-3 text-base font-black leading-7 shadow-[5px_5px_0_#0F172A]">
                Sign up from anywhere. Toronto is the first launch city, then
                BarterTogether grows city by city with the people asking for it.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <PrimaryButton href="#waitlist">Join the waitlist</PrimaryButton>
                <PrimaryButton href="/survey" variant="secondary">
                  Take the survey
                </PrimaryButton>
              </div>
              <p className="mt-8 max-w-xl rounded-lg border border-[#0F172A]/15 bg-[#F8F5F0] px-4 py-3 text-sm font-bold text-[#0F172A]/75">
                Think Nextdoor meets Karrot meets a people-powered community
                platform.
              </p>
            </div>

            <div className="relative min-h-[760px] overflow-hidden rounded-lg border-2 border-[#0F172A] bg-[#2563EB] p-4 shadow-[8px_8px_0_#A3E635] sm:min-h-[700px] sm:p-6 lg:min-h-[640px]">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1100&q=85"
                alt="A diverse group of friends laughing together outside"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(37,99,235,0.22),rgba(59,130,246,0.18),rgba(15,23,42,0.58))]" />
              <div className="relative grid h-full content-between gap-5">
                <div className="max-w-sm rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 shadow-[8px_8px_0_rgba(15,23,42,0.75)]">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2563EB]">
                    People-powered exchange
                  </p>
                  <p className="mt-4 text-4xl font-black leading-none">
                    The idea travels before the app does.
                  </p>
                </div>
                <div className="grid gap-4">
                  {tradeCards.map((card) => (
                    <article
                      key={card.offer}
                      className={`w-full max-w-[440px] rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-3 shadow-[6px_6px_0_rgba(163,230,53,0.92)] ${card.className}`}
                    >
                      <div className="flex gap-3">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 border-[#0F172A] bg-[#F8F5F0]">
                          <Image
                            src={card.image}
                            alt={card.imageAlt}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2563EB]">
                            Trade idea
                          </p>
                          <h2 className="mt-2 break-words text-lg font-black leading-tight sm:text-xl">
                            {card.offer}{" "}
                            <span className="text-[#2563EB]">&rarr;</span>{" "}
                            {card.need}
                          </h2>
                          <p className="mt-3 text-sm font-semibold leading-6 text-[#0F172A]/68">
                            {card.note}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Why now</SectionLabel>
            <h2 className="text-4xl font-black leading-none tracking-tight sm:text-6xl">
              Everything feels more expensive. Everything feels more
              transactional.
            </h2>
          </div>
          <div className="rounded-lg border-2 border-[#0F172A] bg-[#2563EB] p-6 text-center text-white shadow-[10px_10px_0_rgba(15,23,42,0.9)] sm:p-8">
            <p className="mx-auto max-w-3xl text-xl font-semibold leading-9">
              People have skills, time, services, and useful things sitting
              right in front of them. What most of us do not have is endless
              cash, endless trust, or an easy way to exchange value locally.
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-xl font-semibold leading-9">
              BarterTogether is here to make that feel possible again. Less waste. More
              connection. More access. A little more humanity in how we meet
              each other&apos;s needs.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {whyNowImages.map((image) => (
                <div
                  key={image.src}
                  className="relative min-h-36 overflow-hidden rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] shadow-[5px_5px_0_rgba(15,23,42,0.7)]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 640px) 18vw, 90vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="bg-[#0F172A] px-5 py-20 text-[#FDFCF9] sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="max-w-4xl text-4xl font-black leading-none tracking-tight sm:text-6xl">
            A simpler way to trade what you have for what you need.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <InfoCard
                key={step.title}
                eyebrow={`Step ${index + 1}`}
                title={step.title}
                body={step.body}
                className={
                  index % 2 === 0
                    ? "lg:translate-y-6"
                    : "shadow-[8px_8px_0_rgba(163,230,53,0.9)]"
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-8">
              <SectionLabel>This is for you</SectionLabel>
              <h2 className="text-5xl font-black leading-none tracking-tight sm:text-7xl">
                This is for you if...
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {quoteCards.map((quote, index) => (
                <blockquote
                  key={quote}
                  className={`rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-6 text-2xl font-black leading-tight shadow-[8px_8px_0_rgba(37,99,235,0.9)] ${
                    index === 1 || index === 2 ? "sm:translate-y-8" : ""
                  }`}
                >
                  &ldquo;{quote}&rdquo;
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] shadow-[12px_12px_0_rgba(37,99,235,0.9)] lg:grid-cols-[1fr_0.9fr]">
          <div className="p-6 sm:p-10">
            <SectionLabel>More than an app</SectionLabel>
            <h2 className="max-w-3xl text-5xl font-black leading-none tracking-tight sm:text-7xl">
              This is about building local culture again.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {cultureCards.map((card) => (
                <div
                  key={card}
                  className="flex min-h-24 items-center justify-center rounded-lg border-2 border-[#0F172A] bg-[#F8F5F0] p-5 text-center text-xl font-black shadow-[5px_5px_0_#0F172A]"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-80 bg-[#3B82F6]">
            <Image
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80"
              alt="Friends laughing together at a community gathering"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-50"
            />
            <div className="absolute inset-0 bg-[#2563EB]/45" />
            <div className="absolute bottom-6 left-6 right-6 rounded-lg border-2 border-[#0F172A] bg-[#A3E635] p-5 text-center text-3xl font-black leading-none shadow-[6px_6px_0_#0F172A]">
              Trade, meet, repeat.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2563EB] px-5 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionLabel>Mission-driven model</SectionLabel>
            <h2 className="text-5xl font-black leading-none tracking-tight sm:text-7xl">
              Built for community, not built to squeeze users.
            </h2>
          </div>
          <div className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-6 text-[#0F172A] shadow-[10px_10px_0_rgba(15,23,42,0.9)] sm:p-8">
            <p className="text-xl font-semibold leading-9">
              BarterTogether is being built as a people-first platform supported by
              grants, partnerships, and community contributions. The goal is to
              keep access open, make local exchange easier, and create a
              platform people actually feel good using.
            </p>
          </div>
        </div>
      </section>

      <section id="waitlist" className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <SectionLabel>Waitlist</SectionLabel>
            <h2 className="text-5xl font-black leading-none tracking-tight sm:text-7xl">
              Join from anywhere. Toronto goes first.
            </h2>
            <p className="mt-6 max-w-2xl text-xl font-semibold leading-9 text-[#0F172A]/75">
              We&apos;re inviting early users, community-minded creatives, local
              businesses, and curious traders from anywhere in the world to help
              shape the first version of BarterTogether.
            </p>
            <p className="mt-5 max-w-2xl text-xl font-semibold leading-9 text-[#0F172A]/75">
              The first live launch will happen in Toronto. If it goes well,
              we&apos;ll expand slowly into more cities, guided by where people are
              already talking, trading, and asking for BarterTogether next.
            </p>
            <p className="mt-5 max-w-2xl text-xl font-semibold leading-9 text-[#0F172A]/75">
              Join the waitlist to get launch updates, early beta access, city
              expansion news, and first invites to local BarterTogether events.
            </p>
          </div>
          <div className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 shadow-[12px_12px_0_#2563EB] sm:p-8 lg:mt-20">
            <p className="mx-auto max-w-2xl text-center text-sm font-black uppercase leading-7 tracking-[0.16em] text-[#2563EB]">
              Join the waitlist and help shape a better way to trade.
            </p>
            <div className="mt-6 flex justify-center">
              {/* Sender form embed.
                  This div comes from Sender's HTML snippet. The site-wide script in app/layout.tsx
                  renders the actual waitlist form into this container. */}
              <div
                style={{ textAlign: "left" }}
                className="sender-form-field mx-auto flex min-h-72 max-w-full justify-center overflow-x-auto rounded-lg bg-[#FDFCF9] p-2 shadow-inner sm:p-3 [&>*]:mx-auto"
                data-sender-form-id="ejRw2z"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-lg border-2 border-[#0F172A] bg-[#0F172A] p-6 text-[#FDFCF9] shadow-[12px_12px_0_#A3E635] sm:p-10">
          <p className="mb-5 inline-flex rounded-full bg-[#A3E635] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0F172A]">
            Final call
          </p>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="text-5xl font-black leading-none tracking-tight sm:text-7xl">
                You already have something to offer.
              </h2>
              <p className="mt-6 text-2xl font-black text-[#A3E635]">
                The question is... what would you trade?
              </p>
            </div>
            <PrimaryButton href="#waitlist" variant="secondary">
              Join the waitlist
            </PrimaryButton>
            <PrimaryButton href="/survey">Take the survey</PrimaryButton>
          </div>
        </div>
      </section>
    </main>
  );
}
