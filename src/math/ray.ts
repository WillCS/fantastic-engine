import { Vec3 } from "./vector";

export class Ray {
  public constructor(
    public origin:    Vec3,
    public direction: Vec3
  ) { }
}