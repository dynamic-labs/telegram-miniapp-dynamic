# Telegram Mini App + Dynamic connect

Steps to have the Telegram Mini App + Bot running

1. Create a new App + Bot on Telegram using Botfather, follow our detailed guide [here](https://docs.dynamic.xyz/social-providers/telegram#creating-a-new-app)
2. If you have not yet, [create an account on Dynamic](https://app.dynamic.xyz/)
3. Clone [this repo](https://github.com/dynamic-labs/telegram-miniapp-dynamic), use your own Dynamic Envirnment ID and deploy the website online. With NextJS you can deploy an app in minutes, [follow instructions here](https://vercel.com/docs/deployments/git#deploying-a-git-repository)
4. In your Dynamic Dashboard:
   1. [Add CORS](https://app.dynamic.xyz/dashboard/security) origin to your webapp URL
   2. [Turn on Telegram Social Login](https://app.dynamic.xyz/dashboard/log-in-user-profile) and set Bot Name and Secret Token
5. Use Bot `TOKEN` from Telegram and your webapp url as `LOGIN_URL` in `scripts/bot.ts`
6. Run telegram bot `npx ts-node scripts/bot.ts`
7. Go to your Telegram Bot and type `/start`

Et voilà! 🎉 You should now be able to use Dynamic's Seamless Telegram Login in your Mini App.

If you have any questions or need help with the integration, feel free to reach out to us in [Slack](https://dynamic.xyz/slack).
