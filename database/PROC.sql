--Function/Procedure: prdbpersonalschema 
CREATE OR REPLACE FUNCTION public.prdbpersonalschema()
 RETURNS TABLE(categoria character varying, tabela character varying, coluna character varying, tipo character varying, formato character varying, isprimary boolean, tamanho integer, posicao integer)
 LANGUAGE plpgsql
AS $function$
BEGIN  
	RETURN QUERY
	SELECT
	  CASE c.relkind
	      WHEN 'r' THEN 'table'
	      WHEN 'v' THEN 'view'
	  END::VARCHAR                                                                ,
	  table_name::VARCHAR                                                         ,
	  column_name::VARCHAR                                                        ,
	  udt_name::VARCHAR                                                           ,      -- User Defined Types such as composite, enumerated etc.
	  format_type(a.atttypid, a.atttypmod)::VARCHAR ,
	  case when pk.indisprimary then true else false end,
	  CASE WHEN LOWER(data_type) = 'array' THEN information_schema._pg_char_max_length(arraytype.oid, a.atttypmod)
	  ELSE character_maximum_length END::INT                                 ,
	  ordinal_position::INT                                                   
	FROM information_schema.columns
	  INNER JOIN pg_catalog.pg_attribute a ON a.attname = column_name
	  INNER JOIN pg_catalog.pg_class c ON c.oid = a.attrelid AND c.relname = table_name
	  LEFT JOIN (SELECT pa.attname, i.indrelid, indisprimary
				 FROM   pg_index i
				 INNER JOIN   pg_attribute pa ON pa.attrelid = i.indrelid  
				 AND pa.attnum = ANY(i.indkey)
		         WHERE   i.indisprimary) pk on pk.indrelid =a.attrelid	and pk.attname = a.attname	
	  LEFT JOIN pg_catalog.pg_type arraytype ON arraytype.typname = RIGHT(udt_name, -1)
	  INNER JOIN pg_type t ON a.atttypid = t.oid
	--WHERE table_schema = ANY($1)
	WHERE table_schema = 'public'
	AND c.relkind = 'r' 
	ORDER BY table_schema, table_name, ordinal_position;
END;
$function$
 
;

--Function/Procedure: prdeletelogapi 
CREATE OR REPLACE FUNCTION public.prdeletelogapi(pid integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
	delete from logapi 
	where id = pid;
END; $function$
 
;

--Function/Procedure: prdeleteuser_account 
CREATE OR REPLACE FUNCTION public.prdeleteuser_account(pid integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
	delete from user_account 
	where id = pid;
END; $function$
 
;

--Function/Procedure: prpostlogapi 
CREATE OR REPLACE FUNCTION public.prpostlogapi(pdsurl character varying, pdsrequest character varying, pdsresponse character varying, pdsemailuser character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN	
	insert into logapi(dsurl, dsrequest, dsresponse, dsemailuser) values (pdsurl, pdsrequest, pdsresponse, pdsemailuser);
END; $function$
 
;

--Function/Procedure: prpostuser_account 
CREATE OR REPLACE FUNCTION public.prpostuser_account(pname character varying, pemail character varying, ppass character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN	
	insert into user_account(name, email, pass) values (pname, pemail, ppass);
END; $function$
 
;

--Function/Procedure: prputlogapi 
CREATE OR REPLACE FUNCTION public.prputlogapi(pid integer, pdsurl character varying, pdsrequest character varying, pdsresponse character varying, pdsemailuser character varying, pdtlog timestamp with time zone)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
	update logapi 
	set dsurl = pdsurl, dsrequest = pdsrequest, dsresponse = pdsresponse, dsemailuser = pdsemailuser, dtlog = pdtlog , updatedat = now()
	where id = pid;
END; $function$
 
;

--Function/Procedure: prputuser_account 
CREATE OR REPLACE FUNCTION public.prputuser_account(pid integer, pname character varying, pemail character varying, ppass character varying, pactive boolean)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
	update user_account 
	set name = pname, email = pemail, pass = ppass, active = pactive , updatedat = now()
	where id = pid;
END; $function$
 
;

