/**
 * Domain Entity: Reference
 * Represents a professional reference
 */
export class Reference {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly position: string,
    public readonly company: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly testimonial?: string,
    public readonly linkedinUrl?: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Reference name is required');
    }
    if (!this.email || !this.isValidEmail(this.email)) {
      throw new Error('Valid email is required');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get initials(): string {
    return this.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
