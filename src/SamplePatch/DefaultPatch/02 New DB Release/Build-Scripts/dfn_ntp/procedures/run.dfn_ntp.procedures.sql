spool log.run.dfn_ntp.procedures replace

whenever sqlerror exit
set echo on
set define off
set sqlblanklines on

@@dfn_ntp.sp_get_sms_email_notification.proc.sql
@@dfn_ntp.sp_m36_get_next_working_day.proc.sql
@@dfn_ntp.sp_get_trade_history_report.proc.sql

spool off
