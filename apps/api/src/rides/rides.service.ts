import { Injectable, NotFoundException } from '@nestjs/common';
import { RideStatus } from '@sec-ops/shared';

export interface Ride {
  id: string;
  userId: string;
  operatorId?: string;
  status: RideStatus;
  pickupLat: number;
  pickupLng: number;
  destLat: number;
  destLng: number;
  createdAt: Date;
}

@Injectable()
export class RidesService {
  // In-memory store — replaced with Prisma/DB in next phase
  private rides: Ride[] = [];

  async requestRide(dto: { userId: string; pickupLat: number; pickupLng: number; destLat: number; destLng: number }): Promise<Ride> {
    const ride: Ride = {
      id: crypto.randomUUID(),
      ...dto,
      status: RideStatus.PENDING,
      createdAt: new Date(),
    };
    this.rides.push(ride);
    return ride;
  }

  async findById(id: string): Promise<Ride> {
    const ride = this.rides.find((r) => r.id === id);
    if (!ride) throw new NotFoundException('Ride not found');
    return ride;
  }

  async cancel(id: string): Promise<Ride> {
    const ride = await this.findById(id);
    ride.status = RideStatus.CANCELLED;
    return ride;
  }
}
