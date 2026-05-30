import { Injectable } from '@nestjs/common';

@Injectable()
export class AlertsService {
  broadcast(data: any) {
    // TODO: FCM + Socket.io broadcast
    return { queued: true, ...data };
  }
}
