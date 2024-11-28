import { useCallback, useEffect, useState } from 'react';

function useWindowResize() {
	const [isDesktopView, setIsDesktopView] = useState(window.innerWidth > 768);

	const handleResize = useCallback(() => {
		setIsDesktopView(window.innerWidth > 768);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

	return isDesktopView;
}

export default useWindowResize;
