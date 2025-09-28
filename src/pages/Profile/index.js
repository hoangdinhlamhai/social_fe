import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import ProfileHeader from './components/ProfileHeader';
import ProfileSidebar from './components/ProfileSidebar';
import ProfileActivity from './components/ProfileActivity';
import ProfileExperience from './components/ProfileExperience';
import ProfileEducation from './components/ProfileEducation';
import ProfileSkill from './components/ProfileSkill';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMeProfileApi, getUserProfileApi } from '~/services/user.service';

const cx = classNames.bind(styles);

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const { accessToken } = useSelector((state) => state.auth);
    const { email: emailFromParams } = useParams();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await getUserProfileApi(accessToken, emailFromParams);
                setProfileData(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfileData();
    }, [emailFromParams, accessToken]);

    if (!profileData) {
        return <div>Loading...</div>;
    }

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
