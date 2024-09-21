"use client";
import { useEffect, useState } from "react";
import {
  DynamicWidget,
  useTelegramLogin,
  useDynamicContext,
} from "../lib/dynamic";

import Spinner from "./Spinner";

export default function Main() {
  const { sdkHasLoaded, user } = useDynamicContext();
  const { telegramSignIn } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!sdkHasLoaded) return;

    const signIn = async () => {
      if (!user) {
        await telegramSignIn({ forceCreateUser: true });
      }
      setIsLoading(false);
    };

    signIn();
  }, [sdkHasLoaded]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black" style={{backgroundColor: "#f9f9fb", backgroundImage: "url('/background-pattern.svg')", backgroundBlendMode: "overlay", backgroundRepeat: "repeat"}}>
      <div className="flex flex-col items-center justify-center text-center max-w-3xl px-4">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center">
            <img src="/logo.png" alt="logo" className="w-16 h-auto" />
          </div>
        </div>

        {isLoading ? <Spinner /> : <DynamicWidget />}

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 mt-8">
          <h2 className="text-2xl font-semibold mb-4">You got an auto-wallet!</h2>
          <p className="mb-4">
            Zero clicks, one multi-chain wallet. We automatically created an embedded wallet for you.
          </p>
          <h3 className="text-xl font-semibold mb-2">How This works</h3>
          <ul className="list-disc list-inside mb-4 flex flex-col items-start">
            <li>We utilize the Telegram authentication token</li>
            <li>Token is verified and used to create the end user wallet</li>
            <li>The same wallet is accessible on desktop and mobile platforms</li>
            <li>If the end user logs in with Telegram later on your site, your wallet is still available</li>
          </ul>
          <a href="https://docs.dynamic.xyz/guides/integrations/telegram/telegram-auto-wallets" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
            Learn More in Our Docs
          </a>
        </div>
      </div>
    </div>
  );
}
