import { Vec3 } from "./vector";
import { Ray } from "./ray";

export class Sphere {
  public constructor(
    public position: Vec3,
    public radius:   number
  ) { }

  public intersect(ray: Ray): Vec3 | undefined {
    const m = ray.origin.subtract(this.position);
    const b = m.dot(ray.direction);
    const c = m.dot(m) - this.radius * this.radius;
    
    if(c > 0 && b > 0) {
      return undefined;
    }

    const discriminant = b * b - c;

    if(discriminant < 0) {
      return undefined;
    }

    let interval = -b - Math.sqrt(discriminant);

    return ray.origin.add(ray.direction.multiply(interval));
  }
}