import cloundinary from "#/cloud";
import { RequestWithFiles } from "#/middleware/fileParser";
import Audio from "#/models/audio";
import { categoryTypes } from "#/models/audio_category";
import { RequestHandler } from "express";
import formidable from "formidable";

interface CreateAudioRequest extends RequestWithFiles {
	body: {
		title: string;
		about: string;
		category: categoryTypes;
	};
}

export const createAudio: RequestHandler = async (
	req: CreateAudioRequest,
	res
) => {
	const { title, about, category } = req.body;
	const poster = req.files?.poster as formidable.File;
	const audioFile = req.files?.file as formidable.File;
	const ownerId = req!.user!.id;

	if (!audioFile)
		return res.status(422).json({
			error: "Audio file missing!",
		});
	const audioRes = await cloundinary.uploader.upload(audioFile.filepath, {
		resource_type: "video",
	});
	const newAudio = new Audio({
		title,
		about,
		category,
		owner: ownerId,
		file: { url: audioRes.secure_url, publicId: audioRes.public_id },
	});

	if (poster) {
		const posterRes = await cloundinary.uploader.upload(poster.filepath, {
			width: 300,
			height: 300,
			crop: "thumb",
			gravity: "face",
		});
		newAudio.poster = {
			url: posterRes.secure_url,
			publicId: posterRes.public_id,
		};
	}

	await newAudio.save();
	res.status(201).json({
		audio: {
			title,
			about,
			file: newAudio.file.url,
			poster: newAudio.poster?.url,
		},
	});
};

export const updateAudio: RequestHandler = async (
	req: CreateAudioRequest,
	res
) => {
	const { title, about, category } = req.body;
	const poster = req.files?.poster as formidable.File;
	const ownerId = req!.user!.id;
	const { audioId } = req.params;

	const audio = await Audio.findOneAndUpdate(
		{ owner: ownerId, _id: audioId },
		{ title, about, category },
		{ new: true }
	);

	if (!audio)
		return res.status(404).json({
			error: "Audio not found!",
		});
	if (poster) {
		if (audio.poster?.publicId) {
			await cloundinary.uploader.destroy(audio.poster.publicId);
		}

		const posterRes = await cloundinary.uploader.upload(poster.filepath, {
			width: 300,
			height: 300,
			crop: "thumb",
			gravity: "face",
		});
		audio.poster = {
			url: posterRes.secure_url,
			publicId: posterRes.public_id,
		};
		await audio.save();
	}

	res.status(201).json({
		audio: {
			title,
			about,
			file: audio.file.url,
			poster: audio.poster?.url,
		},
	});
};

export const getLatestUploads: RequestHandler = async (req, res) => {
	const list = await Audio.find()
		.sort("-createdAt")
		.limit(10)
		.populate("owner");
	const audios = list?.map((audio: any) => {
		return {
			id: audio._id,
			title: audio.title,
			about: audio.about,
			file: audio.file.url,
			poster: audio.poster?.url,
			category: audio.category,
			owner: { name: audio.owner.name, id: audio.owner._id },
		};
	});

	res.json({ audios });
};
