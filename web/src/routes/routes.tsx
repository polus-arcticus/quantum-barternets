import { createBrowserRouter } from 'react-router-dom';
import { Root } from './root';
import { loader as basicsLoader } from '@/routes/basics/loader';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
      {
        path: 'sdp',
        lazy: async () => {
          const { SDPPage } = await import('@/routes/sdp/page');
          return { Component: SDPPage };
        },
      },
			{
				index: true,
				lazy: async () => {
					const { HomePage } = await import('@/routes/home/page');
					return { Component: HomePage };
				},
			},
			{
				path: 'basics',
				loader: basicsLoader,
				lazy: async () => {
					const { BasicsPage } = await import('@/routes/basics/page');
					return { Component: BasicsPage };
				},
			}
		]
	}
]);
