import { getListBangboo } from '@/services/hakushin/api/bangboo';
import ListBangboos from '@/components/pages/list-bangboo';

async function ChangelogBangboos(props: { bangbooIds: number[]; title?: string }) {
	const { bangbooIds, title } = props;
	const bangboos = await getListBangboo({ ids: bangbooIds });
	if ('error' in bangboos) return null;
	return <ListBangboos bangboos={bangboos} title={title} />;
}

export default ChangelogBangboos;
