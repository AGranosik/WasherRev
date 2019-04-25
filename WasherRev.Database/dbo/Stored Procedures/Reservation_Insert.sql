CREATE PROCEDURE Reservation_Insert(
	@UsersId INT,
	@StartTime DATETIME,
	@EndTime DATETIME,
	@WasherId INT,
	@IsDeleted bit
)
AS
BEGIN
	INSERT INTO [dbo].[Reservation] VALUES(
		@UsersId,
		@StartTime,
		@EndTime,
		@WasherId,
		@IsDeleted
	)

	SELECT SCOPE_IDENTITY()
END