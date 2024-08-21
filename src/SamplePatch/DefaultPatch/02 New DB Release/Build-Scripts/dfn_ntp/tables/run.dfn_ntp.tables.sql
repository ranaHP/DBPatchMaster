spool log.run.dfn_ntp.tables replace

whenever sqlerror exit
set echo on
set define off
set sqlblanklines on

@@dfn_ntp.t13_notifications.tab.sql

spool off
