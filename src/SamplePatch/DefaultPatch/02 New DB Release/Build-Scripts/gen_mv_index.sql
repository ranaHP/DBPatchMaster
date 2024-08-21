SET PAGESIZE 300
set feedback off
set heading off
SPOOL mv_indx.SQL

select '--All the IOT and LOB indexes will not be moved to Index Tablespace--' from dual
/

select '--***********************************************************--' from dual
/

select '--Partitioned Indexes--' from dual
/

select '-----------------------------------------------------------' from dual
/

select 'ALTER INDEX "'|| i.INDEX_NAME ||'" REBUILD PARTITION '|| d.PARTITION_NAME || ' TABLESPACE '||c.INDEX_TBS||';'
from user_indexes i
	inner join user_ind_partitions d on i.INDEX_NAME = d.INDEX_NAME
    inner join dfn_ntp.config_idx_tablespaces c on user = c.owner
where i.INDEX_TYPE not in ('IOT - TOP','LOB')
and	i.TABLESPACE_NAME <> c.INDEX_TBS
and i.PARTITIONED = 'YES'
/		

select '--Non-Partitioned Indexes--' from dual
/

select '-----------------------------------------------------------' from dual
/

select 'ALTER INDEX "'|| i.INDEX_NAME ||'" REBUILD TABLESPACE '||c.INDEX_TBS||';'
from user_indexes i
inner join dfn_ntp.config_idx_tablespaces c on user = c.owner
where i.INDEX_TYPE not in ('IOT - TOP','LOB')
and	i.TABLESPACE_NAME <> c.INDEX_TBS	
and i.PARTITIONED <> 'YES'
/


select 'EXIT' from dual
/

SPOOL OFF
set feedback on
@mv_indx
SET PAGESIZE 80
set feedback on
set heading on
EXIT
