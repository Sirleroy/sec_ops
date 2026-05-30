// Access tiers — mirrors CLAUDE.md user roles
export enum UserTier {
  PUBLIC = 0,       // Commuters
  OPERATOR = 1,     // Drivers
  SECURITY = 2,     // Security personnel in vehicles
  AGENCY = 3,       // Police, Military, Civil Defence, etc.
  ADMIN = 4,        // Platform admin / command
}

// Ride lifecycle
export enum RideStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  EN_ROUTE = 'EN_ROUTE',
  ARRIVED = 'ARRIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// Alert types
export enum AlertType {
  AMBER = 'AMBER',
  RED_ZONE = 'RED_ZONE',
  EMERGENCY = 'EMERGENCY',
  BROADCAST = 'BROADCAST',
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AlertPayload {
  id: string;
  type: AlertType;
  title: string;
  body: string;
  coords?: Coordinates;
  radiusMeters?: number;
  targetTiers: UserTier[];
  createdAt: string;
}

export interface RideRequest {
  userId: string;
  pickup: Coordinates;
  destination: Coordinates;
}

export interface RedZone {
  id: string;
  label: string;
  center: Coordinates;
  radiusMeters: number;       // Tier 0 sees radius only
  polygon?: Coordinates[];    // Tier 2+ sees full polygon
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  createdAt: string;
  expiresAt?: string;
}
