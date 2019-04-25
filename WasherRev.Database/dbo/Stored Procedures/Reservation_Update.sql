CREATE PROCEDURE Reservation_Update(
	@Id INT,
	@UsersId INT,
	@StartTime DATETIME,
	@EndTime DATETIME,
	@WasherId INT,
	@IsDeleted bit
)
AS
BEGIN
	UPDATE [dbo].[Reservation]
	SET
		UsersId = ISNULL(@UsersId, UsersId),
		StartTime = ISNULL(@StartTime, StartTime),
		EndTime = ISNULL(@EndTime, EndTime),
		WasherId = ISNULL(@WasherId, WasherId),
		IsDeleted = IsDeleted
	WHERE Id = @Id
END