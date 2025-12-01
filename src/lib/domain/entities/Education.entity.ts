/**
 * Domain Entity: Education
 * Represents an academic degree
 */
export class Education {
  constructor(
    public readonly id: number,
    public readonly degree: string,
    public readonly institution: string,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly location?: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.degree || this.degree.trim().length === 0) {
      throw new Error('Education degree is required');
    }
    if (!this.institution || this.institution.trim().length === 0) {
      throw new Error('Education institution is required');
    }
  }

  get duration(): string {
    return `${this.startDate} - ${this.endDate}`;
  }
}
