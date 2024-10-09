"use client";
import { useEffect, useState } from "react";
import {
  DynamicWidget,
  useTelegramLogin,
  useDynamicContext,
} from "../lib/dynamic";

import Spinner from "./Spinner";
interface Window {
  Telegram?: any; // You can specify a more specific type if you know the structure of Telegram
}

export default function Main() {
  const { sdkHasLoaded, user } = useDynamicContext();
  const { telegramSignIn } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTelegramContext, setIsTelegramContext] = useState(false);

  // useEffect(() => {
  //   if (!sdkHasLoaded) return;

  //   const signIn = async () => {
  //     if (!user) {
  //       await telegramSignIn({ forceCreateUser: true });
  //     }
  //     setIsLoading(false);
  //   };

  //   signIn();
  // }, [sdkHasLoaded]);

  useEffect(() => {
    function isInTelegramContext() {
      // Check for Telegram WebView environment
      const isTelegramWebView = true;
      // typeof window !== "undefined" && window.Telegram !== undefined;

      // You can also check the user agent to determine if it's Telegram's in-app browser
      const userAgent = navigator.userAgent || navigator.vendor;
      const isTelegramUserAgent = /Telegram/i.test(userAgent);

      console.log(
        "check Telegram",
        "isTelegramWebView",
        isTelegramWebView,
        "isTelegramUserAgent",
        isTelegramUserAgent
      );
      if (isTelegramWebView || isTelegramUserAgent) {
        // Access the Telegram WebApp API
        // const telegram = window.Telegram.WebApp;
      } else {
        console.log("not in context.....");
      }

      return isTelegramWebView || isTelegramUserAgent;
    }

    if (isInTelegramContext()) {
      console.log("App is running inside Telegram context");
      setIsTelegramContext(true);
    } else {
      console.log("App is running outside Telegram context");
      setIsTelegramContext(false);
    }
  }, [sdkHasLoaded]); // Empty dependency array to run only on mount

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-black"
      style={{
        backgroundColor: "#f9f9fb",
        backgroundImage: "url('/background-pattern.svg')",
        backgroundBlendMode: "overlay",
        backgroundRepeat: "repeat",
      }}
    >
      <div>
        {isTelegramContext ? (
          <p>Welcome! You are inside the Telegram app.</p>
        ) : (
          <p>You are not inside the Telegram app.</p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center text-center max-w-3xl px-4">
        <div className="pt-8">
          <div className="inline-flex items-center justify-center">
            <img src="/logo-full.svg" alt="logo" className="w-auto h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm mb-7 mt-7 text-sm">
          <h2 className="text-xl font-semibold mb-3">
            You got an auto-wallet!
          </h2>
          <div className="flex justify-center py-4">
            {isLoading ? <Spinner /> : <DynamicWidget />}
          </div>
          <p className="mb-3">
            Zero clicks, one multi-chain wallet. We automatically created an
            embedded wallet for you.
          </p>
          <h3 className="text-lg font-semibold mb-2">How This works</h3>
          <ul className="list-disc list-inside mb-3 flex flex-col items-start">
            <li>We utilize the Telegram authentication token</li>
            <li>Token is verified and used to create the end user wallet</li>
            <li>
              The same wallet is accessible on desktop and mobile platforms
            </li>
            <li>
              If the end user logs in with Telegram later on your site, your
              wallet is still available
            </li>
          </ul>
          <a
            href="https://docs.dynamic.xyz/guides/integrations/telegram/telegram-auto-wallets"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block bg-blue-600 text-white font-semibold py-1.5 px-3 rounded hover:bg-blue-700 transition duration-300 text-sm"
          >
            Learn More in Our Docs
          </a>
        </div>
      </div>
    </div>
  );
}
