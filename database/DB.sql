--DROP TABLE "logapi";

CREATE TABLE "logapi"(
		"id"			integer	NOT NULL DEFAULT nextval('logapi_id_seq'::regclass),
		"dsurl"			character varying(500)	NULL,
		"dsrequest"			character varying(1000)	NULL,
		"dsresponse"			character varying(1000)	NULL,
		"dsemailuser"			character varying(250)	NULL,
		"dtlog"			timestamp with time zone	NOT NULL DEFAULT now()
);

--DROP TABLE "user_account";

CREATE TABLE "user_account"(
		"id"			integer	NOT NULL DEFAULT nextval('user_account_id_seq'::regclass),
		"name"			character varying(100)	NOT NULL,
		"email"			character varying(100)	NOT NULL,
		"pass"			character varying(200)	NOT NULL,
		"active"			boolean	NOT NULL DEFAULT true,
		"createdat"			timestamp with time zone	NOT NULL DEFAULT now(),
		"updatedat"			timestamp with time zone	NULL
);



--ADICIONA CONSTRAINTS DA TABELA "logapi"  RELACIONADO A TABELA ()


--ADICIONA CONSTRAINTS DA TABELA "user_account"  RELACIONADO A TABELA ()

