
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export function isValidEmail(use_email: string): boolean {
    return EMAIL_REGEX.test(use_email);
}