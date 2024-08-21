spool log.run.dfn_ntp.data replace

whenever sqlerror exit
set echo on
set define off
set sqlblanklines on

@@dfn_ntp.data_fixes.data.sql
@@dfn_ntp.update.app_seq_store.sql

spool off
