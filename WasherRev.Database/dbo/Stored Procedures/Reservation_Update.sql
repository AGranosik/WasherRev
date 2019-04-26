CREATE PROCEDURE Reservation_Update(
	@Id INT,
	@UsersId INT,
	@StartTime DATETIME,
	@EndTime DATETIME,
	@WasherId INT
)
AS
BEGIN
	UPDATE [dbo].[Reservation]
	SET
		UsersId = ISNULL(@UsersId, UsersId),
		StartTime = ISNULL(@StartTime, StartTime),
		EndTime = ISNULL(@EndTime, EndTime),
		WasherId = ISNULL(@WasherId, WasherId)
	WHERE Id = @Id
END