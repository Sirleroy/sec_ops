import { RedZone, UserTier, Coordinates } from '@sec-ops/shared';

export function getMapboxStyle(tier: UserTier): string {
  if (tier >= UserTier.SECURITY) return 'mapbox://styles/mapbox/dark-v11';
  return 'mapbox://styles/mapbox/streets-v12';
}

// Tier 0 gets a circle (radius only). Tier 2+ gets the full polygon.
export function redZoneToGeoJSON(zone: RedZone, tier: UserTier) {
  if (tier >= UserTier.SECURITY && zone.polygon) {
    return {
      type: 'Feature',
      geometry: { type: 'Polygon', coordinates: [zone.polygon.map((c) => [c.lng, c.lat])] },
      properties: { id: zone.id, label: zone.label, severity: zone.severity },
    };
  }
  return {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [zone.center.lng, zone.center.lat] },
    properties: { id: zone.id, label: zone.label, severity: zone.severity, radiusMeters: zone.radiusMeters },
  };
}

export function distanceMeters(a: Coordinates, b: Coordinates): number {
  const R = 6_371_000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
