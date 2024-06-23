export const NAVIGATION_LINKS = {
    HOME: '/',
    PRIVACY_POLICY: '/privacy-policy',
    TERMS_CONDITIONS: '/terms-conditions',
    CUSTOMER_FEEDBACK: '/customer-feedback',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',

    FORUM_OVERVIEW: '/forums',
    CREATE_POST: '/create-thread',
    POST_OVERVIEW: '/threads',
    SETTINGS: '/dashboard/settings',

    ADMIN_LOGIN: '/auth/admin/login',
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_MANAGE_USERS: '/admin/dashboard/users',
    ADMIN_MANAGE_SITE_CONTENT: '/admin/dashboard/site-content',
    ADMIN_MANAGE_CUSTOMER_FEEDBACK: '/admin/dashboard/customer-feedback'
};

export const protectedRoutes = [

    NAVIGATION_LINKS.SETTINGS,
    NAVIGATION_LINKS.CREATE_POST,
    NAVIGATION_LINKS.LOGOUT,

    NAVIGATION_LINKS.ADMIN_DASHBOARD,
    NAVIGATION_LINKS.ADMIN_MANAGE_USERS,
    NAVIGATION_LINKS.ADMIN_MANAGE_SITE_CONTENT,
];

export const adminProtectedRoutes = [
    NAVIGATION_LINKS.ADMIN_DASHBOARD,
    NAVIGATION_LINKS.ADMIN_MANAGE_USERS,
    NAVIGATION_LINKS.ADMIN_MANAGE_SITE_CONTENT,
];

export const authRoutes = [
    NAVIGATION_LINKS.LOGIN,
    NAVIGATION_LINKS.REGISTER,
    NAVIGATION_LINKS.FORGOT_PASSWORD,
    NAVIGATION_LINKS.ADMIN_LOGIN,
];

export const publicRoutes = [
    NAVIGATION_LINKS.HOME,
    // NAVIGATION_LINKS.CREATE_POST,
    NAVIGATION_LINKS.FORUM_OVERVIEW,
    NAVIGATION_LINKS.POST_OVERVIEW,
];

export const specialRoutes = [
    NAVIGATION_LINKS.PRIVACY_POLICY,
    NAVIGATION_LINKS.TERMS_CONDITIONS,
    NAVIGATION_LINKS.CUSTOMER_FEEDBACK,
];