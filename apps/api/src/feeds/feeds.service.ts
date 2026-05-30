import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedsService {
  ingest(data: any) {
    // TODO: provider-agnostic FeedProvider interface (DJI, NASRDA, Planet Labs)
    return { received: true, ...data };
  }
}
