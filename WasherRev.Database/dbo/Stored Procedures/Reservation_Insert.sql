CREATE PROCEDURE Reservation_Insert(
	@UsersId INT,
	@StartTime DATETIME,
	@EndTime DATETIME,
	@WasherId INT
)
AS
BEGIN
	INSERT INTO [dbo].[Reservation] VALUES(
		@UsersId,
		@StartTime,
		@EndTime,
		@WasherId
	)

	SELECT SCOPE_IDENTITY()
END