import {
	PrimaryColumn,
	Entity,
	Index,
	JoinColumn,
	Column,
	ManyToOne,
	type Relation,
} from "typeorm";
import { User } from "./user.js";
import { id } from "../id.js";

@Entity()
export class Clip {
	@PrimaryColumn(id())
	public id: string;

	@Column("timestamp with time zone", {
		comment: "The created date of the Clip.",
	})
	public createdAt: Date;

	@Index()
	@Column({
		...id(),
		comment: "The owner ID.",
	})
	public userId: User["id"];

	@Column("varchar", {
		length: 128,
		comment: "The name of the Clip.",
	})
	public name: string;

	@Column("boolean", {
		default: false,
	})
	public isPublic: boolean;

	@Column("varchar", {
		length: 2048,
		nullable: true,
		comment: "The description of the Clip.",
	})
	public description: string | null;

	//#region Relations
	@ManyToOne(() => User, {
		onDelete: "CASCADE",
	})
	@JoinColumn()
	public user: Relation<User>;
	//#endregion
}
