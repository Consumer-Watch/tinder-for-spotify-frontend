import { ScrollView, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { cn } from "../lib/utils";

interface PageProps {
  children?: React.ReactNode;
  className?: string;
}

const Page = ({ children, className }: PageProps) => {
  return (
    <SafeAreaProvider style={{ backgroundColor: "#0C0A09" }}>
      <View className={cn("w-screen h-screen text-white", className)}>
        {children}
      </View>
    </SafeAreaProvider>
  );
};

export default Page;
