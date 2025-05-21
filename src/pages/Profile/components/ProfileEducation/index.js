import classNames from 'classnames/bind';
import styles from './ProfileEducation.module.scss';
import logo from '~/assets/images/bld.jpeg';

const cx = classNames.bind(styles);

const schools = [
    {
        logo: { logo },
        name: 'UTE - Trường Đại học Sư phạm Kỹ thuật ĐN',
        diploma: 'Software Engineering',
        field: 'Internship',
        timeStart: 'thg 4 2024',
        timeEnd: 'thg 4 2024',
        class: '22T3',
        description: '',
        skills: 'Data Analysis, Marketing và hơn 2 kỹ năng khác',
    },
    {
        logo: { logo },
        name: 'Content Creator',
        diploma: 'YouTube',
        field: 'Self-employed',
        timeStart: 'thg 1 2017',
        timeEnd: 'thg 1 2017',
        class: '22T3',
        description:
            '3.5 million+ Subscribers, 1.3 Billion+ total views, We Choice Awards Top 5, One of the top Youtubers in Vietnam. I produce, edit, post, and market my content, and I have worked with 50+ domestic and international brands (DuoLingo, Nestle, Notion, Google, Meta, Inivisalign, SamYang foods, Shiseido...)',
        skills: 'Management, Video Editing và hơn 3 kỹ năng khác',
    },
];

function ProfileEducation() {
    return (
        <div className={cx('education-section')}>
            <h2>Trình độ học vấn</h2>
            {schools.map((school, index) => (
                <div key={index} className={cx('education-item')}>
                    <div className={cx('logo')}>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('name')}>{school.name}</div>
                        <div className={cx('school')}>
                            {school.diploma} · {school.field}
                        </div>
                        <div className={cx('time')}>
                            {school.timeStart} - {school.timeEnd}
                        </div>
                        <div className={cx('class')}>{school.class}</div>
                        {school.description && <p className={cx('description')}>{school.description}</p>}
                        <div className={cx('skills')}>{school.skills}</div>
                    </div>
                </div>
            ))}

            <div className={cx('view-more')}>
                <a href="#">Hiển thị tất cả trường học →</a>
            </div>
        </div>
    );
}

export default ProfileEducation;
