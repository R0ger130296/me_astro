/**
 * Domain Entity: Certification
 * Represents a professional certification
 */
export class Certification {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly issuer?: string,
    public readonly image?: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Certification name is required');
    }
  }

  get isPdf(): boolean {
    return this.image?.endsWith('.pdf') ?? false;
  }

  get hasImage(): boolean {
    return !!this.image;
  }
}
