export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  currency: string;          // default 'USD'
  defaultSplit: 'equal' | 'exact' | 'percentage' | 'itemized';
  createdAt: Date;
  groupIds: string[];
  isPremium: boolean;
  premiumExpiresAt?: Date;
}
