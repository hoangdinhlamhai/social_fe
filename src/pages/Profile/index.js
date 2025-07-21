import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import ProfileHeader from './components/ProfileHeader';
import ProfileSidebar from './components/ProfileSidebar';
import ProfileActivity from './components/ProfileActivity';
import ProfileExperience from './components/ProfileExperience';
import ProfileEducation from './components/ProfileEducation';
import ProfileSkill from './components/ProfileSkill';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMeProfileApi } from '~/services/user.service';
import axios from 'axios';

const cx = classNames.bind(styles);

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const { accessToken, accountLogin } = useSelector((state) => state.auth);
    const email = accountLogin?.email;

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/users/${email}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // thêm JWT vào header Authorization
                },
            })
            .then((res) => {
                setProfileData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [email]);

    return (
        <div className={cx('profile-page')}>
            <div className={cx('main')}>
                <ProfileHeader
                    profileData={profileData}
                    onProfileUpdate={async () => {
                        try {
                            const updated = await getMeProfileApi({ accessToken });
                            setProfileData(updated); // Cập nhật state tại cha
                        } catch (err) {
                            console.error('Lỗi khi cập nhật profile:', err);
                        }
                    }}
                />
                <ProfileActivity profileData={profileData} />
                <ProfileExperience profileData={profileData} />
                <ProfileEducation profileData={profileData} />
                <ProfileSkill profileData={profileData} />
            </div>
            <ProfileSidebar profileData={profileData} />
        </div>
    );
}

export default Profile;
