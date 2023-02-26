export interface Vehicle<T> {
  plate: T;
  chassis: T;
  brand: T;
  model: T;
  year: T;
  label?: string;
}

export interface VehicleRow<T> extends Vehicle<T> {
  rowId: number;
  detail: T;
}
