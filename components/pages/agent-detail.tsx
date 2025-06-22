interface AgentDetailProps {
	agentId: string;
	name?: string;
	description?: string;
	img?: string;
	icon?: string;
}

function AgentDetail(props: AgentDetailProps) {
	const {
		// agentId,
		name,
		// description,
		// img,
		// icon,
	} = props;
	return <div>{name}</div>;
}

export default AgentDetail;
