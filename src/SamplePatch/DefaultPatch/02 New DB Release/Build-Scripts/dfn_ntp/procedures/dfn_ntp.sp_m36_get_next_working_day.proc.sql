CREATE OR REPLACE PROCEDURE dfn_ntp.sp_m36_get_next_working_day (
    pkey                      OUT DATE,
    pexchange_code                m36_settlement_calendar.m36_exchange_code_m01%TYPE DEFAULT 'TDWL',
    psymbol_settle_category       m36_settlement_calendar.m36_symbol_settle_category_v11%TYPE DEFAULT 0,
    pinstitution                  m36_settlement_calendar.m36_institution_id_m02%TYPE DEFAULT 1,
    pboard_code                   m36_settlement_calendar.m36_board_code_m54%TYPE DEFAULT 'SAEQ',
    pdate                         DATE DEFAULT SYSDATE,
    pno_of_dates                  NUMBER DEFAULT 0,
    psettlement_date_grp          INT DEFAULT 0)
IS
    l_date     DATE := TRUNC (pdate);
    l_m35_id   NUMBER := 0;
BEGIN
    SELECT m35_id
      INTO l_m35_id
      FROM m35_customer_settl_group
     WHERE m35_institute_id_m02 = pinstitution AND m35_is_default = 1;

    IF psettlement_date_grp > 0
    THEN
        l_m35_id := psettlement_date_grp;
    END IF;

    SELECT TRUNC (MIN (m36_date))
      INTO l_date
      FROM m36_settlement_calendar
     WHERE     m36_working_day > 0
           AND m36_date >= l_date
           AND m36_exchange_code_m01 = pexchange_code
           AND m36_board_code_m54 = pboard_code
           AND m36_symbol_settle_category_v11 = psymbol_settle_category
           AND m36_institution_id_m02 = pinstitution
           AND m36_cust_settle_group_id_m35 = l_m35_id;

    pkey := l_date;

    FOR i IN 1 .. pno_of_dates
    LOOP
        SELECT TRUNC (MIN (m36_date))
          INTO l_date
          FROM m36_settlement_calendar
         WHERE     m36_working_day > 0
               AND m36_date > l_date
               AND m36_exchange_code_m01 = pexchange_code
               AND m36_symbol_settle_category_v11 = psymbol_settle_category
               AND m36_institution_id_m02 = pinstitution
               AND m36_board_code_m54 = pboard_code
               AND m36_cust_settle_group_id_m35 = l_m35_id;

        pkey := l_date;
    END LOOP;
END;
/

