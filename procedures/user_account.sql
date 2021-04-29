CREATE OR REPLACE FUNCTION prGetuser_account(pid int)
RETURNS TABLE (id int4, name varchar, email varchar, pass varchar, active bool, createdat timestamptz, updatedat timestamptz) AS $$
	select id, name, email, pass, active, createdat, updatedat
	from user_account
	where (id = pid or pid is null);
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION prPostuser_account(pname varchar, pemail varchar, ppass varchar)
RETURNS void AS $$
BEGIN	
	insert into user_account(name, email, pass) values (pname, pemail, ppass);
END; $$ 
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION prPutuser_account(pId int4, pname varchar, pemail varchar, ppass varchar, pactive bool)
RETURNS void AS $$
begin
	update user_account 
	set name = pname, email = pemail, pass = ppass, active = pactive , updatedat = now()
	where id = pid;
END; $$ 
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION prDeleteuser_account(pid int)
RETURNS void AS $$
begin
	delete from user_account 
	where id = pid;
END; $$ 
LANGUAGE plpgsql;