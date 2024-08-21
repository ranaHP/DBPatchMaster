CREATE OR REPLACE PROCEDURE dfn_ntp.sp_get_sms_email_notification (
    notification_event   IN     NUMBER,
    notification_list       OUT SYS_REFCURSOR)
--This procedure is used in notification server
IS
    l_query          VARCHAR2 (4000);
    s1               VARCHAR2 (15000);
    psortby          VARCHAR2 (15);
    ptorownumber     NUMBER;
    pfromrownumber   NUMBER;
BEGIN
    psortby := 'notification_id';
    ptorownumber := 1000;
    pfromrownumber := 0;
    l_query :=
        'SELECT t13.t13_id as notification_id,
                         t13.t13_mobile as mobile,
                         t13.t13_from_email as from_email,
                         t13.t13_to_email as to_email,
                         t13.t13_cc_emails as cc_emails,
                         t13.t13_message_body as message_body,
                         t13.t13_notification_type as notification_type,
                         t13.t13_lang as lang,
                         t13.t13_bcc_emails as bcc_emails,
                         t13.t13_priority as priority ,
                         t13.t13_message_subject as message_subject,
                         t13.t13_attcmnt_avalble as is_attachemnt,
                         t13.t13_image_url as image_url,
                         t13_device_token as device_token,
                         t13_push_topic_id_m229 as push_topic_id,
                         m229.m229_topic_name,
                         t13_push_broadcast as is_broadcasting,
                         m149.m149_email_subject as email_subject,
                         m149.m149_email_subject_lang as email_subject_lang,
                         m149.m149_email_template as email_template,
                         m149.m149_email_template_lang as email_template_lang,
                         m149.m149_sms_template as sms_template,
                         m149.m149_sms_template_lang as sms_template_lang,
                         m149.m149_extnl_template_id as extnl_template_id,
                         m149.m149_push_notif_template as push_notif_template,
                         m149.m149_push_notif_template_lang as push_notif_template_lang,
                         u01.u01_customer_no as customer_no,
                         u06.u06_investment_account_no as investment_account_no,
                         u07.u07_exchange_account_no as exchange_account_no,
                         u09.u09_login_name as login_name,
                         m101.m101_external_channel_id as external_channel_id
                    FROM t13_notifications t13
                         LEFT OUTER JOIN vw_m149_notify_templates m149
                             ON (t13.t13_event_id_m148 = m149.m149_event_id_m148
                                AND t13.t13_institution_id_m02 = m149.m149_institute_id_m02)
                         LEFT OUTER JOIN u01_customer u01
                             ON t13.t13_customer_id_u01 = u01.u01_id
                         LEFT OUTER JOIN u06_cash_account u06
                             ON t13.t13_cash_acc_id_u06 = u06.u06_id
                         LEFT OUTER JOIN u07_trading_account u07
                             ON t13.t13_trad_acc_id_u07 = u07.u07_id
                         LEFT OUTER JOIN u09_customer_login u09
                             ON t13.t13_login_id_u09 = u09.u09_id
                         LEFT OUTER JOIN m229_topic_master m229
                             ON t13.t13_push_topic_id_m229 = m229.m229_id
                         LEFT OUTER JOIN m101_notification_channels m101
                             ON t13.t13_notification_type = m101.m101_id
                   WHERE     t13_notification_status = 0 AND t13_id > -1';

    IF notification_event = 1
    THEN    --otp sms notifications - send all otp messages for event type = 1
        l_query :=
               l_query --  || ' AND t13_event_id_m148 = 1 AND t13_notification_type = 3';
            || ' AND t13_event_id_m148 = 1 AND t13_notification_type IN (2, 3, 6, 7)';
    ELSIF notification_event = 2
    THEN                                          --none otp all notifications
        l_query :=
               l_query
            || ' AND t13_event_id_m148 <> 1 AND t13_notification_type IN (2, 3, 6, 7)';
    ELSIF notification_event = 3 --notification_event = 3 is to fetch all the messages
    THEN
        l_query := l_query || ' AND t13_notification_type IN (2, 3, 6, 7)';
    END IF;

    s1 :=
        fn_get_sp_data_query (NULL,
                              l_query,
                              psortby,
                              ptorownumber,
                              pfromrownumber);

    OPEN notification_list FOR s1;
END;
/