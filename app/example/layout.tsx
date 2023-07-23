import { Navigator } from '../../components/navigator/Navigator';
import { ReactNode } from 'react';

const NavigatorLayout = (props: { children: ReactNode }) => {
	return (
		<>
			<Navigator />
			{props.children}
		</>
	);
};

export default NavigatorLayout;
