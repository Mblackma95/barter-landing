"use client";

import Image from "next/image";
import { useState } from "react";
import LocationAutocomplete, { type LocationSelection } from "./LocationAutocomplete";

type SurveyState = {
  usefulness: string;
  priorExperience: string;
  useCase: string;
  supply: string;
  demand: string;
  friction: string[];
  otherFriction: string;
  experienceDesign: string;
  exchangeType: string;
  firstName: string;
  lastName: string;
  ageRange: string;
  gender: string;
  otherGender: string;
  location: string;
  interests: string[];
  otherInterest: string;
  openFeedback: string;
  commitment: string;
  movement: string;
  email: string;
  locationDetails: LocationSelection | null;
};

const initialState: SurveyState = {
  usefulness: "",
  priorExperience: "",
  useCase: "",
  supply: "",
  demand: "",
  friction: [],
  otherFriction: "",
  experienceDesign: "",
  exchangeType: "",
  firstName: "",
  lastName: "",
  ageRange: "",
  gender: "",
  otherGender: "",
  location: "",
  interests: [],
  otherInterest: "",
  openFeedback: "",
  commitment: "",
  movement: "",
  email: "",
  locationDetails: null,
};

const frictionOptions = [
  "not trusting the other person",
  "people not following through",
  "hard to find the right match",
  "feels awkward to propose trades",
  "takes too much time",
  "not sure how value is determined",
  "safety concerns",
  "other",
];

