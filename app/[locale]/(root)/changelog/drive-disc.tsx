import { getListDriveDisc } from '@/services/hakushin/api/drive-disc';
import ListDriveDiscs from '@/components/pages/list-drive-disc';

async function ChangelogDriveDiscs(props: { discIds: number[]; title?: string }) {
	const { discIds, title } = props;
	const driveDiscs = await getListDriveDisc({ ids: discIds });
	if ('error' in driveDiscs) return null;
	return <ListDriveDiscs driveDiscs={driveDiscs} title={title} />;
}

export default ChangelogDriveDiscs;
