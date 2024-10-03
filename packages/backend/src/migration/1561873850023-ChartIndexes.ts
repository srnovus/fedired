import type { MigrationInterface, QueryRunner } from "typeorm";

export class ChartIndexes1561873850023 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE INDEX "IDX_0ad37b7ef50f4ddc84363d7ccc" ON "__chart__active_users" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_15e91a03aeeac9dbccdf43fc06" ON "__chart__active_users" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_00ed5f86db1f7efafb1978bf21" ON "__chart__active_users" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_20f57cc8f142c131340ee16742" ON "__chart__active_users" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_9a3ed15a30ab7e3a37702e6e08" ON "__chart__active_users" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_c26e2c1cbb6e911e0554b27416" ON "__chart__active_users" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_13565815f618a1ff53886c5b28" ON "__chart__drive" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_3fa0d0f17ca72e3dc80999a032" ON "__chart__drive" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7a170f67425e62a8fabb76c872" ON "__chart__drive" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_6e1df243476e20cbf86572ecc0" ON "__chart__drive" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_3313d7288855ec105b5bbf6c21" ON "__chart__drive" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_06690fc959f1c9fdaf21928222" ON "__chart__drive" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_36cb699c49580d4e6c2e6159f9" ON "__chart__federation" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e447064455928cf627590ef527" ON "__chart__federation" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_76e87c7bfc5d925fcbba405d84" ON "__chart__federation" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_2d416e6af791a82e338c79d480" ON "__chart__federation" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_dd907becf76104e4b656659e6b" ON "__chart__federation" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e9cd07672b37d8966cf3709283" ON "__chart__federation" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_07747a1038c05f532a718fe1de" ON "__chart__hashtag" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_fcc181fb8283009c61cc4083ef" ON "__chart__hashtag" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_99a7d2faaef84a6f728d714ad6" ON "__chart__hashtag" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_49975586f50ed7b800fdd88fbd" ON "__chart__hashtag" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_25a97c02003338124b2b75fdbc" ON "__chart__hashtag" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_6d6f156ceefc6bc5f273a0e370" ON "__chart__hashtag" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_6b8f34a1a64b06014b6fb66824" ON "__chart__instance" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_c12f0af4a66cdd30c2287ce8aa" ON "__chart__instance" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_da8a46ba84ca1d8bb5a29bfb63" ON "__chart__instance" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_d0a4f79af5a97b08f37b547197" ON "__chart__instance" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_39ee857ab2f23493037c6b6631" ON "__chart__instance" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f5448d9633cff74208d850aabe" ON "__chart__instance" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_a1efd3e0048a5f2793a47360dc" ON "__chart__network" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f8dd01baeded2ffa833e0a610a" ON "__chart__network" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7b5da130992ec9df96712d4290" ON "__chart__network" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_08fac0eb3b11f04c200c0b40dd" ON "__chart__network" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0a905b992fecd2b5c3fb98759e" ON "__chart__network" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_9ff6944f01acb756fdc92d7563" ON "__chart__network" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_42eb716a37d381cdf566192b2b" ON "__chart__notes" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e69096589f11e3baa98ddd64d0" ON "__chart__notes" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7036f2957151588b813185c794" ON "__chart__notes" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0c9a159c5082cbeef3ca6706b5" ON "__chart__notes" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f09d543e3acb16c5976bdb31fa" ON "__chart__notes" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_924fc196c80ca24bae01dd37e4" ON "__chart__notes" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5f86db6492274e07c1a3cdf286" ON "__chart__per_user_drive" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_328f259961e60c4fa0bfcf55ca" ON "__chart__per_user_drive" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e496ca8096d28f6b9b509264dc" ON "__chart__per_user_drive" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_42ea9381f0fda8dfe0fa1c8b53" ON "__chart__per_user_drive" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_30bf67687f483ace115c5ca642" ON "__chart__per_user_drive" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f2aeafde2ae6fbad38e857631b" ON "__chart__per_user_drive" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7af07790712aa3438ff6773f3b" ON "__chart__per_user_following" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f92dd6d03f8d994f29987f6214" ON "__chart__per_user_following" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_4b3593098b6edc9c5afe36b18b" ON "__chart__per_user_following" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_57b5458d0d3d6d1e7f13d4e57f" ON "__chart__per_user_following" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_b77d4dd9562c3a899d9a286fcd" ON "__chart__per_user_following" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_4db3b84c7be0d3464714f3e0b1" ON "__chart__per_user_following" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_84234bd1abb873f07329681c83" ON "__chart__per_user_notes" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_8d2cbbc8114d90d19b44d626b6" ON "__chart__per_user_notes" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_55bf20f366979f2436de99206b" ON "__chart__per_user_notes" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_046feeb12e9ef5f783f409866a" ON "__chart__per_user_notes" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5048e9daccbbbc6d567bb142d3" ON "__chart__per_user_notes" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f68a5ab958f9f5fa17a32ac23b" ON "__chart__per_user_notes" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f7bf4c62059764c2c2bb40fdab" ON "__chart__per_user_reaction" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_65633a106bce43fc7c5c30a5c7" ON "__chart__per_user_reaction" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_8cf3156fd7a6b15c43459c6e3b" ON "__chart__per_user_reaction" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_edeb73c09c3143a81bcb34d569" ON "__chart__per_user_reaction" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_229a41ad465f9205f1f5703291" ON "__chart__per_user_reaction" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e316f01a6d24eb31db27f88262" ON "__chart__per_user_reaction" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0c641990ecf47d2545df4edb75" ON "__chart__test_grouped" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_2be7ec6cebddc14dc11e206686" ON "__chart__test_grouped" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_234dff3c0b56a6150b95431ab9" ON "__chart__test_grouped" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_a5133470f4825902e170328ca5" ON "__chart__test_grouped" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_b14489029e4b3aaf4bba5fb524" ON "__chart__test_grouped" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_84e661abb7bd1e51b690d4b017" ON "__chart__test_grouped" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_437bab3c6061d90f6bb65fd2cc" ON "__chart__test_unique" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5c73bf61da4f6e6f15bae88ed1" ON "__chart__test_unique" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_bbfa573a8181018851ed0b6357" ON "__chart__test_unique" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_d70c86baedc68326be11f9c0ce" ON "__chart__test_unique" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_a0cd75442dd10d0643a17c4a49" ON "__chart__test_unique" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_66e1e1ecd2f29e57778af35b59" ON "__chart__test_unique" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_b070a906db04b44c67c6c2144d" ON "__chart__test" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_92255988735563f0fe4aba1f05" ON "__chart__test" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_d41cce6aee1a50bfc062038f9b" ON "__chart__test" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_c5870993e25c3d5771f91f5003" ON "__chart__test" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_a319e5dbf47e8a17497623beae" ON "__chart__test" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f170de677ea75ad4533de2723e" ON "__chart__test" ("span", "date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_845254b3eaf708ae8a6cac3026" ON "__chart__users" ("date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7c184198ecf66a8d3ecb253ab3" ON "__chart__users" ("span") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_ed9b95919c672a13008e9487ee" ON "__chart__users" ("group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f091abb24193d50c653c6b77fc" ON "__chart__users" ("span", "date") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_337e9599f278bd7537fe30876f" ON "__chart__users" ("date", "group") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_a770a57c70e668cc61590c9161" ON "__chart__users" ("span", "date", "group") `,
		);
	}
	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "IDX_a770a57c70e668cc61590c9161"`);
		await queryRunner.query(`DROP INDEX "IDX_337e9599f278bd7537fe30876f"`);
		await queryRunner.query(`DROP INDEX "IDX_f091abb24193d50c653c6b77fc"`);
		await queryRunner.query(`DROP INDEX "IDX_ed9b95919c672a13008e9487ee"`);
		await queryRunner.query(`DROP INDEX "IDX_7c184198ecf66a8d3ecb253ab3"`);
		await queryRunner.query(`DROP INDEX "IDX_845254b3eaf708ae8a6cac3026"`);
		await queryRunner.query(`DROP INDEX "IDX_f170de677ea75ad4533de2723e"`);
		await queryRunner.query(`DROP INDEX "IDX_a319e5dbf47e8a17497623beae"`);
		await queryRunner.query(`DROP INDEX "IDX_c5870993e25c3d5771f91f5003"`);
		await queryRunner.query(`DROP INDEX "IDX_d41cce6aee1a50bfc062038f9b"`);
		await queryRunner.query(`DROP INDEX "IDX_92255988735563f0fe4aba1f05"`);
		await queryRunner.query(`DROP INDEX "IDX_b070a906db04b44c67c6c2144d"`);
		await queryRunner.query(`DROP INDEX "IDX_66e1e1ecd2f29e57778af35b59"`);
		await queryRunner.query(`DROP INDEX "IDX_a0cd75442dd10d0643a17c4a49"`);
		await queryRunner.query(`DROP INDEX "IDX_d70c86baedc68326be11f9c0ce"`);
		await queryRunner.query(`DROP INDEX "IDX_bbfa573a8181018851ed0b6357"`);
		await queryRunner.query(`DROP INDEX "IDX_5c73bf61da4f6e6f15bae88ed1"`);
		await queryRunner.query(`DROP INDEX "IDX_437bab3c6061d90f6bb65fd2cc"`);
		await queryRunner.query(`DROP INDEX "IDX_84e661abb7bd1e51b690d4b017"`);
		await queryRunner.query(`DROP INDEX "IDX_b14489029e4b3aaf4bba5fb524"`);
		await queryRunner.query(`DROP INDEX "IDX_a5133470f4825902e170328ca5"`);
		await queryRunner.query(`DROP INDEX "IDX_234dff3c0b56a6150b95431ab9"`);
		await queryRunner.query(`DROP INDEX "IDX_2be7ec6cebddc14dc11e206686"`);
		await queryRunner.query(`DROP INDEX "IDX_0c641990ecf47d2545df4edb75"`);
		await queryRunner.query(`DROP INDEX "IDX_e316f01a6d24eb31db27f88262"`);
		await queryRunner.query(`DROP INDEX "IDX_229a41ad465f9205f1f5703291"`);
		await queryRunner.query(`DROP INDEX "IDX_edeb73c09c3143a81bcb34d569"`);
		await queryRunner.query(`DROP INDEX "IDX_8cf3156fd7a6b15c43459c6e3b"`);
		await queryRunner.query(`DROP INDEX "IDX_65633a106bce43fc7c5c30a5c7"`);
		await queryRunner.query(`DROP INDEX "IDX_f7bf4c62059764c2c2bb40fdab"`);
		await queryRunner.query(`DROP INDEX "IDX_f68a5ab958f9f5fa17a32ac23b"`);
		await queryRunner.query(`DROP INDEX "IDX_5048e9daccbbbc6d567bb142d3"`);
		await queryRunner.query(`DROP INDEX "IDX_046feeb12e9ef5f783f409866a"`);
		await queryRunner.query(`DROP INDEX "IDX_55bf20f366979f2436de99206b"`);
		await queryRunner.query(`DROP INDEX "IDX_8d2cbbc8114d90d19b44d626b6"`);
		await queryRunner.query(`DROP INDEX "IDX_84234bd1abb873f07329681c83"`);
		await queryRunner.query(`DROP INDEX "IDX_4db3b84c7be0d3464714f3e0b1"`);
		await queryRunner.query(`DROP INDEX "IDX_b77d4dd9562c3a899d9a286fcd"`);
		await queryRunner.query(`DROP INDEX "IDX_57b5458d0d3d6d1e7f13d4e57f"`);
		await queryRunner.query(`DROP INDEX "IDX_4b3593098b6edc9c5afe36b18b"`);
		await queryRunner.query(`DROP INDEX "IDX_f92dd6d03f8d994f29987f6214"`);
		await queryRunner.query(`DROP INDEX "IDX_7af07790712aa3438ff6773f3b"`);
		await queryRunner.query(`DROP INDEX "IDX_f2aeafde2ae6fbad38e857631b"`);
		await queryRunner.query(`DROP INDEX "IDX_30bf67687f483ace115c5ca642"`);
		await queryRunner.query(`DROP INDEX "IDX_42ea9381f0fda8dfe0fa1c8b53"`);
		await queryRunner.query(`DROP INDEX "IDX_e496ca8096d28f6b9b509264dc"`);
		await queryRunner.query(`DROP INDEX "IDX_328f259961e60c4fa0bfcf55ca"`);
		await queryRunner.query(`DROP INDEX "IDX_5f86db6492274e07c1a3cdf286"`);
		await queryRunner.query(`DROP INDEX "IDX_924fc196c80ca24bae01dd37e4"`);
		await queryRunner.query(`DROP INDEX "IDX_f09d543e3acb16c5976bdb31fa"`);
		await queryRunner.query(`DROP INDEX "IDX_0c9a159c5082cbeef3ca6706b5"`);
		await queryRunner.query(`DROP INDEX "IDX_7036f2957151588b813185c794"`);
		await queryRunner.query(`DROP INDEX "IDX_e69096589f11e3baa98ddd64d0"`);
		await queryRunner.query(`DROP INDEX "IDX_42eb716a37d381cdf566192b2b"`);
		await queryRunner.query(`DROP INDEX "IDX_9ff6944f01acb756fdc92d7563"`);
		await queryRunner.query(`DROP INDEX "IDX_0a905b992fecd2b5c3fb98759e"`);
		await queryRunner.query(`DROP INDEX "IDX_08fac0eb3b11f04c200c0b40dd"`);
		await queryRunner.query(`DROP INDEX "IDX_7b5da130992ec9df96712d4290"`);
		await queryRunner.query(`DROP INDEX "IDX_f8dd01baeded2ffa833e0a610a"`);
		await queryRunner.query(`DROP INDEX "IDX_a1efd3e0048a5f2793a47360dc"`);
		await queryRunner.query(`DROP INDEX "IDX_f5448d9633cff74208d850aabe"`);
		await queryRunner.query(`DROP INDEX "IDX_39ee857ab2f23493037c6b6631"`);
		await queryRunner.query(`DROP INDEX "IDX_d0a4f79af5a97b08f37b547197"`);
		await queryRunner.query(`DROP INDEX "IDX_da8a46ba84ca1d8bb5a29bfb63"`);
		await queryRunner.query(`DROP INDEX "IDX_c12f0af4a66cdd30c2287ce8aa"`);
		await queryRunner.query(`DROP INDEX "IDX_6b8f34a1a64b06014b6fb66824"`);
		await queryRunner.query(`DROP INDEX "IDX_6d6f156ceefc6bc5f273a0e370"`);
		await queryRunner.query(`DROP INDEX "IDX_25a97c02003338124b2b75fdbc"`);
		await queryRunner.query(`DROP INDEX "IDX_49975586f50ed7b800fdd88fbd"`);
		await queryRunner.query(`DROP INDEX "IDX_99a7d2faaef84a6f728d714ad6"`);
		await queryRunner.query(`DROP INDEX "IDX_fcc181fb8283009c61cc4083ef"`);
		await queryRunner.query(`DROP INDEX "IDX_07747a1038c05f532a718fe1de"`);
		await queryRunner.query(`DROP INDEX "IDX_e9cd07672b37d8966cf3709283"`);
		await queryRunner.query(`DROP INDEX "IDX_dd907becf76104e4b656659e6b"`);
		await queryRunner.query(`DROP INDEX "IDX_2d416e6af791a82e338c79d480"`);
		await queryRunner.query(`DROP INDEX "IDX_76e87c7bfc5d925fcbba405d84"`);
		await queryRunner.query(`DROP INDEX "IDX_e447064455928cf627590ef527"`);
		await queryRunner.query(`DROP INDEX "IDX_36cb699c49580d4e6c2e6159f9"`);
		await queryRunner.query(`DROP INDEX "IDX_06690fc959f1c9fdaf21928222"`);
		await queryRunner.query(`DROP INDEX "IDX_3313d7288855ec105b5bbf6c21"`);
		await queryRunner.query(`DROP INDEX "IDX_6e1df243476e20cbf86572ecc0"`);
		await queryRunner.query(`DROP INDEX "IDX_7a170f67425e62a8fabb76c872"`);
		await queryRunner.query(`DROP INDEX "IDX_3fa0d0f17ca72e3dc80999a032"`);
		await queryRunner.query(`DROP INDEX "IDX_13565815f618a1ff53886c5b28"`);
		await queryRunner.query(`DROP INDEX "IDX_c26e2c1cbb6e911e0554b27416"`);
		await queryRunner.query(`DROP INDEX "IDX_9a3ed15a30ab7e3a37702e6e08"`);
		await queryRunner.query(`DROP INDEX "IDX_20f57cc8f142c131340ee16742"`);
		await queryRunner.query(`DROP INDEX "IDX_00ed5f86db1f7efafb1978bf21"`);
		await queryRunner.query(`DROP INDEX "IDX_15e91a03aeeac9dbccdf43fc06"`);
		await queryRunner.query(`DROP INDEX "IDX_0ad37b7ef50f4ddc84363d7ccc"`);
		await queryRunner.query(`DROP INDEX "IDX_90148bbc2bf0854428786bfc15"`);
		await queryRunner.query(`DROP INDEX "IDX_88937d94d7443d9a99a76fa5c0"`);
		await queryRunner.query(`DROP INDEX "IDX_54ebcb6d27222913b908d56fd8"`);
		await queryRunner.query(`DROP INDEX "IDX_796a8c03959361f97dc2be1d5c"`);
		await queryRunner.query(`DROP INDEX "IDX_25dfc71b0369b003a4cd434d0b"`);
		await queryRunner.query(`DROP INDEX "IDX_51c063b6a133a9cb87145450f5"`);
		await queryRunner.query(`DROP INDEX "IDX_fa99d777623947a5b05f394cae"`);
		await queryRunner.query(`DROP INDEX "IDX_315c779174fe8247ab324f036e"`);
		await queryRunner.query(`DROP INDEX "IDX_c5d46cbfda48b1c33ed852e21b"`);
		await queryRunner.query(`DROP INDEX "IDX_8cb40cfc8f3c28261e6f887b03"`);
	}
}
