spool log.run.dfn_ntp.views replace

whenever sqlerror exit
set echo on
set define off
set sqlblanklines on

@@dfn_ntp.vw_customer_margin_call_log.view.sql

spool off
