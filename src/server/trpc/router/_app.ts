import { router } from "../trpc";
import { authRouter } from "./auth";
import { doneeRouter } from "./donee";
import { donationRouter } from "./donation";
import { causeRouter } from "./cause";

export const appRouter = router({
  auth: authRouter,
  donee: doneeRouter,
  donation: donationRouter,
  cause: causeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
