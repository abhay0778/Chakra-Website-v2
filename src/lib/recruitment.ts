export type RegistrationFormValues = {
  fullName: string;
  email: string;
  phone: string;
  usn: string;
  consent: boolean;
};

export type RegistrationFormErrors = Partial<Record<keyof RegistrationFormValues, string>>;

export const recruitmentConfig = {
  apiUrl: import.meta.env.VITE_RECRUITMENT_API_URL as string | undefined,
  apiKey: import.meta.env.VITE_RECRUITMENT_API_KEY as string | undefined,
  whatsappLink: (import.meta.env.VITE_WHATSAPP_COMMUNITY_LINK as string | undefined) ?? 'https://chat.whatsapp.com/BpNUHx1HB2pCQ514Nvjxdu',
  redirectDelayMs: Number(import.meta.env.VITE_RECRUITMENT_REDIRECT_DELAY_MS ?? 2500),
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s()\-]{8,20}$/;

export function validateRegistration(values: RegistrationFormValues): RegistrationFormErrors {
  const errors: RegistrationFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!phonePattern.test(values.phone.trim()) || values.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!values.usn.trim()) {
    errors.usn = 'USN is required.';
  }

  if (!values.consent) {
    errors.consent = 'Please confirm that the information is accurate and that you agree to be contacted.';
  }

  return errors;
}

export async function submitRegistration(payload: RegistrationFormValues) {
  if (!recruitmentConfig.apiUrl) {
    throw new Error(
      'The recruitment backend has not been configured yet. Set VITE_RECRUITMENT_API_URL in your environment and configure the Power Automate flow before testing.',
    );
  }

  const body = {
    fullName: payload.fullName.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    usn: payload.usn.trim(),
    consent: Boolean(payload.consent),
    source: 'team-chakra-recruitment-2026',
    submittedAt: new Date().toISOString(),
  };

  const response = await fetch(recruitmentConfig.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(recruitmentConfig.apiKey ? { 'x-api-key': recruitmentConfig.apiKey } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let message = 'The registration could not be saved. Please try again in a moment.';

    try {
      const parsed = await response.json();
      if (typeof parsed?.message === 'string' && parsed.message.trim()) {
        message = parsed.message;
      } else if (typeof parsed?.error === 'string' && parsed.error.trim()) {
        message = parsed.error;
      }
    } catch {
      // Ignore parse errors and keep the fallback message.
    }

    throw new Error(message);
  }

  let parsed: unknown;
  try {
    parsed = await response.json();
  } catch {
    return { success: true };
  }

  if (parsed && typeof parsed === 'object' && 'success' in parsed && parsed.success === false) {
    const message = 'message' in parsed && typeof parsed.message === 'string'
      ? parsed.message
      : 'The registration could not be saved.';
    throw new Error(message);
  }

  return parsed;
}