const interestOptions = [
  "fitness / wellness",
  "creative (design, photography, writing)",
  "business / entrepreneurship",
  "tech / digital work",
  "home / lifestyle",
  "food / cooking",
  "fashion / styling",
  "childcare / family",
  "education / tutoring",
  "trades (repair, construction, etc.)",
  "other",
];

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function Choice({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-14 rounded-lg border-2 px-4 py-3 text-left text-base font-black transition hover:-translate-y-0.5 ${
        selected
          ? "border-[#0F172A] bg-[#2563EB] text-white shadow-[5px_5px_0_#0F172A]"
          : "border-[#0F172A] bg-[#FDFCF9] text-[#0F172A] shadow-[4px_4px_0_rgba(15,23,42,0.18)] hover:shadow-[5px_5px_0_#A3E635]"
      }`}
    >
      {label}
    </button>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="min-h-14 w-full rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-4 text-lg font-semibold text-[#0F172A] outline-none transition placeholder:text-[#0F172A]/35 focus:shadow-[5px_5px_0_#A3E635]"
    />
  );
}

function LongText({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="min-h-40 w-full rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-4 text-lg font-semibold text-[#0F172A] outline-none transition placeholder:text-[#0F172A]/35 focus:shadow-[5px_5px_0_#A3E635]"
    />
  );
}

function readableParagraph(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

export default function TypeformSurvey() {
  const [form, setForm] = useState<SurveyState>(initialState);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [submittedWithEmail, setSubmittedWithEmail] = useState(false);

  const update = <Key extends keyof SurveyState>(
    key: Key,
    value: SurveyState[Key],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setMessage("");
  };

  const steps = [
      {
        kind: "statement",
        eyebrow: "Welcome",
        title: "what if you didn't need money to get what you need?",
        description:
          "we're exploring a new kind of platform where people can trade skills, services, and items directly with each other.\n\nno money. just value.\n\nbut before building anything...\n\nwe want to know:\n\n→ does this actually matter to people?\n→ would you use something like this?\n→ could this actually work in real life?\n\nthis takes ~2 minutes. your answers shape what we build (or if we build it at all).",
        visual: (
          <div className="relative mx-auto mt-5 h-28 max-w-2xl overflow-hidden rounded-lg border-2 border-[#0F172A] shadow-[6px_6px_0_#A3E635] sm:h-36">
            {/* IMAGE: replace with final asset */}
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80"
              alt="Friends sitting together outdoors"
              fill
              priority
              sizes="(min-width: 768px) 640px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#2563EB]/25" />
          </div>
        ),
      },
      {
        kind: "statement",
        eyebrow: "Context",
        title: "why we're even asking this",
        description:
          "right now, most systems are built around buying and selling.\n\nbut people already have value:\nskills, time, resources, connections...\n\nthey just don't always have cash.\n\nso we're exploring:\n\nwhat if there was an easier way to exchange value without money being the barrier?",
      },
      {
        kind: "statement",
        eyebrow: "Story",
        title: "this already happens (just not at scale)",
        description:
          "someone trades a photoshoot for a new website.\n\nsomeone else offers meal prep in exchange for childcare.\n\na designer swaps branding work for fitness coaching.\n\nthese exchanges already exist...\n\nbut they're scattered, informal, and hard to coordinate.\n\nwe're exploring what it would look like to make this easier.",
        visual: (
          <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:grid-cols-2">
            {/* IMAGE: replace with final asset */}
            <div className="relative h-28 overflow-hidden rounded-lg border-2 border-[#0F172A] shadow-[5px_5px_0_#2563EB]">
              <Image
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=520&q=80"
                alt="A photographer holding a camera"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 300px, 90vw"
                className="object-cover"
              />
            </div>
            {/* IMAGE: replace with final asset */}
            <div className="relative h-28 overflow-hidden rounded-lg border-2 border-[#0F172A] shadow-[5px_5px_0_#A3E635]">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=520&q=80"
                alt="People working together on a laptop"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 300px, 90vw"
                className="object-cover"
              />
            </div>
            <p className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-4 py-3 text-sm font-black shadow-[4px_4px_0_rgba(15,23,42,0.2)] sm:col-span-2">
              photoshoot ↔ website · meal prep ↔ childcare
            </p>
          </div>
        ),
      },
      {
        eyebrow: "Vision",
        title: "would something like this be useful to you?",
        visual: (
          <div className="relative mx-auto mb-6 h-28 max-w-2xl overflow-hidden rounded-lg border-2 border-[#0F172A] shadow-[6px_6px_0_#A3E635]">
            {/* IMAGE: replace with final asset */}
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
              alt="A group collaborating around a table"
              fill
              loading="lazy"
              sizes="(min-width: 768px) 640px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0F172A]/20" />
          </div>
        ),
        content: (
          <div className="grid gap-3">
            {["yes, definitely", "maybe", "not really"].map((option) => (
              <Choice
                key={option}
                label={option}
                selected={form.usefulness === option}
                onClick={() => update("usefulness", option)}
              />
            ))}
          </div>
        ),
        isValid: Boolean(form.usefulness),
      },
      {
        eyebrow: "Experience",
        title: "have you ever done something like this before?",
        content: (
          <div className="grid gap-3">
            {[
              "yes, multiple times",
              "once or twice",
              "i've wanted to, but haven't",
              "no, never",
            ].map((option) => (
              <Choice
                key={option}
                label={option}
                selected={form.priorExperience === option}
                onClick={() => update("priorExperience", option)}
              />
            ))}
          </div>
        ),
        isValid: Boolean(form.priorExperience),
      },
      {
        eyebrow: "Use case",
        title: "what would you actually use something like this for?",
        content: (
          <LongText
            value={form.useCase}
            onChange={(value) => update("useCase", value)}
            placeholder="Tell us the real-life thing you would try to trade for."
          />
        ),
        isValid: Boolean(form.useCase.trim()),
      },
      {
        eyebrow: "Supply",
        title: "what could you offer?",
        description: "(skills, services, items, time, etc.)",
        content: (
          <LongText
            value={form.supply}
            onChange={(value) => update("supply", value)}
            placeholder="Skills, services, items, time, connections..."
          />
        ),
        isValid: Boolean(form.supply.trim()),
      },
      {
        eyebrow: "Demand",
        title: "what would you want in return?",
        content: (
          <LongText
            value={form.demand}
            onChange={(value) => update("demand", value)}
            placeholder="What would feel useful, fun, urgent, or worth trading for?"
          />
        ),
        isValid: Boolean(form.demand.trim()),
      },
      {
        eyebrow: "Friction",
        title: "what would hold you back from using something like this?",
        description: "Pick all that apply.",
        content: (
          <div className="grid gap-3">
            {frictionOptions.map((option) => (
              <Choice
                key={option}
                label={option}
                selected={form.friction.includes(option)}
                onClick={() => update("friction", toggleValue(form.friction, option))}
              />
            ))}
            {form.friction.includes("other") ? (
              <TextInput
                value={form.otherFriction}
                onChange={(value) => update("otherFriction", value)}
                placeholder="What else would hold you back?"
              />
            ) : null}
          </div>
        ),
        isValid: form.friction.length > 0,
      },
      {
        eyebrow: "Experience design",
        title: "how would you want this to feel?",
        content: (
          <div className="grid gap-3">
            {[
              "simple and transactional",
              "community-driven and social",
              "curated and intentional",
              "a mix of all three",
            ].map((option) => (
              <Choice
                key={option}
                label={option}
                selected={form.experienceDesign === option}
                onClick={() => update("experienceDesign", option)}
              />
            ))}
          </div>
        ),
        isValid: Boolean(form.experienceDesign),
      },
      {
        eyebrow: "Digital vs local",
        title: "how would you most likely use this?",
        content: (
          <div className="grid gap-3">
            {[
              "digital exchanges (services, remote work, etc.)",
              "local exchanges (in-person trades)",
              "both",
            ].map((option) => (
              <Choice
                key={option}
                label={option}
                selected={form.exchangeType === option}
                onClick={() => update("exchangeType", option)}
              />
            ))}
          </div>
        ),
        isValid: Boolean(form.exchangeType),
      },
      {
        kind: "statement",
        eyebrow: "Pause",
        title: "you've made it this far — thank you",
        description:
          "this already tells us a lot.\n\na few optional questions to help us build this better:",
      },
      {
        eyebrow: "Name",
        title: "first and last name (optional)",
        content: (
          <div className="grid gap-3 sm:grid-cols-2">
            <TextInput
              value={form.firstName}
              onChange={(value) => update("firstName", value)}
              placeholder="First name"
            />
            <TextInput
              value={form.lastName}
              onChange={(value) => update("lastName", value)}
              placeholder="Last name"
            />
          </div>
        ),
        isValid: true,
      },
      {
        eyebrow: "Age range",
        title: "what's your age range?",
        content: (
          <div className="grid gap-3">
            {["under 18", "18-24", "25-34", "35-44", "45+"].map((option) => (
              <Choice
                key={option}
                label={option}
                selected={form.ageRange === option}
                onClick={() => update("ageRange", option)}
              />
            ))}
          </div>
        ),
        isValid: true,
      },
      {
        eyebrow: "Gender",
        title: "gender (optional)",
        content: (
          <div className="grid gap-3">
            {["female", "male", "non-binary", "prefer not to say", "other"].map(
              (option) => (
                <Choice
                  key={option}
                  label={option}
                  selected={form.gender === option}
                  onClick={() => update("gender", option)}
                />
              ),
            )}
            {form.gender === "other" ? (
              <TextInput
                value={form.otherGender}
                onChange={(value) => update("otherGender", value)}
                placeholder="How would you describe it?"
              />
            ) : null}
          </div>
        ),
        isValid: true,
      },
      {
        eyebrow: "Location",
        title: "where are you based?",
        content: (
          <LocationAutocomplete
            value={form.location}
            onTextChange={(value) => {
              update("location", value);
              update("locationDetails", null);
            }}
            onSelect={(location) => {
              update("location", location.label);
              update("locationDetails", location);
            }}
          />
        ),
        isValid: true,
      },
      {
        eyebrow: "Interests",
        title: "what are you into?",
        description: "Pick all that apply.",
        content: (
          <div className="grid gap-3">
            {interestOptions.map((option) => (
              <Choice
                key={option}
                label={option}
                selected={form.interests.includes(option)}
                onClick={() => update("interests", toggleValue(form.interests, option))}
              />
            ))}
            {form.interests.includes("other") ? (
              <TextInput
                value={form.otherInterest}
                onChange={(value) => update("otherInterest", value)}
                placeholder="What else are you into?"
              />
            ) : null}
          </div>
        ),
        isValid: true,
      },
      {
        eyebrow: "Open feedback",
        title: "anything else on your mind?",
        description: "ideas, concerns, skepticism, or anything we should think about",
        content: (
          <LongText
            value={form.openFeedback}
            onChange={(value) => update("openFeedback", value)}
            placeholder="Say the quiet part out loud."
          />
        ),
        isValid: true,
      },
      {
        eyebrow: "Commitment",
        title: "if this existed today, would you actually make a trade in the next 2 weeks?",
        content: (
          <div className="grid gap-3">
            {["yes", "maybe", "probably not"].map((option) => (
              <Choice
                key={option}
                label={option}
                selected={form.commitment === option}
                onClick={() => update("commitment", option)}
              />
            ))}
          </div>
        ),
        isValid: Boolean(form.commitment),
      },
      {
        eyebrow: "Movement",
        title: "would you want to be part of building something like this?",
        visual: (
          <div className="relative mx-auto mb-6 h-28 max-w-2xl overflow-hidden rounded-lg border-2 border-[#0F172A] shadow-[6px_6px_0_#2563EB] sm:h-36">
            {/* IMAGE: replace with final asset */}
            <Image
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80"
              alt="People gathered together and smiling"
              fill
              loading="lazy"
              sizes="(min-width: 768px) 640px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#2563EB]/20" />
          </div>
        ),
        content: (
          <div className="grid gap-3">
            {["yes, i'm in", "i'm curious", "not for me"].map((option) => (
              <Choice
                key={option}
                label={option}
                selected={form.movement === option}
                onClick={() => update("movement", option)}
              />
            ))}
          </div>
        ),
        isValid: Boolean(form.movement),
      },
      {
        eyebrow: "Early access",
        title: "want early access?",
        description:
          "drop your email to test the platform, shape how it works, and be first to trade.",
        content: (
          <div className="grid gap-4">
            {/* Email is optional – do not enforce validation */}
            <TextInput
              value={form.email}
              type="email"
              onChange={(value) => update("email", value)}
              placeholder="your.email@example.com"
            />
            <button
              type="button"
              onClick={() => submitSurvey(true)}
              disabled={status === "submitting" || status === "success"}
              className="mx-auto min-h-12 rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-5 py-3 text-sm font-black lowercase tracking-[0.03em] text-[#0F172A] shadow-[4px_4px_0_#A3E635] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
            >
              skip, just here to share feedback
            </button>
          </div>
        ),
        isValid: true,
      },
    ];

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep.isValid === false) {
      setMessage("Give this one a quick answer, then keep going.");
      return;
    }

    setMessage("");
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const previousStep = () => {
    setMessage("");
    setStep((current) => Math.max(current - 1, 0));
  };

  const submitSurvey = async (skipEmail = false) => {
    setStatus("submitting");
    setMessage("");
    const hasEmail = Boolean(form.email.trim()) && !skipEmail;

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, emailSkipped: skipEmail }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Survey could not be saved yet.");
      }

      setStatus("success");
      setSubmittedWithEmail(hasEmail);
      setMessage(result.message || "Survey saved. Thank you for shaping this.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Survey could not be saved yet.",
      );
    }
  };

  if (status === "success") {
    return (
      <section className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-6 text-center shadow-[12px_12px_0_#2563EB] sm:p-8 lg:min-h-[560px]">
        <div className="mx-auto flex min-h-[430px] max-w-3xl flex-col justify-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2563EB]">
            Thank you
          </p>
          <h2 className="mt-4 text-5xl font-black leading-none tracking-tight sm:text-7xl">
            you&apos;re early 👀
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 text-[#0F172A]">
            this is still being shaped — and you&apos;re part of that. we&apos;ll be
            sharing updates soon.
          </p>
          {submittedWithEmail ? (
            <p className="mx-auto mt-6 max-w-xl rounded-lg border-2 border-[#0F172A] bg-[#A3E635] px-5 py-4 text-lg font-black shadow-[5px_5px_0_#0F172A]">
              check your email for next steps
            </p>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-4 text-center shadow-[12px_12px_0_#2563EB] sm:p-6 lg:min-h-[560px]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="rounded-full border border-[#0F172A]/15 bg-[#F8F5F0] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#2563EB]">
          Question {step + 1} of {steps.length}
        </p>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F172A]/50">
          Guided survey
        </p>
      </div>

      <div className="mb-6 h-3 overflow-hidden rounded-full border-2 border-[#0F172A] bg-[#F8F5F0]">
        <div
          className="h-full rounded-full bg-[#A3E635] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto flex min-h-[300px] max-w-3xl flex-col justify-center">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2563EB]">
          {currentStep.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-black leading-none tracking-tight sm:text-5xl">
          {currentStep.title}
        </h2>
        {currentStep.description ? (
          <p className="mx-auto mt-4 max-w-2xl text-left text-base font-semibold leading-7 text-[#0F172A] sm:text-lg">
            {readableParagraph(currentStep.description)}
          </p>
        ) : null}
        {"visual" in currentStep ? currentStep.visual : null}
        {"content" in currentStep ? (
          <div className="mt-6">{currentStep.content}</div>
        ) : null}
      </div>

      {message ? (
        <p
          className={`mx-auto mt-6 max-w-2xl rounded-lg border-2 px-4 py-3 text-sm font-black ${
            status === "error"
                ? "border-[#0F172A] bg-[#FDFCF9] text-[#0F172A]"
                : "border-[#2563EB] bg-[#F8F5F0] text-[#0F172A]"
          }`}
        >
          {message}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={previousStep}
          disabled={step === 0 || status === "submitting"}
          className="min-h-12 rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#0F172A] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#A3E635] disabled:cursor-not-allowed disabled:opacity-35"
        >
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className="min-h-12 rounded-lg border-2 border-[#0F172A] bg-[#2563EB] px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[5px_5px_0_#0F172A] transition hover:-translate-y-1"
          >
            {currentStep.kind === "statement" ? "Start" : "Next"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => submitSurvey(false)}
            disabled={status === "submitting"}
            className="min-h-12 rounded-lg border-2 border-[#0F172A] bg-[#2563EB] px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[5px_5px_0_#0F172A] transition hover:-translate-y-1 disabled:cursor-wait disabled:opacity-70"
          >
            {status === "submitting" ? "Sending..." : "Submit survey"}
          </button>
        )}
      </div>
    </section>
  );
}
