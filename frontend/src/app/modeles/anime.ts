import {Genre} from "./genre";

export interface Anime {
    mal_id: number,
    episodes: number,
    title: string,
    title_japanese: string,
    status: string,
    synopsis: string,
    genres: Genre[]
}
