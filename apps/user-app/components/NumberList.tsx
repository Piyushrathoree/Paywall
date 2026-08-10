"use client";

import { useEffect, useState } from "react";

interface NumberListProps {
  number: string;
  onSelect: (value: string) => void;
}

export function NumberList({ number, onSelect }: NumberListProps) {
  const [filteredNumbers, setFilteredNumbers] = useState<{ number: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const input = number.replace(/\D/g, "");
    if (!input) {
      setFilteredNumbers([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/numbers?search=${encodeURIComponent(input)}`);
        if (!response.ok) throw new Error("Could not search");
        const data = (await response.json()) as { numbers?: { number: string }[] };
        setFilteredNumbers(data.numbers ?? []);
      } catch {
        setFilteredNumbers([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [number]);

  if (!number || (!loading && !filteredNumbers.length)) return null;

  return (
    <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-xl border border-[#dfe6d9] bg-white p-1 shadow-xl shadow-[#163300]/10">
      {loading ? <p className="px-3 py-2 text-xs text-[#7b8577]">Searching contacts…</p> : null}
      {filteredNumbers.map(({ number: candidate }) => (
        <button
          key={candidate}
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSelect(candidate)}
          className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-[#354030] transition hover:bg-[#eef7e8] hover:text-[#163300]"
        >
          {candidate}
        </button>
      ))}
    </div>
  );
}
