import styles from './MonthYearPicker.module.scss';

function MonthYearPicker({ id, name, value = '', onChange, required, disabled, max }) {
    const [year = '', month = ''] = value.split('-');
    const currentYear = new Date().getFullYear();
    const lastYear = Number(max?.slice(0, 4)) || currentYear + 10;
    const firstYear = Math.min(1900, Number(year) || 1900);
    const change = (nextYear, nextMonth) => {
        onChange({ target: { name, value: nextYear || nextMonth ? `${nextYear}-${nextMonth}` : '', type: 'text' } });
    };
    return (
        <div className={styles.picker}>
            <select id={id} aria-label={`${name === 'startDate' ? 'Bắt đầu' : 'Kết thúc'} - tháng`}
                value={month} required={required} disabled={disabled} onChange={e => change(year, e.target.value)}>
                <option value="">Tháng</option>
                {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
                    <option key={m} value={m}>Tháng {Number(m)}</option>
                ))}
            </select>
            <select aria-label={`${name === 'startDate' ? 'Bắt đầu' : 'Kết thúc'} - năm`}
                value={year} required={required} disabled={disabled} onChange={e => change(e.target.value, month)}>
                <option value="">Năm</option>
                {Array.from({ length: lastYear - firstYear + 1 }, (_, i) => lastYear - i).map(y => (
                    <option key={y} value={y}>{y}</option>
                ))}
            </select>
        </div>
    );
}

export default MonthYearPicker;
