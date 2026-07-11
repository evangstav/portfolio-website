'use server';

import { Resend } from 'resend';
import { conductorDataEn } from '@/data/conductor.en';

export type ContactFormState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error';
      code: 'invalid' | 'unavailable';
      values: { name: string; email: string; message: string };
    };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: real users never see this field, so a value means a bot.
  // Answer success so the bot moves on instead of retrying.
  if (formData.get('company')) {
    return { status: 'success' };
  }

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  const values = { name, email, message };

  if (
    !name ||
    name.length > 200 ||
    email.length > 320 ||
    !EMAIL_RE.test(email) ||
    !message ||
    message.length > 5000
  ) {
    return { status: 'error', code: 'invalid', values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set');
    return { status: 'error', code: 'unavailable', values };
  }

  try {
    const resend = new Resend(apiKey);
    // Without a verified domain Resend only accepts its onboarding sender and
    // only delivers to the account owner's address. RESEND_EMAIL_DOMAIN names
    // a domain verified at resend.com/domains, which lifts both limits.
    const domain = process.env.RESEND_EMAIL_DOMAIN;
    const defaultFrom = domain
      ? `Website Contact <contact@${domain}>`
      : 'Portfolio Contact <onboarding@resend.dev>';
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? defaultFrom,
      to: process.env.CONTACT_TO_EMAIL ?? conductorDataEn.contactEmail,
      replyTo: email,
      subject: `Website contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error('Contact form: send failed', error);
      return { status: 'error', code: 'unavailable', values };
    }
  } catch (err) {
    console.error('Contact form: send threw', err);
    return { status: 'error', code: 'unavailable', values };
  }

  return { status: 'success' };
}
