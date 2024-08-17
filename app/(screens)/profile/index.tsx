import { Pressable, useWindowDimensions, View } from "react-native";
import Page from "../../../components/page";
import useCurrentUser from "../../../hooks/current-user";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { SceneMap, TabBar, TabBarItem, TabView } from "react-native-tab-view";
import { useState } from "react";
import { Drawer } from "expo-router/drawer";
import { ArrowLeft, Calendar } from "lucide-react-native";
import { ImageBackground } from "expo-image";
import { moderateScale, verticalScale } from "react-native-size-matters";
import useDrawer from "../../../hooks/drawer";
import { Link } from "expo-router";

import FavouriteSongs from "../../../components/profile/songs";
import FavouriteArtists from "../../../components/profile/artists";
import FavouriteGenres from "../../../components/profile/genres";
import useFavouriteSongs from "../../../hooks/favourite-songs";
import useFavouriteGenres from "../../../hooks/favourite-genres";
import useFavouriteArtists from "../../../hooks/favourite-artists";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Text } from "~/components/ui/text";

const FavouriteSongsTab = () => {
    const { isLoading, favouriteSongs } = useFavouriteSongs();

    return <FavouriteSongs isLoading={isLoading} favouriteSongs={favouriteSongs} />
};
  
const FavouriteArtistsTab = () => {
    const { isLoading, favouriteArtists } = useFavouriteArtists();

    return <FavouriteArtists isLoading={isLoading} favouriteArtists={favouriteArtists} />
};

const FavouriteGenresTab = () => {
    const { isLoading, favouriteGenres } = useFavouriteGenres();

    return <FavouriteGenres isLoading={isLoading} favouriteGenres={favouriteGenres} />
};


  
  
export default function ProfilePage() {
    const { userProfile, isLoading } = useCurrentUser();
    const { openDrawer } = useDrawer();
    const [value, setValue] = useState<'songs'|'artists'|'genres'>('songs');


    if (isLoading) {
        return (
            <Page>
                <Text>Loading</Text>
            </Page>
        )
    }

    return (
        <View className="px-3 h-screen w-screen">
            <Drawer.Screen options={{
                headerBackground: () => (
                    <ImageBackground
                        source={{ uri: userProfile?.banner || 'https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg' }}
                        style={{ height: verticalScale(120), top: 0, zIndex: -20 }}
                        contentPosition="center"
                    />
                ),
                headerLeft: () => (
                    <Pressable onPress={openDrawer}>
                        <View className=' mt-6  ml-6 w-6 h-6 rounded-md border-[#EFEFEF33] bg-[#121212]  border  p-5 items-center justify-center'>
                            <ArrowLeft size="14px" stroke="white"/>
                        </View>
                    </Pressable>
                )
            }} />

            <View style={{ zIndex: 100 }} className="flex flex-row mt-12 items-end justify-between z-50 relative">

                <Avatar className="w-20 h-20 z-50" alt="Profile Picture">
                    <AvatarImage source={{ uri: userProfile?.profile_image }}/>
                    <AvatarFallback>{userProfile?.name.at(0) || "S"}</AvatarFallback>
                </Avatar>
            </View>

            <View className="flex flex-row justify-between">
              <View>
                <Text className="text-white text-2xl font-bold mt-2">{userProfile?.name}</Text>
                <Text className="text-lg text-light-grey">@{userProfile?.spotify_username}</Text>
              </View>
              <Link href="/profile/edit" className="text-white border border-[#EFEFEF4A] bg-[#EFEFEF1A] py-3 px-6 rounded-lg self-end">
                <Text className="text-white font-semibold">Edit Profile</Text>
              </Link>
            </View>
            
            <View className="border border-[#EFEFEF33] rounded-lg px-4 py-3 my-4">
                <Text className="text-white font-medium text-xl mb-3">{userProfile?.bio || "Insert a bio"}</Text>

                <View className="flex flex-row gap-1 items-center">
                    <Calendar size="16px" stroke="#EFEFEF33"/>
                    <Text className="text-[#EFEFEF33] text-lg">
                        Joined {userProfile?.created_at || "June " +new Date().getFullYear()}
                    </Text>
                </View>
            </View>

            <Tabs value={value} onValueChange={(value) => setValue(value as any)}>
                <TabsList className='flex-row w-full mb-5'>
                    <TabsTrigger value='songs' className='flex-1'>
                        <Text className="text-lg">Songs</Text>
                    </TabsTrigger>
                    <TabsTrigger value='artists' className='flex-1'>
                        <Text>Artists</Text>
                    </TabsTrigger>
                    <TabsTrigger value='genres' className='flex-1'>
                        <Text>Genres</Text>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="songs">
                    <FavouriteSongsTab/>
                </TabsContent>
                <TabsContent value="artists">
                    <FavouriteArtistsTab/>
                </TabsContent>
                <TabsContent value="genres">
                    <FavouriteGenresTab/>
                </TabsContent>
            </Tabs>

        </View>
    )
}
