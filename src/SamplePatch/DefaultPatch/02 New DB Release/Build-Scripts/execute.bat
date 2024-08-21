cd dfn_ntp
sqlplus %str4%@%1 @master.sql
cd ..\
call recompile %str1%  %str2%  %str3%  %str4% %str5% %str6% %str7%

start summary.exe

