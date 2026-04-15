"use client";

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

export default function SurveyForm() {
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
