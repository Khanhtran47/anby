import { getListWEngine } from '@/services/hakushin/api/w-engine';
import ErrorToast from '@/components/features/error-toast';
import { ListWEngines } from '@/components/pages/list-w-engine';

async function ChangelogWEngines(props: { wEngineIds: number[]; title?: string }) {
	const { wEngineIds, title } = props;
	const wEngines = await getListWEngine({ ids: wEngineIds });
	if ('error' in wEngines) return <ErrorToast title={wEngines.error} />;
	return <ListWEngines title={title} wEngines={wEngines} />;
}

export default ChangelogWEngines;
