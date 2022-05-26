export interface IService {
    execute: (query: any) => Promise<any | null>;
}