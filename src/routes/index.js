import config from '~/config';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Login from '~/pages/Auth/Login';
import Register from '~/pages/Auth/Register';
import EmailForm from '~/pages/Auth/ForgotPassword/EmailForm';
import OTPForm from '~/pages/Auth/ForgotPassword/OTPForm';
import NewPasswordForm from '~/pages/Auth/ForgotPassword/NewPasswordForm';
import Post from '~/pages/Post';
import Network from '~/pages/Network';

//khong can dang nhap cung access duoc
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.post, component: Post },
    { path: config.routes.network, component: Network },
    { path: config.routes.forgotPassword, component: EmailForm, layout: null },
    { path: config.routes.verifyOtp, component: OTPForm, layout: null },
    { path: config.routes.newPassword, component: NewPasswordForm, layout: null },
];

//yeu cau dang nhap moi access duoc
const privateRoutes = [];

export { publicRoutes, privateRoutes };
