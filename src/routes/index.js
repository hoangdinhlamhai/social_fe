import config from '~/config';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';

//khong can dang nhap cung access duoc
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
];

//yeu cau dang nhap moi access duoc
const privateRoutes = [];

export { publicRoutes, privateRoutes };
