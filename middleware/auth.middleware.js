import { validateToken } from '../utils/authentication.js'

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        //console.log('Token cookie value:', tokenCookieValue);
        
        if (!tokenCookieValue) {
            //console.log('No token cookie found');
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            //console.log('User payload:', userPayload);
            req.user = userPayload;
        } catch (error) {
            console.error('Token validation error:', error);
        }

        next();
    };
}

export default checkForAuthenticationCookie;
