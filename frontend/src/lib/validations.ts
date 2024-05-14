export function validateRequired(v: string | undefined): boolean {
  return !!v && v.length > 0;
}
