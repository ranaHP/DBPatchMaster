DECLARE l_count NUMBER := 0;
l_ddl VARCHAR2 (1000) := '
    CREATE SEQUENCE DFN_NTP.SEQ_T110_ID
    MINVALUE 1
    MAXVALUE 99999999999999999999
    INCREMENT BY 1
    START WITH 1
    NOCACHE';
BEGIN 
    SELECT COUNT (*)
    INTO l_count
    FROM all_sequences
    WHERE sequence_owner = UPPER ('dfn_ntp')
    AND sequence_name = UPPER ('seq_t110_id');

    IF l_count = 0
    THEN
        EXECUTE IMMEDIATE l_ddl;
    END IF;
END;
/