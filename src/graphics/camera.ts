import { Mat4 } from '../math/matrix';
import { Vec3 } from '../math/vector';
import { MathHelper } from '../math/mathHelper';

export enum ProjectionType {
  PERSPECTIVE,
  ORTHOGRAPHIC
}

export abstract class Camera {
  public abstract get location():      Vec3;
  public abstract getProjection():     Mat4;
  public abstract getViewTransform():  Mat4;
  public abstract getUpVector():       Vec3;
  public abstract getLookVector():     Vec3;

  protected abstract updateProjectionMatrix(): void;
  protected abstract updateViewTransformMatrix(): void;

  protected projectionMatrix:     Mat4;
  protected viewTransformMatrix:  Mat4;
  protected fov:                  number;
  protected aspectRatio:          number;

  public projectionType: ProjectionType;


  constructor(
    protected width:         number,
    protected height:        number,
    protected nearPlaneDist: number,
    protected farPlaneDist:  number
  ) {
    this.aspectRatio = this.width / this.height;
    this.fov         = MathHelper.TWO_PI / 4;

    this.projectionMatrix     = Mat4.identity();
    this.viewTransformMatrix  = Mat4.identity();

    this.projectionType = ProjectionType.PERSPECTIVE;

    this.updateProjectionMatrix();
  }

  public set viewportWidth(width: number) {
    this.width = width;
    this.aspectRatio = this.width / this.height;
    this.updateProjectionMatrix();
  }

  public set viewportHeight(height: number) {
    this.height = height;
    this.aspectRatio = this.width / this.height;
    this.updateProjectionMatrix();
  }

  public set nearPlaneDistance(nearDist: number) {
    this.nearPlaneDist = nearDist;
    this.updateProjectionMatrix();
  }

  public set farPlaneDistance(farDist: number) {
    this.farPlaneDist = farDist;
    this.updateProjectionMatrix();
  }

  public set fieldOfView(newFov: number) {
    this.fov = newFov;
    this.updateProjectionMatrix();
  }
}

export class OrbitalCamera extends Camera {
  constructor(
      private originPoint:      Vec3,
      private azimuthalAngle:   number,
      private inclinationAngle: number,
      private radiusDistance:   number) {
    super(0, 0, 1, 100);

    this.updateViewTransformMatrix();
  }

  public get origin(): Vec3 {
    return this.originPoint;
  }

  public get azimuth(): number {
    return this.azimuthalAngle;
  }

  public get inclination(): number {
    return this.inclinationAngle;
  }

  public get radius(): number {
    return this.radiusDistance;
  }

  public set origin(newOrigin: Vec3) {
    this.originPoint = newOrigin;
    this.updateProjectionMatrix();
  }

  public set azimuth(newAzimuth: number) {
    this.azimuthalAngle = newAzimuth;
    this.updateViewTransformMatrix();
  }

  public set inclination(newInclination: number) {
    this.inclinationAngle = newInclination;
    this.updateViewTransformMatrix();
  }

  public set radius(newRadius: number) {
    this.radiusDistance = newRadius;
    this.updateViewTransformMatrix();
  }

  public get location(): Vec3 {
    return this.origin.add(new Vec3(
      Math.cos(this.azimuth) * Math.sin(this.inclination),
      Math.cos(this.inclination),
      Math.sin(this.azimuth) * Math.sin(this.inclination)
    )).multiply(this.radius);
  }

  public getProjection(): Mat4 {
    return this.projectionMatrix;
  }

  public getViewTransform(): Mat4 {
    return this.viewTransformMatrix;
  }

  public getUpVector(): Vec3 {
    return (this.getLookVector().negate().cross(new Vec3(
      Math.cos(this.azimuth - (MathHelper.TWO_PI / 4)),
      0,
      Math.sin(this.azimuth - (MathHelper.TWO_PI / 4))
    ))).normalize();
  }

  public getLookVector(): Vec3 {
    return this.origin.subtract(this.location).normalize();
  }

  protected updateProjectionMatrix(): void {
    switch(this.projectionType) {
      case ProjectionType.PERSPECTIVE:
        this.projectionMatrix = Mat4.perspectiveProjection(
          this.fov,
          this.aspectRatio,
          this.nearPlaneDist,
          this.farPlaneDist);
        break;
      case ProjectionType.ORTHOGRAPHIC:
        this.projectionMatrix = Mat4.orthographicProjection(
          this.width,
          this.height,
          this.nearPlaneDist,
          this.farPlaneDist);
        break;
    }
  }

  protected updateViewTransformMatrix(): void {
    let newMatrix = Mat4.identity();
    // newMatrix = newMatrix.rotateZ(Math.PI / 2);
    newMatrix = newMatrix.rotateX(Math.PI / 2 - this.inclination);
    newMatrix = newMatrix.rotateY(this.azimuth - Math.PI / 2);
    newMatrix = newMatrix.translate(-this.location.x, -this.location.y, -this.location.z);

    this.viewTransformMatrix = newMatrix;
  }
}
