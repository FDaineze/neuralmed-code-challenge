export interface MarvelApiParams {
    ts: string;
    apikey: string;
    hash: string;
    limit: number;
    offset: number;
    nameStartsWith?: string;
}