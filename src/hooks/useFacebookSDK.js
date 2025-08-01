import { useEffect } from 'react';

const useFacebookSDK = () => {
    useEffect(() => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '3561324430664351',
                cookie: true,
                xfbml: true,
                version: 'v19.0',
            });
        };
    }, []);
};

export default useFacebookSDK;
