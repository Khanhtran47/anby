import { getListDriveDisc } from '@/services/hakushin/api/drive-disc';
import ErrorToast from '@/components/features/error-toast';
import { ListDriveDisc } from '@/components/pages/list-drive-disc';

async function ChangelogDriveDiscs(props: { discIds: number[]; title?: string }) {
	const { discIds, title } = props;
	const driveDiscs = await getListDriveDisc({ ids: discIds });
	if ('error' in driveDiscs) return <ErrorToast title={driveDiscs.error} />;
	return <ListDriveDisc driveDiscs={driveDiscs} title={title} />;
}

export default ChangelogDriveDiscs;
