import { Injectable } from '@nestjs/common';

export interface VehiclePosition {
  vehicleId: string;
  lat: number;
  lng: number;
  updatedAt: Date;
}

@Injectable()
export class TrackingService {
  // In-memory store — replaced with Redis in next phase
  private positions = new Map<string, VehiclePosition>();

  updatePosition(data: { vehicleId: string; lat: number; lng: number }): VehiclePosition {
    const position: VehiclePosition = { ...data, updatedAt: new Date() };
    this.positions.set(data.vehicleId, position);
    return position;
  }

  getPosition(vehicleId: string): VehiclePosition | undefined {
    return this.positions.get(vehicleId);
  }

  getAllPositions(): VehiclePosition[] {
    return Array.from(this.positions.values());
  }
}
