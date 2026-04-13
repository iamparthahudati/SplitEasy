export interface Group {
  id: string;
  name: string;
  emoji: string;
  color: string;
  memberNames: string[];     // plain names — no account needed for members
  createdBy: string;         // userId
  createdAt: Date;
  archived: boolean;
  currency: string;          // 'USD', 'EUR', etc.
}
