/** Shared avatar utilities used by DropdownMessage and DropdownUser */

export const AVATAR_GRADIENTS = [
  'from-[#667EEA] to-[#764BA2]',
  'from-[#F093FB] to-[#F5576C]',
  'from-[#4FACFE] to-[#00F2FE]',
  'from-[#43E97B] to-[#38F9D7]',
  'from-[#FA709A] to-[#FEE140]',
  'from-[#A18CD1] to-[#FBC2EB]',
] as const;

/** Pick a deterministic gradient from a name using its first code point */
export function pickGradient(name: string): string {
  const cp = name.codePointAt(0) ?? 0;
  return AVATAR_GRADIENTS[cp % AVATAR_GRADIENTS.length];
}

/** Derive two-letter initials from a full name */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : name.slice(0, 2).toUpperCase();
}
