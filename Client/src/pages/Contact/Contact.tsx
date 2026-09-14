import { useState, type FormEvent } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/section-label";
import { sendContactMessage } from "@/lib/contact.api";
import "./Contact.scss";

function FloatingField({
  label,
  name,
  type,
  required,
  disabled,
  onInput,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  disabled?: boolean;
  onInput?: (event: FormEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="floating-field">
      <input
        name={name}
        type={type}
        placeholder=" "
        required={required}
        disabled={disabled}
        onInput={onInput}
      />
      <span>{label}</span>
    </label>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldInput = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (event.currentTarget as HTMLInputElement | HTMLTextAreaElement).setCustomValidity("");
    if (sent) setSent(false);
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement | null;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const messageInput = form.elements.namedItem("message") as HTMLTextAreaElement | null;

    // Clear any prior custom validity messages
    nameInput?.setCustomValidity("");
    emailInput?.setCustomValidity("");
    messageInput?.setCustomValidity("");

    const name = nameInput?.value.trim() ?? "";
    const email = emailInput?.value.trim() ?? "";
    const message = messageInput?.value.trim() ?? "";

    let hasValidationError = false;

    if (!name) {
      nameInput?.setCustomValidity("Please enter your name.");
      hasValidationError = true;
    }

    if (!email) {
      emailInput?.setCustomValidity("Please enter your email address.");
      hasValidationError = true;
    }

    if (!message) {
      messageInput?.setCustomValidity("Please enter a message.");
      hasValidationError = true;
    }

    if (hasValidationError || !form.reportValidity()) {
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await sendContactMessage({ name, email, message });
      toast.success(response.message || "Message sent successfully!");
      setSent(true);
      form.reset();
    } catch (error: unknown) {
      let errorMessage = "Failed to send message. Please try again later.";
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.code === "ERR_NETWORK" || !error.response) {
          errorMessage = "Unable to connect to the server. Please check your network connection.";
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-wrap scroll-reveal reveal-plain border-b border-border/40 pb-12"
      aria-labelledby="contact-title"
    >
      <div className="contact-panel grid gap-14 p-6 sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:p-14">
        <div>
          <div className="reveal-up">
            <SectionLabel number="06" label="Contact" />
          </div>
          <h2 id="contact-title" className="section-title reveal-up d-1">
            Let’s build something dependable.
          </h2>
          <p className="reveal-up d-2 mt-6 max-w-md text-base leading-7 text-muted-foreground">
            Have a product challenge, a role, or an idea worth exploring? I’d like to hear about it.
          </p>
          <div className="reveal-up d-3 mt-9 flex flex-wrap gap-3">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=surya86104@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-border bg-secondary/50 px-4 py-3 text-sm transition-colors hover:border-primary/60"
            >
              <Mail className="size-4 text-primary" />
              surya86104@gmail.com
            </a>
            <a
              href="https://wa.me/918903091256"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-border bg-secondary/50 px-4 py-3 text-sm transition-colors hover:border-primary/60"
            >
              <MessageCircle className="size-4 text-primary" />
              +91 89030 91256
            </a>
          </div>
          <div className="reveal-up d-4 mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="pulse-dot" />
            Available for the right opportunity
          </div>
        </div>
        <form
          onSubmit={submitContact}
          className="reveal-zoom d-2 grid gap-5"
          aria-label="Contact form"
        >
          <FloatingField
            label="Your name"
            name="name"
            type="text"
            required
            disabled={isSubmitting}
            onInput={handleFieldInput}
          />
          <FloatingField
            label="Email address"
            name="email"
            type="email"
            required
            disabled={isSubmitting}
            onInput={handleFieldInput}
          />
          <label className="floating-field">
            <textarea
              name="message"
              placeholder=" "
              rows={5}
              required
              disabled={isSubmitting}
              onInput={handleFieldInput}
            />
            <span>Tell me about your project</span>
          </label>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="h-13 rounded-full sm:justify-self-start"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Sending message...
              </>
            ) : sent ? (
              <>
                <CheckCircle2 /> Message ready
              </>
            ) : (
              <>
                Send message <Send />
              </>
            )}
          </Button>
          {sent && (
            <p role="status" className="text-sm text-primary">
              Thanks — I’ll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
