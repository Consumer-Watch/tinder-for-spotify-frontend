import { ActivityIndicator, Pressable, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Page from "../../../components/page";
import useCurrentUser from "../../../hooks/current-user";
import Avatar from "../../../components/avatar";
import { useState } from "react";
import { Drawer } from "expo-router/drawer";
import { Activity, ArrowLeft, Calendar } from "lucide-react-native";
import useFavouriteSongs from "../../../hooks/favourite-songs";
import { Image, ImageBackground } from "expo-image";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import useFavouriteArtists from "../../../hooks/favourite-artists";
import useDrawer from "../../../hooks/drawer";
import useFavouriteGenres from "../../../hooks/favourite-genres";
import useUserProfile from "../../../hooks/user";
import { useLocalSearchParams, useRouter } from "expo-router";
import useFriends from "../../../hooks/friends";
import { cn } from "../../../lib/utils";
import FavoriteSongs from "../../../components/profile/songs";
import FavouriteArtists from "../../../components/profile/artists";
import FavouriteGenres from "../../../components/profile/genres";
import useCheckRequestStatus from '../../../hooks/check-request-status';
import { saveFriendRequestSent } from '../../../utils/functions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Text } from "~/components/ui/text";

import CustomBackButton from "../../../components/CustomBackButton";

const FavouriteSongsTab = () => {
  const { id } = useLocalSearchParams();
  const {
    favouriteSongsLoading: isLoading,
    userFavouriteSongs: favouriteSongs,
  } = useFavouriteSongs(id as string);

  return (
    <FavoriteSongs isLoading={isLoading} favouriteSongs={favouriteSongs} />
  );
};

const FavouriteArtistsTab = () => {
  const { id } = useLocalSearchParams();
  const {
    favouriteArtistsLoading: isLoading,
    userFavouriteArtists: favouriteArtists,
  } = useFavouriteArtists(id as string);

  return (
    <FavouriteArtists
      isLoading={isLoading}
      favouriteArtists={favouriteArtists}
    />
  );
};

const FavouriteGenresTab = () => {
  const { id } = useLocalSearchParams();
  const {
    favouriteGenresLoading: isLoading,
    userFavouriteGenres: favouriteGenres,
  } = useFavouriteGenres(id as string);

  return (
    <FavouriteGenres isLoading={isLoading} favouriteGenres={favouriteGenres} />
  );
};
  
  

export default function ProfilePage() {
    const { id } = useLocalSearchParams();
    const { userProfile, isLoading } = useUserProfile(id as string);
    const { userProfile: currentUser } = useCurrentUser();
    const layout = useWindowDimensions();
    const { openDrawer } = useDrawer();
    const router = useRouter();
    const [requestFirstSent, setRequestFirstSent] = useState(false);
    const [value, setValue] = useState<'songs'|'artists'|'genres'>('songs');

  

    const { 
        addFriendMutation, 
        friendRequests, 
        acceptFriendRequestMutation,
        isFriend,
        isFriendLoading 
    } = useFriends(id as string);
    const requestSent = useCheckRequestStatus(currentUser.id, id, isFriend);

    const friendRequestPresent = friendRequests.data?.find((request) => {
        return request.friend_id === currentUser.id && request.user_id === id as string
    })

    
    const handleProfileAction = async () => {
        if (isFriend) {
            return null //Do nothing
        }
        
        if (!!!friendRequestPresent) {
            try {
                await addFriendMutation.mutateAsync({ friend_id: id as string });
                await saveFriendRequestSent(currentUser.id, id as string);
                setRequestFirstSent(true);
                 // Update button label on success
            } catch (error) {
                console.error("Failed to add friend:", error);
                
            }
            return;
        }


        return await acceptFriendRequestMutation.mutateAsync({ user_id: id as string })
    }


    if (isLoading) {
        return (
            <Page className="flex flex-row items-center justify-center">
                <Drawer.Screen 
                    options={{ 
                        headerBackground: () => null,
                        headerLeft: () => <CustomBackButton/>
                    }} 
                />
                <ActivityIndicator size="large" color="#1DB954" />
            </Page>
        )
    }

    return (
    <View className="px-3 h-screen w-screen">
        <Drawer.Screen options={{
            headerBackground: () => (
                <ImageBackground
                    source={{ uri: userProfile?.banner || 'https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg' }}
                    style={{ height: verticalScale(107), top: 0, zIndex: -20 }}
                />
            ),
            headerLeft: () => <CustomBackButton/>
        }} />

        <View style={{ zIndex: 40 }} className="flex flex-row mt-16 mb-4 items-end justify-between z-20">
            <Avatar
                src={userProfile?.profile_image}
                initials={userProfile?.name.at(0) || "S"}
                width={70}
                height={70}
                containerStyle="z-40"
            />
            {
                currentUser?.id === id ?
                <TouchableOpacity className="text-white border border-[#EFEFEF4A] bg-[#EFEFEF1A] py-3 px-6 rounded-lg">
                    <Text className="text-white font-semibold">Edit Profile</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity 
                    disabled={isFriendLoading || acceptFriendRequestMutation.isPending || addFriendMutation.isPending || requestSent|| requestFirstSent}
                    className={cn("text-white disabled:opacity-50 bg-primary py-3 px-6 rounded-lg", isFriend && "bg-green-800/50")}
                    onPress={handleProfileAction}
                >
                    <Text className={cn("text-black font-semibold", isFriend && "text-primary")}>
                        {
                            isFriend ? "Friends" :
                            requestFirstSent || requestSent === true ? "Requested" :
                            !!!friendRequestPresent ? "Add Friend" : 
                            "Accept Request"
                        }
                    </Text>
                </TouchableOpacity>
            }
        </View>

        <Tabs value={value} onValueChange={(value) => setValue(value as any)}>
            <TabsList className='flex-row w-full mb-5 native:h-[57px]'>
                <TabsTrigger value='songs' className='flex-1 py-2'>
                    <Text className="text-lg">Songs</Text>
                </TabsTrigger>
                <TabsTrigger value='artists' className='flex-1 py-2'>
                    <Text>Artists</Text>
                </TabsTrigger>
                <TabsTrigger value='genres' className='flex-1 py-2'>
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
