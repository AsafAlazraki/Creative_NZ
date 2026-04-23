'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
type Step = 0 | 1 | 2 | 3 | 4;

type WizardGrant = {
  id: string;
  name: string;
  amountMin: number;
  amountMax: number;
  amountDisplay: string;
  pool: string;
};

export function GrantWizard({ grants }: { grants: WizardGrant[] }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState({
    purpose: '',
    who: '',
    cultural: '',
    budget: '',
  });

  const matches = grants
    .filter((g) => {
      if (answers.cultural === 'pacific' && g.pool !== 'pacific') return false;
      if (answers.budget === 'under_10k' && g.amountMin > 10000) return false;
      if (answers.budget === '10k_50k' && (g.amountMax < 10000 || g.amountMin > 50000)) return false;
      if (answers.budget === '50k_125k' && (g.amountMax < 50000 || g.amountMin > 125000)) return false;
      if (answers.budget === '125k_500k' && (g.amountMax < 125000 || g.amountMin > 500000)) return false;
      if (answers.who === 'individual' && g.pool === 'general' && g.amountMax > 100000) return false;
      return true;
    })
    .slice(0, 5);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-md px-5 py-3 text-sm font-semibold"
        style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
      >
        What do I qualify for? →
      </button>
    );
  }

  return (
    <div
      className="rounded-xl border p-5 md:p-6"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
          Step {Math.min(step + 1, 4)} of 4
        </div>
        <button
          onClick={() => {
            setOpen(false);
            setStep(0);
            setAnswers({ purpose: '', who: '', cultural: '', budget: '' });
          }}
          className="rounded-md p-1.5 hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
          aria-label="Close wizard"
        >
          <Icon name="x" size={16} />
        </button>
      </div>

      {step === 0 && (
        <Question
          title="What are you applying for?"
          options={[
            { v: 'project', label: 'A specific project' },
            { v: 'org', label: 'Organisational funding' },
            { v: 'residency', label: 'A residency' },
            { v: 'development', label: 'Early career development' },
          ]}
          onPick={(v) => {
            setAnswers({ ...answers, purpose: v });
            setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <Question
          title="Who are you applying as?"
          options={[
            { v: 'individual', label: 'Individual artist' },
            { v: 'collective', label: 'Arts group or collective' },
            { v: 'org', label: 'Registered organisation' },
          ]}
          onPick={(v) => {
            setAnswers({ ...answers, who: v });
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <Question
          title="Cultural affiliation?"
          options={[
            { v: 'pacific', label: 'Pacific arts — Pasifika-led' },
            { v: 'ngatoi', label: 'Ngā Toi Māori' },
            { v: 'general', label: 'General arts' },
            { v: 'multiple', label: 'Multiple / cross-cultural' },
          ]}
          onPick={(v) => {
            setAnswers({ ...answers, cultural: v });
            setStep(3);
          }}
        />
      )}
      {step === 3 && (
        <Question
          title="Budget range?"
          options={[
            { v: 'under_10k', label: 'Under $10k' },
            { v: '10k_50k', label: '$10k – $50k' },
            { v: '50k_125k', label: '$50k – $125k' },
            { v: '125k_500k', label: '$125k – $500k' },
            { v: 'over_500k', label: 'Over $500k' },
          ]}
          onPick={(v) => {
            setAnswers({ ...answers, budget: v });
            setStep(4);
          }}
        />
      )}
      {step === 4 && (
        <div>
          <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
            Matches for you
          </div>
          <h3 className="mt-1 font-display text-xl font-semibold">
            {matches.length} grant{matches.length === 1 ? '' : 's'} to look at.
          </h3>
          <ul className="mt-4 space-y-3">
            {matches.map((g) => (
              <li key={g.id}>
                <Link
                  href={`/grants/${g.id}`}
                  className="block rounded-lg border p-3 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  <div className="font-semibold">{g.name}</div>
                  <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                    {g.amountDisplay}
                  </div>
                </Link>
              </li>
            ))}
            {matches.length === 0 && (
              <li
                className="rounded-md border p-4 text-sm italic"
                style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}
              >
                Nothing matches exactly — book a kōrero with a Practice Adviser; they will find you
                the right door.
              </li>
            )}
          </ul>
          <button
            onClick={() => {
              setStep(0);
              setAnswers({ purpose: '', who: '', cultural: '', budget: '' });
            }}
            className="mt-4 text-sm underline"
            style={{ color: 'var(--ink-muted)' }}
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}

function Question({
  title,
  options,
  onPick,
}: {
  title: string;
  options: { v: string; label: string }[];
  onPick: (v: string) => void;
}) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <div className="mt-4 grid gap-2">
        {options.map((o) => (
          <button
            key={o.v}
            onClick={() => onPick(o.v)}
            className="flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <span>{o.label}</span>
            <Icon name="chevron-right" size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}
