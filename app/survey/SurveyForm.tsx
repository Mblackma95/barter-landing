"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const offerOptions = [
  "Creative work",
  "Hair or beauty",
  "Wellness support",
  "Tutoring",
  "Tech help",
  "Childcare",
  "Repairs",
  "Items I own",
  "Food or groceries",
  "Event help",
];

const needOptions = [
  "Groceries",
  "Furniture",
  "Photography",
  "Design help",
  "Website help",
  "Hair services",
  "Tutoring",
  "Wellness",
  "Repairs",
  "Community events",
];

const safetyOptions = [
  "Verified profiles",
  "Reviews",
  "Clear trade agreements",
  "Public meetup spots",
  "Community hosts",
  "Event-based trading",
];

const eventOptions = [
  "Pop-up swap markets",
  "Skill-sharing nights",
  "Neighborhood barter circles",
  "Creative trade mixers",
  "Small business trade days",
];

type SurveyState = {
  name: string;
  email: string;
  city: string;
  country: string;
  ageRange: string;
  offers: string[];
  otherOffer: string;
  needs: string[];
  otherNeed: string;
  safety: string[];
  events: string[];
  expansionCity: string;
  story: string;
  wantsUpdates: string;
};

const initialState: SurveyState = {
  name: "",
  email: "",
  city: "",
  country: "",
  ageRange: "",
  offers: [],
  otherOffer: "",
  needs: [],
  otherNeed: "",
  safety: [],
  events: [],
  expansionCity: "",
  story: "",
  wantsUpdates: "yes",
};

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function OptionPill({
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
      className={`rounded-lg border-2 px-4 py-3 text-left text-sm font-black transition hover:-translate-y-0.5 ${
        selected
          ? "border-[#0F172A] bg-[#2563EB] text-white shadow-[4px_4px_0_#0F172A]"
          : "border-[#0F172A]/25 bg-[#FDFCF9] text-[#0F172A] hover:border-[#0F172A] hover:shadow-[4px_4px_0_#A3E635]"
      }`}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black uppercase tracking-[0.12em] text-[#2563EB]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-3 min-h-12 w-full rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-4 text-base font-semibold text-[#0F172A] outline-none transition focus:shadow-[4px_4px_0_#A3E635]"
      />
    </label>
  );
}

function SurveyStepper() {
  const [form, setForm] = useState<SurveyState>(initialState);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const totalSteps = 7;
  const progress = ((step + 1) / totalSteps) * 100;

  const update = <Key extends keyof SurveyState>(
    key: Key,
    value: SurveyState[Key],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setMessage("");
  };

  const canAdvance = useMemo(() => {
    if (step === 0) return Boolean(form.city.trim() && form.country.trim());
    if (step === 1) return form.offers.length > 0 || Boolean(form.otherOffer.trim());
    if (step === 2) return form.needs.length > 0 || Boolean(form.otherNeed.trim());
    if (step === 3) return form.safety.length > 0;
    if (step === 4) return form.events.length > 0;
    if (step === 5) return Boolean(form.expansionCity.trim());
    return true;
  }, [form, step]);

  const nextStep = () => {
    if (!canAdvance) {
      setMessage("Give this one a quick answer, then keep going.");
      return;
    }

    setMessage("");
    setStep((current) => Math.min(current + 1, totalSteps - 1));
  };

  const previousStep = () => {
    setMessage("");
    setStep((current) => Math.max(current - 1, 0));
  };

  const submitSurvey = async () => {
    if (!canAdvance) {
      setMessage("Add the last required detail before submitting.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Survey could not be saved yet.");
      }

      setStatus("success");
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

  const stepContent = [
    {
      eyebrow: "Start here",
      title: "Where are you trading from?",
      helper:
        "Anyone can answer. Toronto goes first, but we want to see where the signal is coming from.",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="City"
            value={form.city}
            onChange={(value) => update("city", value)}
            placeholder="Toronto, Lagos, London..."
          />
          <Field
            label="Country"
            value={form.country}
            onChange={(value) => update("country", value)}
            placeholder="Canada"
          />
          <Field
            label="Name"
            value={form.name}
            onChange={(value) => update("name", value)}
            placeholder="Optional"
          />
          <label className="block">
            <span className="text-sm font-black uppercase tracking-[0.12em] text-[#2563EB]">
              Age range
            </span>
            <select
              value={form.ageRange}
              onChange={(event) => update("ageRange", event.target.value)}
              className="mt-3 min-h-12 w-full rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-4 text-base font-semibold text-[#0F172A] outline-none transition focus:shadow-[4px_4px_0_#A3E635]"
            >
              <option value="">Choose one</option>
              <option value="Under 18">Under 18</option>
              <option value="18-24">18-24</option>
              <option value="25-34">25-34</option>
              <option value="35-44">35-44</option>
              <option value="45+">45+</option>
            </select>
          </label>
        </div>
      ),
    },
    {
      eyebrow: "What you have",
      title: "What could you offer in a trade?",
      helper:
        "Skills, services, items, time, creative work, or something wonderfully specific.",
      content: (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {offerOptions.map((option) => (
              <OptionPill
                key={option}
                label={option}
                selected={form.offers.includes(option)}
                onClick={() => update("offers", toggleValue(form.offers, option))}
              />
            ))}
          </div>
          <div className="mt-5">
            <Field
              label="Something else"
              value={form.otherOffer}
              onChange={(value) => update("otherOffer", value)}
              placeholder="Tell us what else you could trade"
            />
          </div>
        </>
      ),
    },
    {
      eyebrow: "What you need",
      title: "What would you trade for?",
      helper:
        "Think practical, joyful, urgent, local, digital, everyday. It all counts.",
      content: (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {needOptions.map((option) => (
              <OptionPill
                key={option}
                label={option}
                selected={form.needs.includes(option)}
                onClick={() => update("needs", toggleValue(form.needs, option))}
              />
            ))}
          </div>
          <div className="mt-5">
            <Field
              label="Something else"
              value={form.otherNeed}
              onChange={(value) => update("otherNeed", value)}
              placeholder="What would make your life easier?"
            />
          </div>
        </>
      ),
    },
    {
      eyebrow: "Trust",
      title: "What would make trading feel safe?",
      helper: "This is one of the biggest pieces of the product.",
      content: (
        <div className="grid gap-3 sm:grid-cols-2">
          {safetyOptions.map((option) => (
            <OptionPill
              key={option}
              label={option}
              selected={form.safety.includes(option)}
              onClick={() => update("safety", toggleValue(form.safety, option))}
            />
          ))}
        </div>
      ),
    },
    {
      eyebrow: "Community",
      title: "What should exist beyond the app?",
      helper:
        "BarterTogether can be digital and local. Tell us what would pull people outside.",
      content: (
        <div className="grid gap-3 sm:grid-cols-2">
          {eventOptions.map((option) => (
            <OptionPill
              key={option}
              label={option}
              selected={form.events.includes(option)}
              onClick={() => update("events", toggleValue(form.events, option))}
            />
          ))}
        </div>
      ),
    },
    {
      eyebrow: "Expansion signal",
      title: "Where should BarterTogether go next?",
      helper: "Your city, campus, neighborhood, creative scene, or community hub.",
      content: (
        <div className="grid gap-5">
          <Field
            label="Expansion city"
            value={form.expansionCity}
            onChange={(value) => update("expansionCity", value)}
            placeholder="Your city, neighborhood, or campus"
          />
          <label className="block">
            <span className="text-sm font-black uppercase tracking-[0.12em] text-[#2563EB]">
              Anything we should know?
            </span>
            <textarea
              value={form.story}
              onChange={(event) => update("story", event.target.value)}
              placeholder="A trade you would make, a problem in your city, or why this matters to you."
              className="mt-3 min-h-32 w-full rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-4 text-base font-semibold text-[#0F172A] outline-none transition focus:shadow-[4px_4px_0_#A3E635]"
            />
          </label>
        </div>
      ),
    },
    {
      eyebrow: "Last thing",
      title: "Want updates after this?",
      helper:
        "Leave an email here, or use the main Sender waitlist on the landing page.",
      content: (
        <div className="grid gap-4">
          <Field
            label="Email"
            value={form.email}
            type="email"
            onChange={(value) => update("email", value)}
            placeholder="your.email@example.com"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {["yes", "not yet"].map((value) => (
              <OptionPill
                key={value}
                label={value === "yes" ? "Yes, keep me posted" : "Not right now"}
                selected={form.wantsUpdates === value}
                onClick={() => update("wantsUpdates", value)}
              />
            ))}
          </div>
          <Link
            href="/waitlist#waitlist"
            className="mx-auto inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#0F172A] shadow-[5px_5px_0_#A3E635] transition hover:-translate-y-1"
          >
            Or join the main waitlist
          </Link>
        </div>
      ),
    },
  ];

  const currentStep = stepContent[step];

  return (
    <section className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-4 text-center shadow-[12px_12px_0_#2563EB] sm:p-6 lg:min-h-[620px]">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="rounded-full border border-[#0F172A]/15 bg-[#F8F5F0] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#2563EB]">
          Question {step + 1} of {totalSteps}
        </p>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F172A]/50">
          Guided survey
        </p>
      </div>

      <div className="mb-10 h-3 overflow-hidden rounded-full border-2 border-[#0F172A] bg-[#F8F5F0]">
        <div
          className="h-full rounded-full bg-[#A3E635] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto flex min-h-[360px] max-w-3xl flex-col justify-center">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2563EB]">
          {currentStep.eyebrow}
        </p>
        <h2 className="mt-4 text-4xl font-black leading-none tracking-tight sm:text-6xl">
          {currentStep.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-8 text-[#0F172A]/70">
          {currentStep.helper}
        </p>
        <div className="mt-8">{currentStep.content}</div>
      </div>

      {message ? (
        <p
          className={`mx-auto mt-6 max-w-2xl rounded-lg border-2 px-4 py-3 text-sm font-black ${
            status === "success"
              ? "border-[#0F172A] bg-[#A3E635] text-[#0F172A]"
              : status === "error"
                ? "border-[#0F172A] bg-[#FDFCF9] text-[#0F172A]"
                : "border-[#2563EB] bg-[#F8F5F0] text-[#0F172A]"
          }`}
        >
          {message}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={previousStep}
          disabled={step === 0 || status === "submitting"}
          className="min-h-12 rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#0F172A] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#A3E635] disabled:cursor-not-allowed disabled:opacity-35"
        >
          Back
        </button>

        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className="min-h-12 rounded-lg border-2 border-[#0F172A] bg-[#2563EB] px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[5px_5px_0_#0F172A] transition hover:-translate-y-1"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={submitSurvey}
            disabled={status === "submitting" || status === "success"}
            className="min-h-12 rounded-lg border-2 border-[#0F172A] bg-[#2563EB] px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[5px_5px_0_#0F172A] transition hover:-translate-y-1 disabled:cursor-wait disabled:opacity-70"
          >
            {status === "submitting" ? "Sending..." : "Submit survey"}
          </button>
        )}
      </div>
    </section>
  );
}

export default function SurveyForm() {
  return <SurveyStepper />;
}

// Kept temporarily while the guided survey is being iterated.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LegacySurveyForm() {
  const [form, setForm] = useState<SurveyState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const completionCount = useMemo(() => {
    return [
      form.city,
      form.country,
      form.offers.length > 0 || form.otherOffer,
      form.needs.length > 0 || form.otherNeed,
      form.safety.length > 0,
      form.events.length > 0,
      form.expansionCity,
    ].filter(Boolean).length;
  }, [form]);

  const update = <Key extends keyof SurveyState>(
    key: Key,
    value: SurveyState[Key],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitSurvey = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Survey could not be saved yet.");
      }

      setStatus("success");
      setMessage(result.message || "Survey saved. Thank you for shaping this.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Survey could not be saved yet.",
      );
    }
  };

  return (
    <form onSubmit={submitSurvey} className="space-y-6">
      <div className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 shadow-[8px_8px_0_#2563EB] sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2563EB]">
              Community pulse
            </p>
            <h2 className="mt-2 text-3xl font-black leading-none">
              Tell us where BarterTogether should go next.
            </h2>
          </div>
          <p className="rounded-lg border-2 border-[#0F172A] bg-[#A3E635] px-4 py-2 text-sm font-black">
            {completionCount}/7 signals
          </p>
        </div>
      </div>

      <section className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 shadow-[8px_8px_0_rgba(15,23,42,0.9)] sm:p-6">
        <h3 className="text-2xl font-black">Where are you trading from?</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            label="City"
            value={form.city}
            required
            onChange={(value) => update("city", value)}
            placeholder="Toronto, Lagos, London..."
          />
          <Field
            label="Country"
            value={form.country}
            required
            onChange={(value) => update("country", value)}
            placeholder="Canada"
          />
          <Field
            label="Name"
            value={form.name}
            onChange={(value) => update("name", value)}
            placeholder="Optional"
          />
          <Field
            label="Email"
            value={form.email}
            type="email"
            onChange={(value) => update("email", value)}
            placeholder="Optional if you join the waitlist after"
          />
        </div>
        <label className="mt-4 block">
          <span className="text-sm font-black uppercase tracking-[0.12em] text-[#2563EB]">
            Age range
          </span>
          <select
            value={form.ageRange}
            onChange={(event) => update("ageRange", event.target.value)}
            className="mt-3 min-h-12 w-full rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-4 text-base font-semibold text-[#0F172A] outline-none transition focus:shadow-[4px_4px_0_#A3E635]"
          >
            <option value="">Choose one</option>
            <option value="Under 18">Under 18</option>
            <option value="18-24">18-24</option>
            <option value="25-34">25-34</option>
            <option value="35-44">35-44</option>
            <option value="45+">45+</option>
          </select>
        </label>
      </section>

      <section className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 shadow-[8px_8px_0_#A3E635] sm:p-6">
        <h3 className="text-2xl font-black">What could you offer?</h3>
        <p className="mt-3 font-semibold leading-7 text-[#0F172A]/70">
          Pick anything that feels possible. No need to be polished or
          professional.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {offerOptions.map((option) => (
            <OptionPill
              key={option}
              label={option}
              selected={form.offers.includes(option)}
              onClick={() => update("offers", toggleValue(form.offers, option))}
            />
          ))}
        </div>
        <div className="mt-4">
          <Field
            label="Something else"
            value={form.otherOffer}
            onChange={(value) => update("otherOffer", value)}
            placeholder="Tell us what else you could trade"
          />
        </div>
      </section>

      <section className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 shadow-[8px_8px_0_#2563EB] sm:p-6">
        <h3 className="text-2xl font-black">What would you trade for?</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {needOptions.map((option) => (
            <OptionPill
              key={option}
              label={option}
              selected={form.needs.includes(option)}
              onClick={() => update("needs", toggleValue(form.needs, option))}
            />
          ))}
        </div>
        <div className="mt-4">
          <Field
            label="Something else"
            value={form.otherNeed}
            onChange={(value) => update("otherNeed", value)}
            placeholder="What would make your life easier?"
          />
        </div>
      </section>

      <section className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 shadow-[8px_8px_0_rgba(15,23,42,0.9)] sm:p-6">
        <h3 className="text-2xl font-black">What would make trading feel safe?</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {safetyOptions.map((option) => (
            <OptionPill
              key={option}
              label={option}
              selected={form.safety.includes(option)}
              onClick={() => update("safety", toggleValue(form.safety, option))}
            />
          ))}
        </div>
      </section>

      <section className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 shadow-[8px_8px_0_#A3E635] sm:p-6">
        <h3 className="text-2xl font-black">What community moments should exist?</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {eventOptions.map((option) => (
            <OptionPill
              key={option}
              label={option}
              selected={form.events.includes(option)}
              onClick={() => update("events", toggleValue(form.events, option))}
            />
          ))}
        </div>
      </section>

      <section className="rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-5 shadow-[8px_8px_0_#2563EB] sm:p-6">
        <h3 className="text-2xl font-black">Put your city on the map.</h3>
        <div className="mt-5 grid gap-4">
          <Field
            label="Where should BarterTogether expand?"
            value={form.expansionCity}
            required
            onChange={(value) => update("expansionCity", value)}
            placeholder="Your city, neighborhood, or campus"
          />
          <label className="block">
            <span className="text-sm font-black uppercase tracking-[0.12em] text-[#2563EB]">
              Anything we should know?
            </span>
            <textarea
              value={form.story}
              onChange={(event) => update("story", event.target.value)}
              placeholder="A trade you would make, a problem in your city, or why this matters to you."
              className="mt-3 min-h-32 w-full rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] p-4 text-base font-semibold text-[#0F172A] outline-none transition focus:shadow-[4px_4px_0_#A3E635]"
            />
          </label>
          <fieldset>
            <legend className="text-sm font-black uppercase tracking-[0.12em] text-[#2563EB]">
              Want launch updates?
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {["yes", "not yet"].map((value) => (
                <label
                  key={value}
                  className={`rounded-lg border-2 p-4 text-sm font-black uppercase tracking-[0.08em] ${
                    form.wantsUpdates === value
                      ? "border-[#0F172A] bg-[#A3E635] shadow-[4px_4px_0_#0F172A]"
                      : "border-[#0F172A]/25 bg-[#FDFCF9]"
                  }`}
                >
                  <input
                    type="radio"
                    name="wantsUpdates"
                    value={value}
                    checked={form.wantsUpdates === value}
                    onChange={(event) => update("wantsUpdates", event.target.value)}
                    className="sr-only"
                  />
                  {value === "yes" ? "Yes, keep me posted" : "Not right now"}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      <section className="rounded-lg border-2 border-[#0F172A] bg-[#0F172A] p-5 text-[#FDFCF9] shadow-[8px_8px_0_#A3E635] sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h3 className="text-3xl font-black leading-none">
              Send the signal.
            </h3>
            <p className="mt-3 max-w-2xl font-semibold leading-7 text-[#FDFCF9]/80">
              Your answers help decide what gets built, which cities raise
              their hands, and what trust should look like from day one.
            </p>
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="min-h-12 rounded-lg border-2 border-[#FDFCF9] bg-[#2563EB] px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[5px_5px_0_#A3E635] transition hover:-translate-y-1 disabled:cursor-wait disabled:opacity-70"
          >
            {status === "submitting" ? "Sending..." : "Submit survey"}
          </button>
        </div>
        {message ? (
          <p
            className={`mt-5 rounded-lg border-2 px-4 py-3 text-sm font-black ${
              status === "success"
                ? "border-[#A3E635] bg-[#A3E635] text-[#0F172A]"
                : "border-white bg-white text-[#0F172A]"
            }`}
          >
            {message}
          </p>
        ) : null}
      </section>
    </form>
  );
}
