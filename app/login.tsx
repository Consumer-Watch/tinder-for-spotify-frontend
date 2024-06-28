import { Pressable, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Page from "../components/page";
import { Image } from "expo-image";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import {
  dismissAuthSession,
  openAuthSessionAsync,
  openBrowserAsync,
} from "expo-web-browser";
import { useState } from "react";
import WebView from "react-native-webview";
import { useRouter } from "expo-router";
import useAccessToken from "../hooks/access-token";

const LoginPage = () => {
  const [loginUrl, setLoginUrl] = useState("");
  const router = useRouter();
  const { saveAccessToken } = useAccessToken();

  const getLoginUrl = async () => {
    const res = await fetch("https://sonder-api.vercel.app/login");
    const { data } = await res.json();
    //const result = await openBrowserAsync(data.url)
    //console.log(result)
    setLoginUrl(data.url);
  };

  const getAccessToken = async (url: string) => {
    if (!url.includes("sonder-api")) return;

    //Authenticate
    await saveAccessToken(url);
    return router.push("/home");
  };
  return (
    <Page>
      <View style={styles.container}>
        <Text
          className="text-foreground text-4xl font-Poppins_600SemiBold "
          style={{ fontSize: 40, lineHeight: 50 }}
        >
          Welcome <Text className="text-primary"></Text>
        </Text>

        <Text className="font-Poppins_400Regular text-muted-foreground text-xl">
          Choose your streaming service to continue
        </Text>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.loginButton]}
            className="bg-primary"
            onPress={getLoginUrl}
          >
            <Text className="font-Poppins_500Medium" style={{ fontSize: 16 }}>
              Login with{" "}
            </Text>
            <Image
              source={require("../assets/spotify.png")}
              style={{ width: 101, height: 30 }}
            />
          </Pressable>
        </View>

        {loginUrl && (
          <View>
            <WebView
              source={{ uri: loginUrl }}
              onNavigationStateChange={({ url }) => getAccessToken(url)}
            />
          </View>
        )}
      </View>
    </Page>
  );
};

export default LoginPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  welcomeText: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitleText: {
    color: "#AAA",
    fontSize: 16,
    marginBottom: 50,
  },

  buttonsContainer: {
    width: "100%",
    position: "absolute",
    bottom: 20,
  },
  appleMusicButton: {
    backgroundColor: "#FA243C",
  },
  loginText: {
    color: "#FFF",
    fontSize: 18,
    marginRight: 10,
  },

  serviceText: {
    color: "#FFF",
    fontSize: 18,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
  },
});
