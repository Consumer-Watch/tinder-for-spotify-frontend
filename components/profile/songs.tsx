import React from "react";
import { ScrollView, View, Text, Pressable, Modal, FlatList, Linking } from "react-native";
import { Skeleton } from "../skeleton";
import { scale, verticalScale } from "react-native-size-matters";
import { Image } from "expo-image";
import {useState} from "react";
import { FavouriteTrack } from "../../types/types";
import { SpotifyLink } from "../spotify-linking";
import Dropdown from "../dropdown";
import TextTicker from "react-native-text-ticker";
import { cn } from "~/lib/utils";

interface FavouriteSongsProp {
    isLoading: boolean;
    favouriteSongs: FavouriteTrack[];
}

const FavoriteSongsTab = ({ isLoading, favouriteSongs }: FavouriteSongsProp) => {
     const data = [
        { label: 'Listen on Spotify', value: 'open_spotify', icon: 'spotify' },
        { label: 'Preview', value: 'preview', icon: 'play' },
    ];

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const handleDropdownChange = (trackId) => {
        if (value === 'open_spotify') {
            Linking.openURL(`https://open.spotify.com/track/${trackId}`);
        } else if (value === 'preview') {
            // play track
        }
    }

    return (
        <View style={{ height: "75%" }}>
            <ScrollView className="border border-[#EFEFEF4A] p-4 rounded-lg" style={{ flex: 1, zIndex: 30, height: "80%" }}>
                {
                    isLoading ? 
                    <>
                        {
                            Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton 
                                    style={{ marginBottom: verticalScale(10) }} 
                                    key={index} 
                                    height={verticalScale(60)} 
                                    width="100%"
                                />
                            ))
                        }
                    </>
                    :
                    favouriteSongs?.map((track, index) => (
                    <View className={cn("bg-[#B3B3B31A] rounded-md flex flex-row gap-4 items-center p-3 border border-[#EFEFEF33] mb-4", index === favouriteSongs.length - 1 && "mb-10")} key={track.id}>
                        <Text className="text-white py-3 px-4 font-bold rounded-md border border-[#EFEFEF4A] bg-[#B3B3B31A]">
                            {track?.position}
                        </Text>
                        <Image 
                            source={{ uri: track?.image }} 
                            style={{ width: scale(50), height: verticalScale(47), borderRadius: 1 }}
                        />
                        <View className="w-[45%] flex flex-col gap-0.5">
                            <TextTicker duration={15000} className="text-white text-lg font-semibold whitespace-break-spaces">
                                {track.name}
                            </TextTicker>
                            <TextTicker duration={15000} className="text-light-grey text-sm">
                                {track.artists.map((artist) => artist.name).join(', ')}
                            </TextTicker>
                        </View>
                        <Dropdown
                            options={data}
                            onSelect={item => {
                                setValue(item.value);
                                setIsFocus(false);
                                handleDropdownChange(track.id);
                            }}
                        />
                    </View>
                    ))
                }

            </ScrollView>

        </View>
    )
};


export default FavoriteSongsTab;