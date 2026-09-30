import { IEmailService } from '@/Application/Interfaces/Services/IEmailService';
import { resend } from '../Config/mail.config';
import { env } from '../Config/env';
import { OTPMailTemplate } from '../EmailTemplates/OTPTemplate';
import { WeeklyProgressReportDTO } from '@/Application/Cron/dto/WeeklyProgressReport.dto';
import { WeeklyProgressReportTemplate } from '../EmailTemplates/WeeklyProgressReportTemplate';
import {
    SubscriptionExpiredNotificationDTO,
    SubscriptionExpiryReminderDTO
} from '@/Application/Cron/dto/SubscriptionReminder.dto';
import { SubscriptionExpiryReminderTemplate } from '../EmailTemplates/SubscriptionExpiryReminderTemplate';
import { SubscriptionExpiredTemplate } from '../EmailTemplates/SubscriptionExpiredTemplate';

export class MailService implements IEmailService {
    async sendOTP(email: string, otp: string): Promise<void> {
        await resend.emails.send({
            from: env.EMAIL_FROM,
            to: email,
            subject: 'Your OTP code',
            html: OTPMailTemplate(otp)
        });
    }

    async sendWeeklyProgressReport(report: WeeklyProgressReportDTO) {
        await resend.emails.send({
            from: env.EMAIL_FROM,
            to: report.parentEmail,
            subject: "📊 Your Child's Weekly Progress Report",
            html: WeeklyProgressReportTemplate(report)
        });
    }

    async sendSubscriptionExpiryReminder(
        dto: SubscriptionExpiryReminderDTO
    ): Promise<void> {
        await resend.emails.send({
            from: env.EMAIL_FROM,
            to: dto.parentEmail,
            subject: '⏰ Your CodeCrush Premium Subscription Expires Tomorrow',
            html: SubscriptionExpiryReminderTemplate(dto)
        });
    }

    async sendSubscriptionExpiredNotification(
        dto: SubscriptionExpiredNotificationDTO
    ): Promise<void> {
        await resend.emails.send({
            from: env.EMAIL_FROM,
            to: dto.parentEmail,
            subject: '❌ Your CodeCrush Premium Subscription Has Expired',
            html: SubscriptionExpiredTemplate(dto)
        });
    }
}