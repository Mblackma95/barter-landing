"use client";

import { useEffect, useRef, useState } from "react";

export type LocationSelection = {
  id: string;
  label: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  longitude: number | null;
  latitude: number | null;
  featureType: string;
};

type Props = {
  value: string;
  onTextChange: (value: string) => void;
  onSelect: (location: LocationSelection) => void;
};

export default function LocationAutocomplete({
  value,
  onTextChange,
  onSelect,
}: Props) {
  const [results, setResults] = useState<LocationSelection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.trim().length < 2) {
      setResults([]);
      setMessage("");
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      setMessage("");

      try {
        const response = await fetch(
          `/api/locations?q=${encodeURIComponent(value.trim())}`,
        );
        const data = (await response.json()) as {
          results?: LocationSelection[];
          message?: string;
        };

        setResults(data.results || []);
        setMessage(data.message || "");
        setIsOpen(Boolean(data.results?.length));
      } catch {
        setResults([]);
        setMessage("Location search is unavailable right now.");
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [value]);

  return (
    <div className="relative text-left">
      <input
        type="text"
        value={value}
        onChange={(event) => onTextChange(event.target.value)}
        onFocus={() => setIsOpen(results.length > 0)}
        placeholder="Start typing your city or town"
        className="min-h-14 w-full rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] px-4 text-lg font-semibold text-[#0F172A] outline-none transition placeholder:text-[#0F172A]/35 focus:shadow-[5px_5px_0_#A3E635]"
      />
      {isLoading ? (
        <p className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-[#2563EB]">
          searching cities...
        </p>
      ) : null}
      {message ? (
        <p className="mt-2 text-sm font-semibold leading-6 text-[#0F172A]/65">
          {message}
        </p>
      ) : null}
      {isOpen ? (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-lg border-2 border-[#0F172A] bg-[#FDFCF9] shadow-[6px_6px_0_#2563EB]">
          {results.map((result) => (
            <button
              type="button"
              key={result.id}
              onClick={() => {
                onSelect(result);
                setIsOpen(false);
              }}
              className="block w-full border-b border-[#0F172A]/10 px-4 py-3 text-left text-sm font-black text-[#0F172A] transition last:border-b-0 hover:bg-[#A3E635]"
            >
              {result.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
