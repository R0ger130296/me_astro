/**
 * Domain Entity: PersonalInfo
 * Represents personal portfolio information
 */
export class PersonalInfo {
  constructor(
    public readonly name: string,
    public readonly title: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly location: string,
    public readonly summary: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!this.email || !this.isValidEmail(this.email)) {
      throw new Error('Valid email is required');
    }
    if (!this.summary || this.summary.trim().length === 0) {
      throw new Error('Summary is required');
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
