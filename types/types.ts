import { Timestamp } from "firebase/firestore";


export interface ProfileCardProps {
    headerImage: string;
    avatar: string;
    avatarInitials: string;
    userName: string;
    description: string;
    likedArtist?: string[];
    likedGenre: string[];
    favoriteSong: FavouriteTrack;
    favoriteArtist: FavouriteArtist,
    userId: string,
    onPress?: () => void
}

export interface SimilarUser {
    artist: FavouriteArtist
    banner: string|null,
    bio: string,
    id: string,
    likes: string[],
    name: string,
    profile_image: string,
    spotify_username: string,
    track: FavouriteTrack
}

export interface User {
    id: string,
    name: string,
    profile_image: string,
    email: string,
    created_at: null,
    bio: string,
    spotify_username: string,
    friend_count: number,
    banner: string,
    country: string
}

export interface CurrentTrack {
    artists: string[],
    duration: number,
    image: string,
    is_playing: boolean,
    name: string,
    progress: number,
    device: {
        name: string,
        type: string
    }
}

export interface FavouriteTrack {
    id: string,
    name: string,
    image: string,
    preview_url: string,
    position: number
    artists: {
        name: string,
        id: string,
        image: string
    }[]
}

export interface FavouriteArtist {
    position: number
    name: string,
    id: string,
    image: string
}

export interface FriendRequest {
    sender_username: string,
    sender_avatar: string,
    user_id: string,
    friend_id: string,
    created_at: string
}

export interface Chat {
    lastMessage: string,
    members: string[],
    updatedAt: Timestamp,
    createdBy: string,
    createdAt: Timestamp,
    type: "group"|"private"
    id: string
}

export interface SonarSearchResult {
    id: string,
    summary: string,
    users: User[],
    question: string
}

export interface Media {
    url: string,
    type: "video"|"image"
}

export interface Message {
    content: string,
    senderId: string,
    createdAt: Timestamp,
    id: string,
    media: Media[]
}

export interface Friend {
    id: string;
    name: string;
    username: string;
    profile_image: string;
    bio: string;
}

export interface OnlineStatus {
    status: "online"|"offline",
    last_seen: string
}

export type StorageFolder = "banners"|"avatars"|"images"


export enum AsyncStorageKeys {
    ACCESS_TOKEN = "access-token",
    REFRESH_TOKEN = "refresh-token",
    SEARCH_RESULTS = "search-results",
    LAST_MESSAGE = "last-message"
}

export enum ReactQueryKeys {
    FRIEND_REQUESTS = "friend-requests",
    FRIEND_CHECK = "friend-check",
    CURRENT_USER = "current-user",
    CURRENT_TRACK = "current-track",
    SIMILAR_USERS = "similar-users",
    FAVOURITE_ARTISTS = "favourite-artists",
    FAVOURITE_TRACKS = "favourite-tracks",
    FAVOURITE_GENRES = "favourite-genres",
    USER = "user",
    CHATS = "chats",
    FRIENDS_LIST = "friends-list",
}

