"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setStatus("");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("Message received. I'll reply within two working days.");
    reset();
  };

  /* ── Step 12: Heading — scale + blur ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { scale: 0.9, opacity: 0, filter: "blur(8px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, headingRef.current!);

    return () => ctx.revert();
  }, []);

  /* ── Step 13: Form inputs animate in sequentially ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !formRef.current) return;

    const fields = formRef.current.querySelectorAll("[data-field]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fields,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, formRef.current);

    return () => ctx.revert();
  }, []);

  /* ── Step 15: Submit button click scale spring ── */
  const handleBtnClick = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !btnRef.current) return;

    gsap.fromTo(
      btnRef.current,
      { scale: 0.97 },
      { scale: 1, duration: 0.25, ease: "elastic.out(1, 0.5)" }
    );
  };

  return (
    <section
      id="contact"
      className="relative bg-canvas-light px-12 py-24 text-on-light overflow-hidden max-md:px-6 max-md:py-16"
    >
      <div className="section-watermark section-watermark--light" aria-hidden="true">Contact</div>
      <div className="relative z-[1] mx-auto max-w-[640px] text-center">
        {/* Heading — scale + blur reveal */}
        <div ref={headingRef} style={{ opacity: 0 }}>
          <div className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
            Let&rsquo;s build something
          </div>
          <h2 className="mt-4 font-display text-[44px] font-semibold uppercase leading-[0.95] tracking-[-0.5px] text-on-light md:text-[56px] lg:text-[80px]">
            Ready when you are.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Tell me about the problem you&rsquo;re solving. I read every message
            and reply within two working days.
          </p>
        </div>

        <form
          ref={formRef}
          className="mt-12 flex flex-col gap-4 text-left"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div data-field className="flex flex-col gap-1" style={{ opacity: 0 }}>
            <input
              type="text"
              placeholder="Name"
              aria-invalid={!!errors.name}
              className={clsx(
                "contact-input h-12 w-full border bg-surface-soft px-4 text-sm text-on-light transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_rgba(218,41,28,0.1)] focus:outline-none",
                errors.name
                  ? "border-primary bg-[#fff5f3]"
                  : "border-hairline-light"
              )}
              {...register("name", {
                required: "Please enter your name.",
                minLength: { value: 2, message: "Name is too short." },
              })}
            />
            {errors.name && (
              <span className="text-xs tracking-[0.02em] text-primary">
                {errors.name.message}
              </span>
            )}
          </div>

          <div data-field className="flex flex-col gap-1" style={{ opacity: 0 }}>
            <input
              type="email"
              placeholder="Email"
              aria-invalid={!!errors.email}
              className={clsx(
                "contact-input h-12 w-full border bg-surface-soft px-4 text-sm text-on-light transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_rgba(218,41,28,0.1)] focus:outline-none",
                errors.email
                  ? "border-primary bg-[#fff5f3]"
                  : "border-hairline-light"
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

          <div data-field className="flex flex-col gap-1" style={{ opacity: 0 }}>
            <textarea
              placeholder="Tell me about your project — scope, timeline, what's stuck."
              rows={4}
              aria-invalid={!!errors.message}
              className={clsx(
                "contact-input min-h-[132px] w-full resize-y border bg-surface-soft px-4 py-[14px] text-sm leading-relaxed text-on-light transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_rgba(218,41,28,0.1)] focus:outline-none",
                errors.message
                  ? "border-primary bg-[#fff5f3]"
                  : "border-hairline-light"
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

          {/* Submit button with shine sweep + click spring */}
          <button
            ref={btnRef}
            type="submit"
            className="submit-btn relative inline-flex h-12 w-full items-center justify-center overflow-hidden bg-primary text-sm font-bold uppercase tracking-[1.4px] text-white transition-colors hover:bg-primary-active disabled:opacity-60"
            disabled={isSubmitting}
            onClick={handleBtnClick}
          >
            {isSubmitting ? "Sending…" : "Send Message"}
          </button>

          {status && isSubmitSuccessful && (
            <div className="mt-2 text-center text-[13px] text-[#03904a]">
              {status}
            </div>
          )}
        </form>

        <div className="mt-12 text-left">
          <div className="flex items-center justify-between border-t border-hairline-light py-4 text-sm">
            <span className="text-body">Email</span>
            <a
              href="mailto:vinamrabhonsle@gmail.com"
              className="font-medium text-on-light transition-colors hover:text-primary"
            >
              vinamrabhonsle@gmail.com
            </a>
          </div>
          <div className="flex items-center justify-between border-t border-hairline-light py-4 text-sm">
            <span className="text-body">GitHub</span>
            <a
              href="https://github.com/vinamra1102"
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-on-light transition-colors hover:text-primary"
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
              className="font-medium text-on-light transition-colors hover:text-primary"
            >
              linkedin.com/in/vinamra-bhonsle
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
