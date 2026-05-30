export enum UserTier {
  PUBLIC = 0,
  OPERATOR = 1,
  SECURITY = 2,
  AGENCY = 3,
  ADMIN = 4,
}

export enum RideStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  EN_ROUTE = 'EN_ROUTE',
  ARRIVED = 'ARRIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

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
  radiusMeters: number;
  polygon?: Coordinates[];
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  createdAt: string;
  expiresAt?: string;
}
