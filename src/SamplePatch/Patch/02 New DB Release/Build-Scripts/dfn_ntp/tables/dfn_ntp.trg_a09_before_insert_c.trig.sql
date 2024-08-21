CREATE OR REPLACE TRIGGER dfn_ntp.trg_a09_before_insert_c
    BEFORE INSERT
    ON dfn_ntp.a09_function_approval_log
    REFERENCING NEW AS new OLD AS old
    FOR EACH ROW
DECLARE
    l_enabled        v14_controllable_features.enabled%TYPE;
    l_a09_function   a09_function_approval_log.a09_function%TYPE;
BEGIN
    SELECT NVL (MAX (enabled), 0)
      INTO l_enabled
      FROM v14_controllable_features
     WHERE id = 99;

    IF l_enabled = 0 AND :new.a09_function IS NULL
    THEN
        SELECT MAX (t06_code)
          INTO l_a09_function
          FROM t06_cash_transaction
         WHERE     t06_date >= TRUNC (SYSDATE)
               AND t06_function_id_m88 = :new.a09_function_id_m88;

        IF l_a09_function IS NULL
        THEN
            SELECT MAX (t12_code_m97)
              INTO l_a09_function
              FROM t12_share_transaction
             WHERE     t12_timestamp >= TRUNC (SYSDATE)
                   AND t12_function_id_m88 = :new.a09_function_id_m88
                   AND t12_id = :new.a09_request_id;
        END IF;

        IF l_a09_function IS NULL
        THEN
            SELECT MAX (t20_code_m97)
              INTO l_a09_function
              FROM t20_pending_pledge
             WHERE     t20_entered_date >= TRUNC (SYSDATE)
                   AND t20_function_id_m88 = :new.a09_function_id_m88
                   AND t20_id = :new.a09_request_id;
        END IF;

        IF l_a09_function IS NULL
        THEN
            SELECT MAX (m88_function)
              INTO l_a09_function
              FROM m88_transaction_approval
             WHERE m88_id = :new.a09_function_id_m88;
        END IF;

        :new.a09_function := l_a09_function;
    END IF;
END;
/