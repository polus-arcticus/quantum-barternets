import { createBrowserRouter } from 'react-router-dom';
import { Root } from './root';
import { loader as basicsLoader } from '@/routes/learning/basics/loader';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				index: true,
				lazy: async () => {
					const { HomePage } = await import('@/routes/home/page');
					return { Component: HomePage };
				},
			},
      {
        path: 'economic-theory',
        lazy: async () => {
          const { EconomicsPage } = await import('@/routes/economic-theory/page');
          return { Component: EconomicsPage };
        },
				children: [
          {
            path: 'why-barter',
            lazy: async () => {
              const { WhyBarterPage } = await import('@/routes/economic-theory/why-barter/page');
              return { Component: WhyBarterPage };
            },
          }
				]
      },
			{
        path: 'barter-networks',
        lazy: async () => {
          const { BarterNetworksPage } = await import('@/routes/barter-networks/page');
          return { Component: BarterNetworksPage };
        },
			},
			{
				path: 'learning',
        lazy: async () => {
          const { LearningPage } = await import('@/routes/learning/page');
          return { Component: LearningPage };
        },
				children: [
					{
						path: 'sdp',
						lazy: async () => {
							const { SDPPage } = await import('@/routes/learning/sdp/page');
							return { Component: SDPPage };
						},
					},
					{
						path: 'maxcut',
						lazy: async () => {
							const { MaxCutPage } = await import('@/routes/learning/maxcut/page');
							return { Component: MaxCutPage };
						},
					},
					{
						path: 'gwa',
						lazy: async () => {
							const { GWAPage } = await import('@/routes/learning/gwa/page');
							return { Component: GWAPage };
						},
					},
					{
						path: 'basics',
						loader: basicsLoader,
						lazy: async () => {
							const { BasicsPage } = await import('@/routes/learning/basics/page');
							return { Component: BasicsPage };
						},
					}
				]
			}
		]
	}
]);
