// In this interface the repository will provide everything reagarind the read
export interface IRepositoryRead<T = unknown> {
  find(where: any): Promise<T>;
  findById(id: number): Promise<T>;
}

export interface IRepositoryWrite<T = unknown> {
  insert(input: any): Promise<T>;
}

export type IRepository<T = unknown> = IRepositoryWrite<T> & IRepositoryRead<T>;
