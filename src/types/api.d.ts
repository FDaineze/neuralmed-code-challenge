export interface MarvelApiParams {
    apikey: string;
    ts: string;
    hash: string;
    limit: number;
    offset: number;
    nameStartsWith?: string;
}