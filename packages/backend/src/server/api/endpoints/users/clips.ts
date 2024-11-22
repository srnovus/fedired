import { Clips } from "@/models/index.js";
import define from "@/server/api/define.js";
import { makePaginationQuery } from "@/server/api/common/make-pagination-query.js";

export const meta = {
	tags: ["users", "clips"],
	requireCredentialPrivateMode: true,

	description: "Show all clips this user owns.",

	res: {
		type: "array",
		optional: false,
		nullable: false,
		items: {
			type: "object",
			optional: false,
			nullable: false,
			ref: "Clip",
		},
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		userId: { type: "string", format: "fedired:id" },
		limit: { type: "integer", minimum: 1, maximum: 100, default: 10 },
		sinceId: { type: "string", format: "fedired:id" },
		untilId: { type: "string", format: "fedired:id" },
	},
	required: ["userId"],
} as const;

export default define(meta, paramDef, async (ps, user) => {
	const query = makePaginationQuery(
		Clips.createQueryBuilder("clip"),
		ps.sinceId,
		ps.untilId,
	)
		.andWhere("clip.userId = :userId", { userId: ps.userId })
		.andWhere("clip.isPublic = true");

	const clips = await query.take(ps.limit).getMany();

	return await Clips.packMany(clips);
});
