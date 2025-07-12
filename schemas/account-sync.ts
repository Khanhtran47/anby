import { z } from 'zod';

export const hoyolabAccountSchema = z
	.object({
		server: z.string().min(1, 'Server is required').describe('Your Game Server'),
		uid: z
			.string()
			.min(8, 'UID must be at least 8 digits')
			.max(20, 'UID must be at most 20 digits')
			.regex(/^\d+$/, 'UID must be a number')
			.describe('User ID'),
		itoken: z
			.string()
			.regex(/^$|^v2_[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, 'Invalid iToken format')
			.optional()
			.describe('iToken for authentication'),
		ituid: z.string().optional().describe('iTuid for authentication'),
	})
	.superRefine((data, ctx) => {
		if (data.server === 'america' && !data.uid.toString().startsWith('10')) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'UID for America server must start with 10',
				path: ['uid'],
			});
		}
		if (data.server === 'europe' && !data.uid.toString().startsWith('15')) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'UID for Europe server must start with 15',
				path: ['uid'],
			});
		}
		if (data.server === 'asia' && !data.uid.toString().startsWith('13')) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'UID for Asia server must start with 13',
				path: ['uid'],
			});
		}
		if (data.server === 'tw-hk-mo' && !data.uid.toString().startsWith('17')) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'UID for Taiwan, Hong Kong, Macao server must start with 17',
				path: ['uid'],
			});
		}
		if (data.itoken && !data.ituid) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'iTuid is required when iToken is provided',
				path: ['ituid'],
			});
		}
		if (data.ituid && !data.itoken) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'iToken is required when iTuid is provided',
				path: ['itoken'],
			});
		}
	});

export type HoyolabAccount = z.infer<typeof hoyolabAccountSchema>;
