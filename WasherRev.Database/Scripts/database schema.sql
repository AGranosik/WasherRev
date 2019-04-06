-- create database

IF (NOT EXISTS (SELECT name FROM dbo.sysdatabases
			WHERE ('[' + name + ']' = 'WasherRev' 
				OR name = 'WasherRev')))
BEGIN
	CREATE DATABASE WasherRev;
END

USE WasherRev;
-- building
IF NOT EXISTS (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
			WHERE TABLE_NAME = 'Building')
BEGIN
	
	CREATE TABLE Building(
		Id INT NOT NULL IDENTITY(1,1),
		Name varchar(MAX) NOT NULL,
		Street varchar(MAX) NOT NULL,
		StreetNo INT NOT NULL,
		PostCode varchar(20) NOT NULL,
		IsActive bit default(1)

		CONSTRAINT PK_BuldingId PRIMARY KEY(Id)
	);

END


-- rooms
IF NOT EXISTS (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
			WHERE TABLE_NAME = 'Room')
BEGIN

	CREATE TABLE Room(
		Id INT NOT NULL IDENTITY(1,1),
		Name varchar(MAX) NOT NULL,
		Floor int NOT NULL default(0),
		Capacity int default(0),
		BuildingId int not null,
		IsActive bit default(1)

		CONSTRAINT PK_RoomId PRIMARY KEY (Id),
		CONSTRAINT FK_Room_Building FOREIGN KEY (BuildingId) REFERENCES Building(Id)
	);

END

IF NOT EXISTS (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
			WHERE TABLE_NAME = 'Producer')
BEGIN
	CREATE TABLE Producer(
		Id INT NOT NULL IDENTITY(1,1),
		Name VARCHAR(MAX) NOT NULL,
		ServicePhoneNo VARCHAR(50) NOT NULL

		CONSTRAINT PK_ProducerId PRIMARY KEY (Id)
	);
		
END


-- create Washer table
IF NOT EXISTS (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
			WHERE TABLE_NAME = 'Washer')
BEGIN

	CREATE TABLE Washer (
		Id INT IDENTITY(1,1),
		Name varchar(128),
		RoomId INT NULL,
		ProducerId INT,
		SinceWhen DATETIME,
		IsActive bit default(1)

		CONSTRAINT Name_uniqueness UNIQUE (Name),
		CONSTRAINT PK_WasherId PRIMARY KEY (Id),
		CONSTRAINT FK_Room_Washer FOREIGN KEY (RoomId) REFERENCES Room(Id),
		CONSTRAINT FK_ProducerId_Washer FOREIGN KEY (ProducerId) REFERENCES Producer(Id)

	);

END


IF NOT EXISTS (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
			WHERE TABLE_NAME = 'Users')
BEGIN
	CREATE TABLE Users (
		Id INT IDENTITY(1,1),
		RoleNo INT NOT NULL,
		Username varchar(256) NOT NULL UNIQUE,
		Password varchar(MAX) NOT NULL,
		Email varchar(256) NOT NULL,
		RoomId INT NULL,
		IsActive bit default (1)

		CONSTRAINT PK_UsersId PRIMARY KEY(Id),
		CONSTRAINT FK_Users_Room FOREIGN KEY (RoomId) REFERENCES Room(Id)
	);
	CREATE NONCLUSTERED INDEX ux_Email ON Users(Email);
END

IF NOT EXISTS (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
			WHERE TABLE_NAME = 'Reservation')
BEGIN
	CREATE TABLE Reservation(
		Id INT IDENTITY(1,1),
		UsersId INT NOT NULL,
		StartTime DATETIME NOT NULL,
		EndTime DATETIME NOT NULL,
		WasherId INT NULL,
		IsDeleted bit default(0)

		CONSTRAINT PK_ReservationId PRIMARY KEY(Id),
		CONSTRAINT FK_Reservation_Washer FOREIGN KEY (WasherId) REFERENCES Room(Id),
		CONSTRAINT FK_Reservation_Users FOREIGN KEY (UsersId) REFERENCES Users(Id)
	);
	CREATE NONCLUSTERED INDEX ux_Washer ON Reservation(UsersId);
END

IF NOT EXISTS (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
			WHERE TABLE_NAME = 'BuildingUser')
BEGIN

	CREATE TABLE BuildingUser (
		Id INT IDENTITY (1,1),
		UsersId INT NOT NULL,
		BuildingId INT NOT NULL,
		
		CONSTRAINT PK_BuildingUserId PRIMARY KEY(Id),
		-- no composite PK, because one user can be administrator in multiple building
		CONSTRAINT FK_BuildingUser_Users FOREIGN KEY (UsersId) REFERENCES Users(Id),
		CONSTRAINT FK_BuildingUser_Building FOREIGN KEY (BuildingId) REFERENCES Building(Id)
	);

END

-- table which contains previous location of washers
IF NOT EXISTS (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
			WHERE TABLE_NAME = 'WasherRoomHistory')
BEGIN
	CREATE TABLE WasherRoomHistory(
		Id INT IDENTITY(1,1),
		UsersId INT NOT NULL,
		RoomId INT NOT NULL

		CONSTRAINT PK_WasherRoomHistoryId PRIMARY KEY(Id),
		CONSTRAINT FK_WasherRoomHistory_UsersId FOREIGN KEY (UsersId) REFERENCES Users(Id),
		CONSTRAINT FK_WasherRoomHistory_RoomId FOREIGN KEY (RoomId) REFERENCES Room(Id)
	);
END

-- User can change his location
IF NOT EXISTS (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
			WHERE TABLE_NAME = 'BuildingUsersHistory')
BEGIN
	CREATE TABLE BuildingUsersHistory(
		Id INT IDENTITY(1,1),
		UsersId INT NOT NULL,
		BuildingId INT NOT NULL

		CONSTRAINT PK_BuildingUsersHistoryId PRIMARY KEY(Id),
		CONSTRAINT FK_BuildingUsersHistory_UsersId FOREIGN KEY (UsersId) REFERENCES Users(Id),
		CONSTRAINT FK_BuildingUsersHistory_BuildingIdId FOREIGN KEY (BuildingId) REFERENCES Building(Id)
	);
END