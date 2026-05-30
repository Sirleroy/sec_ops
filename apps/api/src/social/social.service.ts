import { Injectable } from '@nestjs/common';

@Injectable()
export class SocialService {
  getFeed() {
    return [];
  }

  createPost(data: any) {
    return { id: crypto.randomUUID(), ...data };
  }
}
