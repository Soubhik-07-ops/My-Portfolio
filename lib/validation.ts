/**
 * Validates an email address with strict format checking
 */
export function isValidEmail(email: string): boolean {
    if (!email) return false;

    // Stricter regex that requires proper TLD
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check basic format
    if (!emailRegex.test(email)) return false;

    // Check for common fake patterns
    const fakePatterns = [
        /@example\./i,
        /@test\./i,
        /@fake\./i,
        /@git\.com$/i, // Catches abc@git.com
        /@local\./i,
        /@domain\./i,
        /@invalid\./i
    ];

    if (fakePatterns.some(pattern => pattern.test(email))) {
        return false;
    }

    // Check for disposable emails
    const disposableDomains = [
        'tempmail.com', 'mailinator.com', 'guerrillamail.com',
        '10minutemail.com', 'yopmail.com', 'throwawaymail.com'
    ];

    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain || disposableDomains.includes(domain)) return false;

    // Check for valid TLD (top-level domain)
    const validTlds = ['com', 'org', 'net', 'io', 'co', 'dev', 'tech']; // Add more as needed
    const tld = domain.split('.').pop()?.toLowerCase();
    if (!tld || !validTlds.includes(tld)) return false;

    return true;
}