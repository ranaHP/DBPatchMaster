

-- DFNNTP-DB_SA_ARBAH_10.007.1.0 VERSION UPDATE START --
BEGIN
	UPDATE dfn_ntp.v00_sys_config v00
		SET v00.v00_value = '10.007.1.0',
			v00.v00_description = 'DFNNTP-DB_SA_ARBAH_10.007.1.0', 
			v00_status_changed_date = SYSDATE, v00_modified_date = SYSDATE 
		WHERE v00.v00_key = 'VER_DB';


	INSERT INTO dfn_ntp.z10_version_audit_log
		VALUES(dfn_ntp.seq_z10_ver_audit_log.NEXTVAL,
				'DB Patch',
				SYSDATE,
				'DFNNTP-DB_X_X_10.009.70.0',
				'DFNNTP-DB_SA_X_10.047.0.0',
				'DFNNTP-DB_SA_ARBAH_10.007.1.0');
END;
/

COMMIT; 

-- DFNNTP-DB_SA_ARBAH_10.007.1.0 VERSION UPDATE END --