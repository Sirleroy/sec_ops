import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { TrackingService } from './tracking.service';

@WebSocketGateway({ cors: true, namespace: '/tracking' })
export class TrackingGateway {
  constructor(private readonly trackingService: TrackingService) {}

  @SubscribeMessage('position:update')
  handlePositionUpdate(
    @MessageBody() data: { vehicleId: string; lat: number; lng: number },
    @ConnectedSocket() client: Socket,
  ) {
    return this.trackingService.updatePosition(data);
  }
}
