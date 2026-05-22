"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormValues>({ mode: "onBlur" });

  const [status, setStatus] = useState<string>("");

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setStatus("");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("Message received. I'll reply within two working days.");
    reset();
  };

  return (
    <section id="contact" className="bg-canvas-light px-12 py-24 text-on-light max-md:px-6 max-md:py-16">
      <div className="mx-auto max-w-[640px] text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
          Let&rsquo;s build something
        </div>
        <h2 className="mt-4 font-display text-[44px] font-black uppercase leading-[0.95] tracking-[-1.4px] text-on-light md:text-[56px] lg:text-[80px] lg:tracking-[-2px]">
          Ready when you are.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Tell me about the problem you&rsquo;re solving. I read every message and reply
          within two working days.
        </p>

        <form
          className="mt-12 flex flex-col gap-4 text-left"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Name"
              aria-invalid={!!errors.name}
              className={clsx(
                "h-12 w-full border bg-surface-soft px-4 text-sm text-on-light transition-colors focus:border-primary focus:outline-none",
                errors.name ? "border-primary bg-[#fff5f3]" : "border-hairline-light"
              )}
              {...register("name", {
                required: "Please enter your name.",
                minLength: { value: 2, message: "Name is too short." },
              })}
            />
            {errors.name && (
              <span className="text-xs tracking-[0.02em] text-primary">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="email"
              placeholder="Email"
              aria-invalid={!!errors.email}
              className={clsx(
                "h-12 w-full border bg-surface-soft px-4 text-sm text-on-light transition-colors focus:border-primary focus:outline-none",
                errors.email ? "border-primary bg-[#fff5f3]" : "border-hairline-light"
              )}
              {...register("email", {
                required: "Please enter your email.",
                pattern: {
                  value: EMAIL_RE,
                  message: "That doesn't look like an email.",
                },
              })}
            />
            {errors.email && (
              <span className="text-xs tracking-[0.02em] text-primary">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <textarea
              placeholder="Tell me about your project — scope, timeline, what's stuck."
              rows={4}
              aria-invalid={!!errors.message}
              className={clsx(
                "min-h-[132px] w-full resize-y border bg-surface-soft px-4 py-[14px] text-sm leading-relaxed text-on-light transition-colors focus:border-primary focus:outline-none",
                errors.message ? "border-primary bg-[#fff5f3]" : "border-hairline-light"
              )}
              {...register("message", {
                required: "Please add a short message.",
                minLength: {
                  value: 10,
                  message: "Tell me a little more — at least 10 characters.",
                },
              })}
            />
            {errors.message && (
              <span className="text-xs tracking-[0.02em] text-primary">
                {errors.message.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center bg-primary text-sm font-bold uppercase tracking-[1.4px] text-white transition-colors hover:bg-primary-active disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending…" : "Send Message"}
          </button>

          {status && isSubmitSuccessful && (
            <div className="mt-2 text-center text-[13px] text-[#03904a]">{status}</div>
          )}
        </form>

        <div className="mt-12 text-left">
          <div className="flex items-center justify-between border-t border-hairline-light py-4 text-sm">
            <span className="text-body">Email</span>
            <a href="mailto:vinamrabhonsle@gmail.com" className="font-medium text-on-light hover:text-primary transition-colors">
              vinamrabhonsle@gmail.com
            </a>
          </div>
          <div className="flex items-center justify-between border-t border-hairline-light py-4 text-sm">
            <span className="text-body">GitHub</span>
            <a
              href="https://github.com/vinamra1102"
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-on-light hover:text-primary transition-colors"
            >
              github.com/vinamra1102
            </a>
          </div>
          <div className="flex items-center justify-between border-b border-t border-hairline-light py-4 text-sm">
            <span className="text-body">LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/vinamra-bhonsle-b2b569219/"
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-on-light hover:text-primary transition-colors"
            >
              linkedin.com/in/vinamra-bhonsle
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
