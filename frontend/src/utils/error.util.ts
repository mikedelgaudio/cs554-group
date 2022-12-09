export const validString = (string: string | undefined): boolean => {
  if (!string) return false;
  if (string.length === 0) return false;
  if (!string.trim().length) return false;

  return true;
};
