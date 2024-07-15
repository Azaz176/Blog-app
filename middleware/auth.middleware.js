import { validateToken } from '../utils/authentication.js'

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            console.error('Token validation error:', error);
        }

        next();
    };
}

export default checkForAuthenticationCookie;
