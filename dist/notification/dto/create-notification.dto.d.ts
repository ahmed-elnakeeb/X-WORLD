import { Notification_types } from '../../types/enum';
export declare class CreateNotificationDto {
    type: Notification_types;
    for_user_uuid: string;
    tweet_uuid: string;
    from_user_uuid?: string;
    chat_threas_uuid?: string;
    text: string;
}
