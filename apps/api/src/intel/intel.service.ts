import { Injectable } from '@nestjs/common';

@Injectable()
export class IntelService {
  getRedZones() {
    return [];
  }

  createRedZone(data: any) {
    return { id: crypto.randomUUID(), ...data };
  }
}
