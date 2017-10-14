import { Request, Response, Router } from "express";

const publicRouter: Router = Router();

publicRouter.get("/simple", (request: Request, response: Response) => {
  response.json({
    text: "Random Chords",
    title: "Chord Coach",
  });
});

export { publicRouter };
