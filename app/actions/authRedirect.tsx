import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const withAuthRedirect = (WrappedComponent: any) => {
    const AuthRedirect = (props: any) => {
        const router = useRouter();
        const accessToken = props.accessToken;

        useEffect(() => {
            if (typeof accessToken === 'string' && accessToken.length > 0) {
                router.replace('/contacts');
            }
        }, [accessToken, router]);

        return <WrappedComponent {...props} />;
    };

    return AuthRedirect;
};
