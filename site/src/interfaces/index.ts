export interface MinMovieInterface {
  id: number
  poster_path: string
  title: string
  release_date: string
  genre_ids: number[]
  overview: string
  genres?: [{
    id: number
    name?: string
  }]
  genres_all?: Genre[]
}

export interface Genre{
  id: number
  name: string
}