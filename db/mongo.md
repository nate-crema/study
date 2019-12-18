# Mongo DB shell access


## 구조

    Database
    ㄴ collection
	    ㄴ document 

## 접근

    nate$ mongo


## 연산자

* $eq —> 같음
* $gt —>큼
* $gte —> 크거나 같음
* $lt —> 작음
* $lte —> 작거나 같음
* $ne —>일치하지 않음
* $in —> 배열 안에 속함
* $nin —> 배열 안에 속하지 않음


## 추가

db 추가

    > Use [dbname]

collection 생성

    > db.createCollection(“__<collection_name>__”, {_________<options>__________})

    > db.__<collection_name>__.insert({_____<options>_____})

Document 추가

    > db.__<collection_name>__.insert({<____document_info_____>})


## 확인

db 확인

    > Show dbs

collection 확인

    > show collections

Document 확인

    > db.[collection_name].find()

Document 예쁘게 확인

    > db.[collection_name].find().pretty()

Document 특정 값만 확인
Ex) writer가 velopert인 document 조회

    > db.articles.find({“writer”: “Velopert”}).pretty()


연산자 사용 특정값 조회

Ex) likes값이 30 이하인 document 조회

    > db.articles.find({“likes”: {$lte: 30}}).pretty()

Ex) likes 값이 10보다 크고 30보다 작은 document 조회 (예제 미완성)

    > db.__<collection_name>__.find( { “likes”: 


## 제거

db제거

    > use [database_name]
    > db.dropDatabase();

collection 제거

    > db.[collection_name].drop()

Document 제거

Ex) name이 book1인 document 제거

    > db.[collection_name].remove({“name”: “Book1”})

## 변경

Document 변경

    > db.[collection_name].update({[document_info]});



