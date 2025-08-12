import config from '~/config';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Login from '~/pages/Auth/Login';
import Register from '~/pages/Auth/Register';
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
];

//yeu cau dang nhap moi access duoc
const privateRoutes = [];

export { publicRoutes, privateRoutes };
