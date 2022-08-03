export interface MediaCardProps {
  mediaCard: {
    title?: string | undefined;
    original_title?: string | undefined;
    poster_path?: string | undefined;
    name?: string | undefined;
    overview?: string | undefined;
    poster?: string | undefined;
    first_air_date?: string | undefined;
    id?: number | undefined;
    uuid?: string | number;
    onRemove?: ((id: string | number) => void | undefined | null) | undefined;
  };
}

export interface CategorizerProps {
  categorizer: {
    media: MediaCardProps["mediaCard"][] | undefined;
    type: string;
    name: string | undefined;
    category: string | undefined;
    extraClass01?: string | undefined;
    extraClass02?: string | undefined;
  };
}

export interface ArrowCategorizerProps {
  categorizerArrow: {
    media: [MediaCardProps["mediaCard"]] | undefined;
    name?: string | undefined;
  };
}

export interface MediaDetailsUIProps {
  detailProps: {
    title?: string | undefined;
    original_title?: string | undefined;
    name?: string | undefined;
    videos: {
      results:
        | {
            name?: string | undefined;
            official?: boolean | undefined;
            published_at: string | undefined | Date;
            id: number;
            key:string;
          }[]
        | undefined;
    };
    genres: {
      id: number | undefined;
      name: string | undefined;
    }[];
    images: {
      backdrops: {
        aspect_ratio: number | float | undefined;
        file_path: string;
        height: number;
        width: number;
      }[];
    };
    reviews: {
      results: {
        author_details: { name: string; username: string };
        content: string;
        created_at: string;
        rating: number;
        id: number;
      }[];
    };
    credits: {
      cast?: [PersonProps["cast"]] | undefined;
      crew?: any;
    };

    similar: {
      results: [MediaCardProps["mediaCard"]];
    };
    number_of_seasons?: string | number;
    number_of_episodes?: string | number;
    last_air_date?: string | number;
    first_air_date?: string | number;
    budget?: string | number | undefined;
    revenue?: string | number | undefined;
    runtime?: string | number | undefined;
    homepage?: string | undefined;
    rating?: number | undefined;
    original_language?: string;
    overview?: string | undefined;
    poster_path?: string | undefined;
    vote_average?: number | float;
    release_date?: number | undefined;
    id: number;
  };
}

export interface ListsProps {
  listItem: {
    name: string;
    description: string;
    items: [MediaCardProps["mediaCard"]];
    uuid: number;
  };
}

export interface PersonProps {
  cast: {
    name: string | undefined;
    known_for_department: string | undefined;
    character: string | undefined;
    profile_path: string | undefined;
    id?: number;
  };
}

export interface DescriptionProps {
  description: {
    type: MediaDetailsUIProps["detailProps"];
    POSTER: string | undefined;
    TITLE_ALT: string | undefined;
    TITLE: string | undefined;
    GENRES: string[];
    RELEASE_OR_FIRST_EPISODE: string | undefined;
    DURATION_OR_LAST_EPISODE: string | undefined | number;
    RATING: string | number | undefined;
    OVERVIEW: string | undefined;
    TRAILER:
      | {
          name?: string | undefined;
          official?: boolean | undefined;
          published_at: string | undefined | Date;
          id: number;
          key: string;
        }
      | undefined;
    HOMEPAGE: string | undefined;
  };
}
