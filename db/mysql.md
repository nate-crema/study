# Mysql DB shell access

---

## 접근

    [bash-3.2# Cd /usr/local/mysql/bin

    [bash-3.2# ./mysql -p
    [Enter Password: [password-user]


    ---


    [bash-3.2# ./mysql -uroot -p
    Enter password: [password-user(root)]

    mysql>

## 구조

    Database (폴더)
    ㄴ table (기록 카드)
	    ㄴ column (열 제목)



## 제어


### 생성
mysql 신규 DB 생성

	mysql> Create database [database_name] default character set utf8;

mysql 신규 테이블 생성

	mysql> Create table [table_name] ([place the column which you want to insert]);

	Ex) mysql> create table information (name varchar(32));


table 컬럼 추가

	mysql> alter table [table_name] add [colum name] [colum_options];
	
	Ex) alter table test_table add test_b_colum varchar(255) not null default ‘0’;


mysql db에 데이터 신규 생성

	mysql> Insert into [table_name] ([table_list_a], [table_list_b], [table_list_c], [table_list_d])

	-> values ([table_list_a_value], [table_list_b_value], [table_list_c_value], [table_list_d_value]);

	———————or————————

	mysql> INSERT INTO [table_name] VALUES ([table_list_value]);




### 조회/선택

mysql db 조회

	mysql> Show databases;

mysql table 조회

	mysql> Show tables;

mysql db 선택(사용할 경우)

	mysql> Use [database_name]

table 데이터 보기 (모두)

	mysql> Select * from [table_name];


table 데이터 검색

	mysql> select [find_field_name(=column)] from [table_name] where [search_rule];

table 구성보기 (컬럼 보기)
	mysql> Desc [table_name];



### 수정


table 이름 변경

	mysql> alter table [table_name_pre] rename [table_name_aft];

데이터 변경

	mysql> update [table_name] set [colum_name]=‘[change_contents]’ where [target_colum_name] = ‘[target_colum_data]’;

table 안의 내용 모두 지우기 (table 초기화) (복구가능)

	mysql> delete from [table_name];

mysql table 내용 삭제 (복구불가)
 
	mysql> truncate table [table_name];

mysql table 통으로 삭제

	mysql> drop table [table_name];

* delete & truncate & drop 차이:
    > delete: 안에 데이터만 삭제, 열&행 등의 기존공간은 그대로 차지 (복구가능)
    > truncate: 안에 컬럼만 유지, 나머지 삭제 (복구불가)
    > drop: table을 통째로 소멸. 컬럼, 데이터 모두 삭제 (복구불가)

table 컬럼 삭제
	
	mysql> alter table [table_name] drop [colum_name];

mysql table의 컬럼 속성 수정

	mysql> alter table [table_name] modify [colum_name] [colum_specific]

mysql 컬럼 이름 변경

	mysql> alter table [table_name] change [colum_name_pre] [colum_name_aft] [colum_type];



---

## 예시


Ex) dept 테이블 안에 int타입으로 11자리까지 받을 수 있고 null값을 받을 수 없는 컬럼 생성

    Create table dept (
        dept_no INT(11) NOT NULL
    );



Ex2) 아래와 같은 컬럼정보로 table 제작

필드         || 	타입     			|| Null || 	Key     ||      Default     ||      Extra     ||   


Id				bigint(20) unsigned	    no		PRI			    NULL	            auto_increment
Subject			varchar(255)		    no					    NULL				
Content			mediumtext			    yes					    NULL		
Created			datetime			    yes					    NULL
user_id			int(10) unsigned	    yes					    NULL
user_name		varchar(32)			    no					    NULL
Hit   			int(10) unsigned	    no					    0

---

    Create table posts (
        id bright(20) unsigned not null auto_increment,
        subject varchar(255) not null,
        content mediumtext
        created datetime,
        user_id int(10) unsigned not null,
        user_name varchar(32) not null,
        hit int(10) unsigned not null default ‘0’
    );

---





