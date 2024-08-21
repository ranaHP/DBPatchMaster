

DECLARE
    l_count   NUMBER := 0;
    l_ddl     VARCHAR2 (1000)
        := 'ALTER TABLE dfn_arc.t12_share_transaction RENAME COLUMN t12_umsg_id_t19 TO t12_umsg_id_t521_c';
BEGIN
    SELECT COUNT (*)
      INTO l_count
      FROM all_tab_columns
     WHERE     owner = UPPER ('dfn_arc')
           AND table_name = UPPER ('t12_share_transaction')
           AND column_name = UPPER ('t12_umsg_id_t19');
    IF l_count = 1
    THEN
        EXECUTE IMMEDIATE l_ddl;
    END IF;
END;
/