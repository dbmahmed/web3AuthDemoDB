import React from "react";
import * as GlobalStyles from "../GlobalStyles.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import * as CustomPackages from "../custom-files/CustomPackages";
import * as alchemy from "../custom-files/alchemy";
import * as ethersRPC from "../custom-files/ethersRPC";
import { Button, ScreenContainer, withTheme } from "@draftbit/ui";
import { ScrollView, Text, View } from "react-native";

const BlankScreen = (props) => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const uiconsole = (args) => {
    setKonsole(
      `${JSON.stringify({ args } || {}, null, 2)}    ${JSON.stringify(
        konsole,
        null,
        2
      )}`
    );
  };

  const getAccounts = async () => {
    const address = await ethersRPC.getAccounts(key);
    setAddress(address);
    uiconsole(address);
  };

  const login = async (Variables) => {
    console.log("Logging in");

    try {
      console.log("Logging in");
      const web3auth = new CustomPackages.Web3Auth(CustomPackages.WebBrowser, {
        clientId: Variables.WEB3AUTH_CLIENT_ID,
        network: CustomPackages.OPENLOGIN_NETWORK.CYAN, // or other networks
      });
      const info = await web3auth.login({
        loginProvider: CustomPackages.LOGIN_PROVIDER.GOOGLE,
        redirectUrl: CustomPackages.resolvedRedirectUrl,
        mfaLevel: "none",
        curve: "secp256k1",
      });

      setUserInfo(info);
      setKey(info.privKey);
      uiconsole(info);
      console.log("Logged In");
    } catch (e) {
      console.log(e);
      // uiConsole(e);
    }
  };

  const getNFTs = async (add) => {
    let nfts = await alchemy.getNFTsByAddress(add);
    uiconsole(nfts);

    return nfts;
  };

  const { theme } = props;

  const [address, setAddress] = React.useState("");
  const [key, setKey] = React.useState("");
  const [konsole, setKonsole] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({});

  return (
    <ScreenContainer scrollable={false} hasSafeArea={false}>
      {/* Logged Actions */}
      <>
        {!key ? null : (
          <View>
            {/* Accounts */}
            <Button
              onPress={() => {
                const handler = async () => {
                  try {
                    await getAccounts();
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              style={GlobalStyles.ButtonStyles(theme)["Button"]}
              title={"Get Accounts"}
            />
            {/* List NFTs */}
            <>
              {!address ? null : (
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        await getNFTs(address);
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={GlobalStyles.ButtonStyles(theme)["Button"]}
                  title={"Get NFTs"}
                />
              )}
            </>
            {/* Private Key */}
            <Button
              style={GlobalStyles.ButtonStyles(theme)["Button"]}
              title={"Get Private Key"}
            />
            {/* Lougout */}
            <Button
              style={GlobalStyles.ButtonStyles(theme)["Button"]}
              title={"Logout"}
            />
          </View>
        )}
      </>
      {/* Login */}
      <>
        {key ? null : (
          <Button
            onPress={() => {
              const handler = async () => {
                try {
                  await login(Variables);
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={GlobalStyles.ButtonStyles(theme)["Button"]}
            title={"Login  with web3Auth"}
          />
        )}
      </>
      <ScrollView
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <Text style={GlobalStyles.TextStyles(theme)["Text"]}>{konsole}</Text>
      </ScrollView>
    </ScreenContainer>
  );
};

export default withTheme(BlankScreen);
