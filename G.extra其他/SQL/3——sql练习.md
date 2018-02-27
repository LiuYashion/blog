# SQL练习


http://blog.csdn.net/flycat296/article/details/63681089




Student(S#, Sname, Sage, Ssex) 学生表
S#学生编号, Sname学生姓名, Sage出生年月, Ssex学生性别

Course(C#, Cname, T#) 课程表 
C#课程编号, Cname课程名称, T#教师编号

Teacher(T#, Tname) 教师表 
T#教师编号, Tname教师姓名

SC(S#, C#, score) 成绩表
S#学生编号, C#课程编号, score分数


学生表 Student
create table Student(
  S# varchar(10), Sname nvarchar(10), Sage datetime, Ssex nvarchar(10)
)
insert into Student values('01' , N'赵雷' , '1990-01-01' , N'男')
insert into Student values('02' , N'钱电' , '1990-12-21' , N'男')
insert into Student values('03' , N'孙风' , '1990-05-20' , N'男')
insert into Student values('04' , N'李云' , '1990-08-06' , N'男')
insert into Student values('05' , N'周梅' , '1991-12-01' , N'女')
insert into Student values('06' , N'吴兰' , '1992-03-01' , N'女')
insert into Student values('07' , N'郑竹' , '1989-07-01' , N'女')
insert into Student values('08' , N'王菊' , '1990-01-20' , N'女')


科目表 Course
create table Course(
  C# varchar(10), Cname nvarchar(10), T# varchar(10)
)
insert into Course values('01' , N'语文' , '02')
insert into Course values('02' , N'数学' , '01')
insert into Course values('03' , N'英语' , '03')


教师表 Teacher
create table Teacher(
  T# varchar(10), Tname nvarchar(10)
)
insert into Teacher values('01' , N'张三')
insert into Teacher values('02' , N'李四')
insert into Teacher values('03' , N'王五')


成绩表 SC
create table SC(
  S# varchar(10), C# varchar(10), score decimal(18,1)
)
insert into SC values('01' , '01' , 80)
insert into SC values('01' , '02' , 90)
insert into SC values('01' , '03' , 99)
insert into SC values('02' , '01' , 70)
insert into SC values('02' , '02' , 60)
insert into SC values('02' , '03' , 80)
insert into SC values('03' , '01' , 80)
insert into SC values('03' , '02' , 80)
insert into SC values('03' , '03' , 80)
insert into SC values('04' , '01' , 50)
insert into SC values('04' , '02' , 30)
insert into SC values('04' , '03' , 20)
insert into SC values('05' , '01' , 76)
insert into SC values('05' , '02' , 87)
insert into SC values('06' , '01' , 31)
insert into SC values('06' , '03' , 34)
insert into SC values('07' , '02' , 89)
insert into SC values('07' , '03' , 98)