import UserDetail from "./UserDetail";

export default function UserDetailPage({ params }: { params: { id: string } }) {
	const userId = Number(params.id);
	return <UserDetail id={userId} />;
}
