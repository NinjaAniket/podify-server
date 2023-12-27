import { Model, ObjectId, Schema, model, models } from "mongoose";

interface AutoGeneratedPlaylist {
	title: string;
	items: ObjectId[];
}

const playlistSchema = new Schema<AutoGeneratedPlaylist>(
	{
		title: {
			type: String,
			required: true,
		},

		items: [
			{
				type: Schema.Types.ObjectId,
				required: true,
				ref: "Audio",
			},
		],
	},
	{
		timestamps: true,
	}
);

const AutoGeneratedPlaylist =
	models.AutoGeneratedPlaylist ||
	model("AutoGeneratedPlaylist", playlistSchema);

export default AutoGeneratedPlaylist as Model<AutoGeneratedPlaylist>;