import { getListBangboo } from '@/services/hakushin/api/bangboo';
import ErrorToast from '@/components/features/error-toast';
import { ListBangboos } from '@/components/pages/list-bangboo';

async function ChangelogBangboos(props: { bangbooIds: number[]; title?: string }) {
	const { bangbooIds, title } = props;
	const bangboos = await getListBangboo({ ids: bangbooIds });
	if ('error' in bangboos) return <ErrorToast title={bangboos.error} />;
	return <ListBangboos bangboos={bangboos} title={title} />;
}

export default ChangelogBangboos;
