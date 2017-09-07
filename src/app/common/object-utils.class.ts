export class ObjectUtils {
  public static merge(object1: any, object2: any): any {
    const merged: any = new Object();

    Object.assign(merged, object1);
    Object.assign(merged, object2);

    return merged;
  }

  public static toArray<T extends Object>(sourceArray: any[], targetType: T): T[] {
    const targetArray: T[] = new Array<T>();

    for (const sourceElement of sourceArray) {

      const targetElement: T = Object.create(targetType);
      Object.assign(targetElement, sourceElement);

      targetArray.push(targetElement);
    }

    return targetArray;
  }
}
