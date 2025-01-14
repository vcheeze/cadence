export function validateUsername(username: unknown): username is string {
	// Check if username is a string
	if (typeof username !== 'string') {
		return false;
	}
	/**
	 * Validates a username based on these criteria:
	 * - 3 to 20 characters long
	 * - Contains only alphanumeric characters, underscores, or hyphens
	 * - Does not start or end with a special character
	 */
	const usernamePattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9_-]{1,18}[a-zA-Z0-9])?$/;
	return usernamePattern.test(username);
}

export function validateEmail(email: unknown): email is string {
	// Check if email is a string
	if (typeof email !== 'string') {
		return false;
	}

	// Basic validation pattern for emails
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	// Check if email is empty or exceeds reasonable length
	if (!email || email.length > 254) {
		return false;
	}
	// Check if email matches pattern
	if (!emailPattern.test(email)) {
		return false;
	}
	// Additional checks
	const [localPart, domain] = email.split('@');
	// Local part should not exceed 64 characters
	if (localPart.length > 64) {
		return false;
	}
	// Domain should not exceed 255 characters
	if (domain.length > 255) {
		return false;
	}
	// Domain should not start or end with hyphen
	if (domain.startsWith('-') || domain.endsWith('-')) {
		return false;
	}

	return true;
}

export function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}
