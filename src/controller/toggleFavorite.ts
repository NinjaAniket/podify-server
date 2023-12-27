import { paginationQuery } from "#/@types/misc";
import Audio from "#/models/audio";
import Favorite from "#/models/favorite";
import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

export const toggleFavorite: RequestHandler = async (req, res) => {
	//audio  already in fav

	const audioId = req.query.audioId as string;
	let status: "added" | "removed";
	if (!isValidObjectId(audioId))
		return res.status(422).json({
			error: "Audio Id is Invalid!",
		});

	//audio already in list
	const audio = await Audio.findById(audioId);
	if (!audio) return res.status(404).json({ error: "Resources not found!" });

	const alreadyExists = await Favorite.findOne({
		owner: req.user!.id,
		items: audioId,
	});
	if (alreadyExists) {
		//remove from old list
		await Favorite.updateOne(
			{ owner: req.user!.id },
			{ $pull: { items: audioId } }
		);
		status = "removed";
	} else {
		//try create fresh fav list
		const favorite = await Favorite.findOne({ owner: req.user!.id });
		if (favorite) {
			await Favorite.updateOne(
				{ owner: req.user!.id },
				{ $addToSet: { items: audioId } }
			);
		} else {
			//add to new list
			await Favorite.create({ owner: req.user!.id, items: [audioId] });
		}

		status = "added";
	}
	if (status === "added") {
		await Audio.findByIdAndUpdate(audioId, {
			$addToSet: { likes: req.user!.id },
		});
	}
	if (status === "removed") {
		await Audio.findByIdAndUpdate(audioId, {
			$pull: { likes: req.user!.id },
		});
	}
	res.json({ status });
};

export const getFavorites: RequestHandler = async (req, res) => {
	const userId = req.user?.id;

	const { limit = "20", pageNo = "0" } = req.query as paginationQuery;

	const favorites = await Favorite.aggregate([
		{
			$match: { owner: userId },
		},
		{
			$project: {
				audioIds: {
					$slice: ["$items", +pageNo * +limit, +limit],
				},
			},
		},
		{
			$unwind: "$audioIds",
		},
		{
			$lookup: {
				from: "audios",
				localField: "audioIds",
				as: "audioInfo",
				foreignField: "_id",
			},
		},
		{ $unwind: "$audioInfo" },
		{
			$lookup: {
				from: "users",
				localField: "audioInfo.owner",
				as: "ownerInfo",
				foreignField: "_id",
			},
		},
		{ $unwind: "$ownerInfo" },
		{
			$project: {
				_id: 0,
				id: "$audioInfo._id",
				title: "$audioInfo.title",
				about: "$audioInfo.about",
				file: "$audioInfo.file.url",
				category: "$audioInfo.category",
				poster: "$audioInfo.poster.url",
				owner: { name: "$ownerInfo.name", id: "$ownerInfo._id" },
			},
		},
	]);

	res.json({ audios: favorites });

	// const favorite = await Favorite.findOne({ owner: userId }).populate<{
	// 	items: any;
	// }>({
	// 	path: "items",
	// 	populate: {
	// 		path: "owner",
	// 	},
	// });
	// if (!favorite) return res.json({ audios: [] });

	// const audios = favorite.items.map((item: any) => {
	// 	return {
	// 		id: item._id,
	// 		title: item.title,
	// 		about: item.about,
	// 		category: item.category,
	// 		file: item.file.url,
	// 		poster: item.poster.url,
	// 		owner: { name: item.owner.name, id: item.owner._id },
	// 	};
	// });
	// res.json({ audios });
};
export const getIsFavorites: RequestHandler = async (req, res) => {
	const audioId = req.query.audioId as string;

	if (!isValidObjectId(audioId))
		return res.status(422).json({ error: "Audio Id is Invalid!" });

	const favorites = await Favorite.findOne({
		owner: req.user?.id,
		items: audioId,
	});

	res.json({ result: favorites ? true : false });
};
