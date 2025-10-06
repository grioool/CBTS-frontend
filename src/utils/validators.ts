export function validateUsername(v: string) {
    const value = v.trim();
    if (value.length < 3) return "Username must be at least 3 characters";
    if (value.length > 32) return "Username must be at most 32 characters";
    if (!/^[A-Za-z0-9_]+$/.test(value))
        return "Only letters, numbers and underscores";
    return "";
}

export function validateEmail(v: string) {
    const value = v.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email";
    return "";
}

export function validatePassword(v: string) {
    if (v.length < 8) return "Password must be at least 8 characters";
    if (!/[a-z]/.test(v)) return "Add a lowercase letter";
    if (!/[A-Z]/.test(v)) return "Add an uppercase letter";
    if (!/[0-9]/.test(v)) return "Add a number";
    if (!/[^A-Za-z0-9]/.test(v)) return "Add a special character";
    return "";
}
