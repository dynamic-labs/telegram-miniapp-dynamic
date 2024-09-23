"use client";
import { useEffect, useState } from "react";
import {
  DynamicWidget,
  useTelegramLogin,
  useDynamicContext,
} from "../lib/dynamic";

import Spinner from "./Spinner";
import AccountModal from "./AccountModal";

export default function Main() {
  const { sdkHasLoaded, user } = useDynamicContext();
  const { telegramSignIn, isAuthWithTelegram } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!sdkHasLoaded) return;

    const checkTelegramConnection = async () => {
      setIsLoading(true);
      const isLinkedWithTelegram = await isAuthWithTelegram();

      if (isLinkedWithTelegram) {
        // Auto login if Telegram is connected
        await telegramSignIn();
      } else {
        // Show modal splash page
        setShowModal(true);
      }
      setIsLoading(false);
    };

    if (user) {
      setIsLoading(false);
      return;
    }
    checkTelegramConnection();
  }, [sdkHasLoaded, isLoading]);

  const handleModalResponse = async (hasAccount: boolean) => {
    setShowModal(false);
    if (hasAccount) {
      // Prompt developer's login
      console.log("User already has an account on XYZ");
    } else {
      // Call signIn with autoCreate: true
      console.log(
        "User does not have an account on XYZ => Auto Create + Auto Login"
      );
      await telegramSignIn({ forceCreateUser: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black bg-[#f9f9fb] bg-[url('/background-pattern.svg')] bg-repeat bg-blend-overlay">
      <div className="flex flex-col items-center justify-center text-center max-w-3xl px-4">
        <div className="pt-8">
          <div className="inline-flex items-center justify-center">
            <img src="/logo-full.svg" alt="logo" className="w-auto h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm mb-7 mt-7 text-sm">
          {user && (
            <h2 className="text-xl font-semibold mb-3">
              You got an auto-wallet!
            </h2>
          )}
          <div className="flex justify-center py-4">
            {isLoading ? <Spinner /> : <DynamicWidget />}
            {showModal && <AccountModal onResponse={handleModalResponse} />}
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
