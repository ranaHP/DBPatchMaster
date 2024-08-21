CREATE OR REPLACE PROCEDURE dfn_ntp.sp_get_trade_history_report (
    p_view          OUT SYS_REFCURSOR,
    prows           OUT NUMBER,
    p_d1                DATE,
    p_d2                DATE,
    ptradingaccid       NUMBER,
    psymbol             VARCHAR2 DEFAULT NULL,
    pordside            NUMBER DEFAULT NULL,
    pinstitution        NUMBER DEFAULT 1)
IS
    l_qry   VARCHAR2 (15000);
BEGIN
    -- OPEN p_view FOR
    l_qry :=
        'SELECT t01_cl_ord_id,
               v01_description
                   AS order_side,
               v01_description_lang
                   AS order_side_lang,
               t01.t01_ord_no,
               ROUND (t01.t01_avg_price, 2)
                   AS t01_avgpx,
               ROUND (t01.t01_avg_cost, 2)
                   AS t01_avg_cost,
               t01.t01_date,
               t01.t01_symbol_code_m20,
               t01.t01_exchange_code_m01,
               t01.t01_cum_quantity,
               ROUND (t01.t01_ord_value, 2)
                   AS t01_ordvalue,
               ROUND (t01.t01_cum_netstl, 2)
                   AS t01_cumnetstl,
               m20.m20_short_description
                   AS m20_short_description,
               t01.t01_settle_currency,
               NVL (m20.m20_long_description, t01.t01_symbol_code_m20)
                   long_description,
               t01.t01_profit_loss,

               m20.m20_instrument_type_code_v09,
               t01_cum_commission
                   AS t01_commission,
               NVL (m20.m20_long_description_lang, t01.t01_symbol_code_m20)
                   long_description_ar,
               u07.u07_display_name,
               t01.t01_quantity,
               NVL ((t01.t01_cum_broker_tax + t01.t01_cum_exchange_tax), 0)
                   AS total_tax,
               t01_side,
               m20_symbol_code,
               m20_currency_code_m03,
               v30.v30_description,
               v30.v30_description_lang,
               ROUND (t01_price, 2)
                   t01_price,
               ROUND (t01_avg_price, 2)
                   t01_avg_price,
               t01_cum_broker_tax
                   AS t01_broker_tax,
               t01_cum_exchange_tax
                   AS t01_exchange_tax,
               t01_cum_net_value,
               TO_DATE (
                   TO_CHAR (t01_last_updated_date_time, ''YYYY-MM-DD HH:MI:SS AM''),
                   ''YYYY-MM-DD HH:MI:SS AM'')
                   AS format_last_update_date_time,
               u07_customer_no_u01
                   AS u01_customer_no,
               u07_display_name_u01
                   AS u01_display_name,
               u07_exchange_account_no
        FROM t01_order_all t01
             JOIN m20_symbol m20 ON t01.t01_symbol_id_m20 = m20.m20_id
             right JOIN u07_trading_account u07
                 ON t01.t01_trading_acc_id_u07 = u07.u07_id
             JOIN m03_currency m03 ON t01.t01_settle_currency = m03.m03_code
             JOIN v30_order_status v30
               ON t01.t01_status_id_v30 = v30.v30_status_id
             JOIN vw_v01_system_master_data
                 ON (v01_type = 15 AND t01.t01_side = v01_id)
        WHERE     t01_date BETWEEN TRUNC (:p_d1) AND TRUNC (:p_d2) + 0.99999
              AND t01_status_id_v30 IN (''1'',
                                        ''2'',
                                        ''q'',
                                        ''r'',
                                        ''5'')
             -- AND t01.t01_trade_process_stat_id_v01 IN (24, 25)
              AND t01.t01_cum_quantity > 0
              AND t01.t01_trading_acc_id_u07 = :ptradingaccid';

    IF psymbol IS NOT NULL
    THEN
        l_qry := l_qry || ' AND t01_symbol_code_m20 = :psymbol';
    END IF;

    IF pordside IS NOT NULL
    THEN
        l_qry := l_qry || 'AND t01_side = :pordside';
    END IF;

    l_qry := l_qry || ' ORDER BY t01_date, t01_ord_no';

    IF psymbol IS NOT NULL AND pordside IS NOT NULL
    THEN
        OPEN p_view FOR l_qry
            USING p_d1,
        p_d2,
        ptradingaccid,
        psymbol,
        pordside;
    ELSIF psymbol IS NOT NULL
    THEN
        OPEN p_view FOR l_qry
            USING p_d1,
        p_d2,
        ptradingaccid,
        psymbol;
    ELSIF pordside IS NOT NULL
    THEN
        OPEN p_view FOR l_qry
            USING p_d1,
        p_d2,
        ptradingaccid,
        pordside;
    ELSE
        OPEN p_view FOR l_qry USING p_d1, p_d2, ptradingaccid;
    END IF;
END;
/