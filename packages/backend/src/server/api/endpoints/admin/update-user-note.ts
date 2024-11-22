import { UserProfiles, Users } from "@/models/index.js";
import define from "@/server/api/define.js";

export const meta = {
	tags: ["admin"],

	requireCredential: true,
	requireModerator: true,
} as const;

export const paramDef = {
	type: "object",
	properties: {
		userId: { type: "string", format: "fedired:id" },
		text: { type: "string" },
	},
	required: ["userId", "text"],
} as const;

export default define(meta, paramDef, async (ps, me) => {
	const user = await Users.findOneBy({ id: ps.userId });

	if (user == null) {
		throw new Error("user not found");
	}

	await UserProfiles.update(
		{ userId: user.id },
		{
			moderationNote: ps.text,
		},
	);
});
