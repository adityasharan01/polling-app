import { Router } from "express";
import { getAllPolls, createPoll, getPollById, votePollById } from '../controllers/poll.controller.js';
const route = new Router();

route.get("/", getAllPolls);
route.put("/:pollId", votePollById);
route.get("/:pollId", getPollById);
route.post("/new", createPoll);

export default route;