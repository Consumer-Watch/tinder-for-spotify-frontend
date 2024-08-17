import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
import { MoreVertical, Star, Trash2, SmilePlus, Play } from 'lucide-react-native';
import { Image } from 'expo-image';
import BottomSheet from './bottom-sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

interface DropdownOption {
  label: string;
  value: string;
  icon: string;
}



const Dropdown = ({ options, onSelect }: { options: DropdownOption[], onSelect: (item: DropdownOption) => any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const onItemPress = (item) => {
    onSelect(item);
    setIsOpen(false);
  };

  const renderItem = ({ item }) => (
    <DropdownMenuItem 
      onPress={() => onItemPress(item)}
    >
      {getIcon(item.icon)}
      <Text className="text-white ml-3">{item.label}</Text>
    </DropdownMenuItem>
  );

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'star': return <Star size={20} color="white" />;
      case 'trash': return <Trash2 size={20} color="white" />;
      case 'happy': return <SmilePlus size={20} color="white" />;
      case 'play': return <Play size={20} color="white" />;
      case 'spotify': return <Image source={require('../assets/spotify-icons/spotify_white.png')} style={{ width: 20, height: 20 }} />;
      default: return null;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TouchableOpacity 
          className="p-2 rounded-full bg-[#B3B3B31A] border-[#EFEFEF33] border z-[999]"
          //onPress={toggleDropdown}
        >
          <MoreVertical size={24} color="white" />
        </TouchableOpacity>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64 native:w-72'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {
            options.map((option) => {
              return renderItem({ item: option })
            })
          }
      </DropdownMenuContent>
      
    <BottomSheet isOpen={isOpen}>
      <View className='bg-[#B3B3B31A] z-[999]'>
      </View>
    </BottomSheet>
    </DropdownMenu>
  )

  /*
  return (
    <View className="relative">
      <TouchableOpacity 
        className="p-2 rounded-full bg-[#B3B3B31A] border-[#EFEFEF33] border z-[999]"
        onPress={toggleDropdown}
      >
        <MoreVertical size={24} color="white" />
      </TouchableOpacity>

      {isOpen && (
        <Animated.View 
          className="absolute right-0 top-12 bg-[#B3B3B31A] rounded-lg overflow-hidden shadow-lg w-[200px] z-[999]"
          style={{
            //opacity: slideAnim,
            transform: [{
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            }],
            backgroundColor:"#B3B3B31A",
            opacity: 1,
            zIndex: 999
          }}
        >
          <View className='bg-[#B3B3B31A] z-[999]'>
            {
              options.map((option) => {
                return renderItem({ item: option })
              })
            }
          </View>
        </Animated.View>
      )}
    </View>
  );*/
};

export default Dropdown;