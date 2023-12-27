import {
	createPlaylist,
	getAudiosByPlaylist,
	getPlaylistByProfile,
	removePlaylist,
	updatePlaylist,
} from "#/controller/createPlaylist";
import { isVerified, mustAuth } from "#/middleware/auth";
import { validate } from "#/middleware/validator";
import {
	NewPlaylistValidationSchema,
	OldPlaylistValidationSchema,
} from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.post(
	"/create",
	mustAuth,
	isVerified,
	validate(NewPlaylistValidationSchema),
	createPlaylist
);

router.patch(
	"/",
	mustAuth,
	validate(OldPlaylistValidationSchema),
	updatePlaylist
);

router.delete("/", mustAuth, removePlaylist);
router.get("/by-profile", mustAuth, getPlaylistByProfile);
router.get("/:playlistId", mustAuth, getAudiosByPlaylist);

export default router;
