import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import type { HoyolabAccount } from '@/schemas/account-sync';
import type { useForm } from 'react-hook-form';

interface AccountDialogProps {
	form: ReturnType<typeof useForm<HoyolabAccount>>;
	onSubmit: (values: HoyolabAccount) => void;
	type: 'add' | 'edit';
}

function AccountDialog(props: AccountDialogProps) {
	const { form, onSubmit } = props;

	return (
		<ScrollArea
			className="3xl:h-[calc(100dvh-20rem)] flex h-[calc(95dvh-16.5rem)] w-full flex-col gap-4 sm:h-[calc(100dvh-18.5rem)]"
			type="always"
		>
			<form
				className="flex w-full flex-col gap-4"
				id="hoyolab-settings-form"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="server"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Server</FormLabel>
							<Select value={field.value || ''} onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select your server" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className="z-[80]">
									<SelectItem value="america">America</SelectItem>
									<SelectItem value="europe">europe</SelectItem>
									<SelectItem value="asia">asia</SelectItem>
									<SelectItem value="tw-hk-mo">Asia</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								Select your game server. This is required for account sync.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="uid"
					render={({ field }) => (
						<FormItem>
							<FormLabel>UID</FormLabel>
							<FormControl>
								<Input placeholder="UID" {...field} />
							</FormControl>
							<FormDescription>
								Your in-game UID. It must be a number between 8 and 10 digits.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ltoken"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ltoken</FormLabel>
							<FormControl>
								<Input placeholder="ltoken" {...field} />
							</FormControl>
							<FormDescription>
								Your ltoken for authentication. It must be in the format `v2_xxx.xxx.xxx`.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ltuid"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ltuid</FormLabel>
							<FormControl>
								<Input placeholder="ltuid" {...field} />
							</FormControl>
							<FormDescription>Your ltuid for authentication. It must be a number.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</ScrollArea>
	);
}

export default AccountDialog;
