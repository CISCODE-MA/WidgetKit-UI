/**
 * Generate a compact page list for pagination controls.
 * Includes first/last pages and ellipses around the current.
 */
export function generatePageNumbers(current: number, total: number): (number | string)[] {
  const maxPagesToShow = 5;
  const pages: (number | string)[] = [];

  // If total is small, just show them all
  if (total <= maxPagesToShow) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Always show first page
  pages.push(1);

  // Determine start/end range near current
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  // Ellipses before start if needed
  if (start > 2) {
    pages.push('...');
  }

  // Range in the middle
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Ellipses after end if needed
  if (end < total - 1) {
    pages.push('...');
  }

  // Always show last page
  pages.push(total);

  return pages;
}
