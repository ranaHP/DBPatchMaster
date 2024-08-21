DECLARE
    l_count   NUMBER := 0;

    l_ddl     VARCHAR2 (1000)
        := 'ALTER TABLE dfn_ntp.t13_notifications  ADD ( t13_push_topic_id_m229 NUMBER (10) )';
BEGIN
    SELECT COUNT (*)
      INTO l_count
      FROM all_tab_columns
     WHERE     owner = UPPER ('dfn_ntp')
           AND table_name = UPPER ('t13_notifications')
           AND column_name = UPPER ('t13_push_topic_id_m229');

    IF l_count = 0
    THEN
        EXECUTE IMMEDIATE l_ddl;
    END IF;
END;
/

DECLARE
    l_count   NUMBER := 0;

    l_ddl     VARCHAR2 (1000)
        := 'ALTER TABLE dfn_ntp.t13_notifications  ADD ( t13_push_broadcast NUMBER (1) DEFAULT 0)';
BEGIN
    SELECT COUNT (*)
      INTO l_count
      FROM all_tab_columns
     WHERE     owner = UPPER ('dfn_ntp')
           AND table_name = UPPER ('t13_notifications')
           AND column_name = UPPER ('t13_push_broadcast');

    IF l_count = 0
    THEN
        EXECUTE IMMEDIATE l_ddl;
    END IF;
END;
/

COMMENT ON COLUMN dfn_ntp.t13_notifications.t13_push_broadcast IS
    '0 - No | 1 -Yes to a Topic'
/