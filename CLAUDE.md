# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: SecOps Intelligence Transport Platform

A dual-purpose platform combining a ride-hailing service (Uber/Bolt-style) with a real-time security intelligence sharing network. Designed for Nigeria, serving civilian commuters and multi-agency security operators simultaneously, with layered access tiers.

---

## User Roles & Access Tiers

| Tier | Role | Access |
|------|------|--------|
| 0 | Public / Commuters | Ride booking, coarse red-zone map view, incident upload, Amber alerts |
| 1 | Operators (Drivers) | Ride management, real-time tracking dashboard, incident report |
| 2 | Security Personnel (in vehicles) | Intelligence feed, red-zone overlays, field comms |
| 3 | Security Agencies (Police, Military branches, Civil Defence, Vigilante, Hunters, Forest Guards, Private Security) | Full intel sharing, drone/satellite feed, command view |
| 4 | Admin / Command | Platform management, feed control, alert broadcasting |

Red-zone data is coarse-grained (radius only) for Tier 0; full polygon data for Tier 2+.

---

## Tech Stack

### Applications
| App | Technology |
|-----|-----------|
| Mobile (User + Operator) | React Native + Expo |
| Web (Agency Dashboard + Admin) | Next.js (React, SSR) |
| Backend API | NestJS (Node.js + TypeScript) |

### Data & Real-time
| Layer | Technology | Purpose |
|-------|-----------|---------|
| Primary DB | PostgreSQL + PostGIS | Geospatial: red zones, vehicle positions, geofencing |
| Cache / Pub-Sub | Redis | Real-time ride state, alert broadcasts, session cache |
| Real-time transport | Socket.io | Live GPS tracking, alerts, intel feed, in-app chat |

### Services
| Service | Provider | Purpose |
|---------|---------|---------|
| File & media storage | Cloudflare R2 | Incident photos/video, satellite snapshots, driver docs (no egress fees) |
| Maps | Mapbox | Custom red-zone overlays, offline tile packs, proximity queries |
| Livestreaming | Agora.io | Field operator and commuter livestreams; Africa CDN nodes |
| Payments | Paystack | Cards, bank transfer, USSD, mobile money; veteran discounts |
| Push notifications | Firebase Cloud Messaging | Amber alerts, ride updates, mass broadcasts |
| Bluetooth mesh | Bridgefy SDK | Peer-to-peer comms beyond telecom coverage (Phase 3) |
| Identity verification | NIMC API (NIN) | Security personnel onboarding |
| Financial identity | Paystack BVN API | Ride payment identity |

### Infrastructure
| Tool | Role |
|------|------|
| AWS af-south-1 (Cape Town) | Closest AWS region to Nigeria; hosts API, DB, Redis |
| Docker + Compose | Local development environment |
| GitHub Actions | CI/CD pipeline |
| Nginx | Reverse proxy, SSL termination |
| Turborepo | Monorepo build orchestration |

---

## Monorepo Structure

```
sec_ops/
├── apps/
│   ├── mobile/          # React Native + Expo (user & operator build flavors)
│   ├── api/             # NestJS backend
│   └── dashboard/       # Next.js agency/admin web dashboard
├── packages/
│   ├── shared/          # Shared TypeScript types, constants (AlertPayload, RideRequest, RedZone, etc.)
│   └── maps/            # Mapbox config, red-zone overlay utilities
└── infra/               # Docker, Nginx, CI/CD, deployment configs
```

---

## Backend Module Structure (NestJS)

```
apps/api/src/
├── auth/          # JWT auth, RBAC guards, NIN/BVN verification
├── rides/         # Booking, dispatch, driver assignment, ride lifecycle
├── intel/         # Intelligence reports, red-zone CRUD, feed ingestion
├── alerts/        # Amber alerts, emergency broadcasts, Socket.io events
├── media/         # Upload handling, R2 storage, Agora token generation
├── tracking/      # Real-time GPS updates, vehicle state via Redis
├── feeds/         # Drone/satellite feed ingestion (provider-agnostic interface)
├── social/        # Text/audio/photo/video posts, comments, livestream metadata
├── game/          # Treasure hunt: hidden locations, discovery events, leaderboard
└── users/         # User profiles, veteran status, role management
```

---

## Core Data Flows

**Ride flow**
User requests ride → nearest available operator vehicle dispatched (PostGIS proximity query) → GPS position streamed via Socket.io → ride completed → Paystack charge

**Alert flow**
Any tier uploads incident → classified/moderated → pushed to relevant tiers as red-zone update or Amber alert via FCM + Socket.io broadcast

**Intel flow**
Tier 3 agency pushes satellite/drone feed → ingested via `feeds/` module → overlaid on Mapbox map for Tier 2+ operators in affected zones

**Bluetooth flow**
Device acts as relay node when off-grid → messages hop peer-to-peer (Bridgefy) → re-enter backend when a relay node regains connectivity

---

## Build Phases

### Phase 1 — Transport Core
Ride booking, GPS tracking, driver/user apps, Paystack payments, role-based auth (Tiers 0–1), basic Mapbox map. Veteran/military discount logic.

### Phase 2 — Intelligence Layer
Red-zone overlays, incident uploads (photo/video/text), alert broadcasting (FCM + Socket.io), agency access tiers (2–4), web dashboard for command view, NIN verification for security personnel.

### Phase 3 — Advanced Feeds & Mesh Comms
Drone/satellite feed ingestion via provider-agnostic `FeedProvider` interface (DJI, NASRDA, Planet Labs). Bridgefy Bluetooth mesh integration. Agora livestreaming from field.

### Phase 4 — Social & Gamification
Full social feed (posts, comments, audio/video). Treasure hunt mode: hidden location discovery, Pokémon GO-style, tourist spot tagging.

---

## Nigeria-Specific Considerations

- **Connectivity**: Design for intermittent 2G/3G. Socket.io auto-reconnect is essential. Mapbox offline tile packs for low-signal areas.
- **Payments**: Paystack only (no Stripe direct). Support USSD payment flow for users without smartphones.
- **Android-first**: Android dominates Nigerian smartphone market. iOS is secondary.
- **Data cost**: Minimize payload sizes. Compress media before upload. Lazy-load map tiles.
- **Identity**: NIN (NIMC) for security personnel. BVN for financial identity.
- **Drone/satellite**: Initial partnership targets are NASRDA (Nigerian Space Agency), DJI, Planet Labs.

---

## Development Commands

_Populated as the project is scaffolded._

```bash
# Install all dependencies
npm install

# Run API (NestJS)
npm run dev --workspace=apps/api

# Run mobile app
npm run start --workspace=apps/mobile

# Run web dashboard
npm run dev --workspace=apps/dashboard

# Run all tests
npm test

# Run a single test file
npx jest apps/api/src/rides/rides.service.spec.ts
```

---

## Security Notes

- All intelligence data above Tier 0 is encrypted in transit (TLS) and at rest (AES-256)
- Drone/satellite feed endpoints require Tier 3 token + IP allowlist
- Bridgefy mesh messages use encrypted envelopes — raw intel payloads are never exposed at relay nodes
- Red-zone coordinates are coarse-grained (radius only) for Tier 0; full polygon for Tier 2+
- Operator and user auth flows are separate with distinct JWT scopes
