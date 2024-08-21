DECLARE
    l_count   NUMBER := 0;
    l_ddl     VARCHAR2 (1000)
        := 'CREATE TABLE dfn_csm.t15_stlmnt_instuction_request
                (
                    t15_id                     NUMBER (10, 0),
                    t15_date                   DATE,
                    t15_status                 NUMBER (5, 0),
                    t15_reason                 VARCHAR2 (500 BYTE),
                    t15_acc_no                 VARCHAR2 (30 BYTE),
                    t15_l1_approved_by         NUMBER (20, 0),
                    t15_l1_approved_date       DATE,
                    t15_l2_approved_by         NUMBER (20, 0),
                    t15_l2_approved_date       DATE,
                    t15_csm_ref                NUMBER (18, 0),
                    t15_clearing_type          NUMBER (1, 0),
                    t15_clearing_member_code   VARCHAR2 (100 BYTE),
                    t15_is_manually_executed   NUMBER (1, 0),
                    t15_firm_id                VARCHAR2 (10 BYTE)
                )';
BEGIN
    SELECT COUNT (*)
      INTO l_count
      FROM all_tables
     WHERE     owner = UPPER ('dfn_csm')
           AND table_name = UPPER ('t15_stlmnt_instuction_request');

    IF l_count = 0
    THEN
        EXECUTE IMMEDIATE l_ddl;
    END IF;
END;
/

GRANT ALTER ON dfn_csm.t15_stlmnt_instuction_request TO dfn_ntp
/
GRANT DELETE ON dfn_csm.t15_stlmnt_instuction_request TO dfn_ntp
/
GRANT INDEX ON dfn_csm.t15_stlmnt_instuction_request TO dfn_ntp
/
GRANT INSERT ON dfn_csm.t15_stlmnt_instuction_request TO dfn_ntp
/
GRANT SELECT ON dfn_csm.t15_stlmnt_instuction_request TO dfn_ntp
/
GRANT UPDATE ON dfn_csm.t15_stlmnt_instuction_request TO dfn_ntp
/

DECLARE
    l_count   NUMBER := 0;
    l_ddl     VARCHAR2 (1000)
        := 'CREATE INDEX dfn_csm.idx_t15_date    ON dfn_csm.t15_stlmnt_instuction_request ("T15_DATE" DESC)';
BEGIN
    SELECT COUNT (*)
      INTO l_count
      FROM all_indexes
     WHERE     owner = UPPER ('dfn_csm')
           AND table_name = UPPER ('t15_stlmnt_instuction_request')
           AND index_name = UPPER ('idx_t15_date');

    IF l_count = 0
    THEN
        EXECUTE IMMEDIATE l_ddl;
    END IF;
END;
/