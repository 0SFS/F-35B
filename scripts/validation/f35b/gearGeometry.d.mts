/** Types for `gearGeometry.mjs`, which fly's F-35B gear tests import as `@0sfs/f-35b/validation/gearGeometry`. */
import type { TransformNode, Vector3 } from "@babylonjs/core";

export const F35B_SKIN_NAMES: readonly string[];

export interface SkinTriangle {
  name: string;
  a: Vector3;
  b: Vector3;
  c: Vector3;
}

export interface SkinHit {
  y: number;
  name: string;
}

export interface SkinEnvelope {
  above: number;
  below: number;
  inside: number;
  insufficientIntersections: number;
  worstAboveMeters: number;
  worstBelowMeters: number;
  examples: { vertex: number[]; bottom: SkinHit; top: SkinHit }[];
}

/** Throws for a node without vertex geometry. */
export function worldVertices(node: TransformNode): Vector3[];
export function buildSkinTriangles(byName: ReadonlyMap<string, TransformNode>): SkinTriangle[];
export function classifySkinEnvelope(points: readonly Vector3[], skin: readonly SkinTriangle[]): SkinEnvelope;
export function hasEnvelopeViolation(result: SkinEnvelope): boolean;
