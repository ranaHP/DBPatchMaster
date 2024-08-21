DECLARE
    l_count   NUMBER := 0;
    l_ddl     VARCHAR2 (1000)
        := 'CREATE SEQUENCE dfn_csm.seq_t15_id INCREMENT BY 1
                                   START WITH 1
                                   MINVALUE 1
                                   MAXVALUE 999999999999999999
                                   NOCYCLE
                                   NOORDER
                                   CACHE 20';
BEGIN
    SELECT COUNT (*)
      INTO l_count
      FROM all_sequences
     WHERE     sequence_owner = UPPER ('dfn_csm')
           AND sequence_name = UPPER ('seq_t15_id');

    IF l_count = 0
    THEN
        EXECUTE IMMEDIATE l_ddl;
    END IF;
END;
/

GRANT ALTER ON dfn_csm.seq_t15_id TO dfn_ntp
/
GRANT SELECT ON dfn_csm.seq_t15_id TO dfn_ntp
/