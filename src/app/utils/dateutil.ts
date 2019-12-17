import { formatDate } from '@angular/common';
import { FORMAT_DATE_CONSTANT } from '../app.constants';

export class DatetimeUtils {

    public static setTimeOffset(date: Date): Date {
        const time = new Date();
        time.setHours(date.getHours());
        time.setMinutes(date.getMinutes());
        time.setSeconds(date.getSeconds());
        return time;
    }

    public static toShortDateTimeFormat(date: string): string {
        return formatDate(date, FORMAT_DATE_CONSTANT.short_date_time_format, 'en');
    }

    public static toShortDateFormat(date: string): string {
      return formatDate(date, FORMAT_DATE_CONSTANT.short_date_format, 'en');
    }

    public static toShortDateStandard(date: string): string {
      return formatDate(date, FORMAT_DATE_CONSTANT.short_date_standard, 'en');
    }

}
