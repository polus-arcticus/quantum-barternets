import { Outlet } from 'react-router-dom';
import { Nav } from '@/components/nav';

export const Root = () => (
	<div className="min-h-screen bg-background-primary">
		<Nav />
		<Outlet />
	</div>
);

