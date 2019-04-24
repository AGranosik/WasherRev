CREATE PROCEDURE Washer_Insert(
	@Name varchar(128),
	@RoomId INT NULL,
	@ProducerId INT,
	@SinceWhen DATETIME,
	@WorkedTo DATETIME,
	@IsActive bit
)
AS
BEGIN
	INSERT INTO [dbo].[Washer] VALUES
	(@Name,
	@RoomId,
	@ProducerId,
	@SinceWhen,
	@IsActive,
	@WorkedTo)
END