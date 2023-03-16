import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from "@web3auth/react-native-sdk";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import Constants, { AppOwnership } from "expo-constants";
// const resolvedRedirectUrl =
//   Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
//     ? Linking.createURL("web3auth", {})
//     : Linking.createURL("web3auth", { scheme });

const resolvedRedirectUrl = Linking.createURL("web3auth", {});

export {
  Web3Auth,
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
  Linking,
  WebBrowser,
  resolvedRedirectUrl,
};
