const SALT_SIZE = 16; // bytes
const KEY_SIZE = 256; // bits
const ITERATIONS = 310000; // OWASP recommended minimum

function encodeBase64(buffer: ArrayBuffer): string {
	return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

// function decodeBase64(base64: string): ArrayBuffer {
// 	const binary = atob(base64);
// 	const bytes = new Uint8Array(binary.length);
// 	for (let i = 0; i < binary.length; i++) {
// 		bytes[i] = binary.charCodeAt(i);
// 	}
// 	return bytes.buffer;
// }

export function generateSalt() {
	const saltArray = crypto.getRandomValues(new Uint8Array(SALT_SIZE));
	return encodeBase64(saltArray.buffer);
}

export async function hash(password: string, salt: string): Promise<string> {
	const encoder = new TextEncoder();

	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		encoder.encode(password),
		{ name: 'PBKDF2' },
		false,
		['deriveBits']
	);

	const derivedBits = await crypto.subtle.deriveBits(
		{
			name: 'PBKDF2',
			salt: encoder.encode(salt),
			iterations: ITERATIONS,
			hash: 'SHA-256'
		},
		keyMaterial,
		KEY_SIZE
	);

	return `${salt}:${encodeBase64(derivedBits)}`;
}

export async function verify(password: string, storedHash: string) {
	const [salt, expectedHash] = storedHash.split(':');

	if (!salt || !expectedHash) {
		throw new Error('Invalid stored hash format');
	}

	const computedHash = await hash(password, salt);

	return storedHash === computedHash;
}

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
