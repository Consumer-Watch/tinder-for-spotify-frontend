import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Skeleton } from "../skeleton";
import { verticalScale } from "react-native-size-matters";
import { cn } from "~/lib/utils";

interface FavouriteGenresProps {
    isLoading: boolean;
    favouriteGenres: string[];
}


const FavouriteGenresTab = ({ isLoading, favouriteGenres }: FavouriteGenresProps) => {

    return (
        <View style={{ height: "75%" }}>
            <ScrollView className="border border-[#EFEFEF4A] p-4 rounded-lg" style={{ flex: 1, height: "100%" }}>
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
                    favouriteGenres?.map((genre, index) => (
                    <View className={cn("bg-[#B3B3B31A] rounded-md flex flex-row gap-4 items-center p-3 border border-[#EFEFEF33] mb-4", favouriteGenres.length - 1 === index && "mb-10")} key={genre}>
                        <Text className="text-white py-3 px-4 font-bold rounded-md border border-[#EFEFEF4A] bg-[#B3B3B31A]">
                            {index + 1}
                        </Text>
                        <View>
                            <Text className="text-white capitalize text-lg font-semibold whitespace-break-spaces">{genre}</Text>
                        </View>
                    </View>
                    ))
                }

            </ScrollView>
        </View>
    )
};

export default FavouriteGenresTab;
