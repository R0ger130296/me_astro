/**
 * Domain Entity: Experience
 * Represents a work experience in the portfolio
 */
export class Experience {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly company: string,
    public readonly location: string,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly responsibilities: string[]
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.title || this.title.trim().length === 0) {
      throw new Error('Experience title is required');
    }
    if (!this.company || this.company.trim().length === 0) {
      throw new Error('Experience company is required');
    }
    if (this.responsibilities.length === 0) {
      throw new Error('Experience must have at least one responsibility');
    }
  }

  get duration(): string {
    return `${this.startDate} - ${this.endDate}`;
  }

  get isCurrent(): boolean {
    return this.endDate.toLowerCase() === 'present' || 
           this.endDate.toLowerCase() === 'actual';
  }
}
