export const reconnectFields = [
  { name: "name", label: "Contact name", type: "text", required: true, maxLength: 120, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, maxLength: 254, autoComplete: "email" },
  { name: "phone", label: "Phone (optional)", type: "tel", required: false, maxLength: 40, autoComplete: "tel" },
  { name: "graduationYearOrYearsInvolved", label: "Graduation year or years involved (optional)", type: "text", required: false, maxLength: 120 },
  { name: "rolesOrProjects", label: "Roles or projects (optional)", type: "textarea", required: false, maxLength: 2000 },
  { name: "currentFieldOrg", label: "Current field or organization (optional)", type: "text", required: false, maxLength: 200 },
  { name: "historicalCorrections", label: "Historical corrections or stories (optional)", type: "textarea", required: false, maxLength: 4000 },
] as const;

export type ReconnectField = typeof reconnectFields[number]["name"];
export type ReconnectErrors = Partial<Record<ReconnectField | "website", string>>;

// Client validation only. The future intake service must independently validate all fields.
export function validateReconnect(data: FormData): ReconnectErrors {
  const errors: ReconnectErrors = {};
  for (const field of reconnectFields) {
    const value = String(data.get(field.name) ?? "").trim();
    if (field.required && !value) errors[field.name] = `Enter your ${field.name === "name" ? "name" : "email address"}.`;
    else if (value.length > field.maxLength) errors[field.name] = `Use ${field.maxLength} characters or fewer.`;
    else if (field.name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = "Enter a valid email address.";
    else if (field.name === "phone" && value && (!/^[+\d\s().x#-]+$/i.test(value) || value.replace(/\D/g, "").length < 7)) errors.phone = "Enter a valid phone number, including an area or country code.";
  }
  if (String(data.get("website") ?? "").trim()) errors.website = "Unable to process this form.";
  return errors;
}
