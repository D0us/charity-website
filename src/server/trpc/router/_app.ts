import { router } from "../trpc";
import { authRouter } from "./auth";
import { doneeRouter } from "./donee";
import { donationRouter } from "./donation";

export const appRouter = router({
  auth: authRouter,
  donee: doneeRouter,
  donation: donationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
