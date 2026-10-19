"use client";

import { useActionState, useState } from "react";
import { sendMessage, type ContactState } from "@/app/actions";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { parseMessage, type MessageErrors } from "@/lib/message";

const fieldClass =
  "w-full border-b border-line bg-transparent py-2 outline-none transition-colors focus:border-foreground aria-invalid:border-red-500";

export function ContactForm({ lang, t }: { lang: Locale; t: Dictionary["contact"] }) {
  const [state, formAction, pending] = useActionState(sendMessage, { status: "idle" } as ContactState);
  const [clientErrors, setClientErrors] = useState<MessageErrors | null>(null);
  const [dismissed, setDismissed] = useState<ContactState | null>(null);

  const errors = clientErrors ?? state.errors ?? {};
  const hasErrors = Object.keys(errors).length > 0;

  if (state.status === "sent" && dismissed !== state) {
    return (
      <div role="status">
        <p>{t.sent}</p>
        <button
          type="button"
          onClick={() => setDismissed(state)}
          className="mt-3 cursor-pointer text-muted-foreground underline decoration-mark underline-offset-[5px] hover:decoration-current"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      toolname="send_message"
      tooldescription={t.tool}
      noValidate
      action={formAction}
      onSubmit={(event) => {
        const { errors: next } = parseMessage(new FormData(event.currentTarget));
        setClientErrors(next);
        if (Object.keys(next).length > 0) event.preventDefault();
      }}
      onInput={(event) => {
        // After a failed submit, re-check as the user types so fixed errors disappear.
        if (hasErrors) setClientErrors(parseMessage(new FormData(event.currentTarget)).errors);
      }}
      className="grid gap-8"
    >
      <input type="hidden" name="lang" value={lang} />
      {/* Honeypot: off-screen instead of display:none, so bots still see and fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="name" label={t.name} error={errors.name && t.errors[errors.name]}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            toolparamdescription="Name of the sender"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClass}
          />
        </Field>
        <Field id="email" label={t.email} error={errors.email && t.errors[errors.email]}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            toolparamdescription="Email address to reply to"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClass}
          />
        </Field>
      </div>
      <Field id="message" label={t.message} error={errors.message && t.errors[errors.message]}>
        <textarea
          id="message"
          name="message"
          rows={6}
          toolparamdescription="The message, at least 10 characters"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y`}
        />
      </Field>

      {state.status === "error" && state.error && (
        <p role="alert" className="text-red-600 dark:text-red-400">
          {t.errors[state.error]}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 cursor-pointer justify-self-start border border-foreground px-5 py-2 font-semibold transition-colors hover:bg-foreground hover:text-background disabled:opacity-60"
      >
        {pending ? t.sending : t.send}
      </button>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="text-muted-foreground">
        {label}:
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[15px] text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
