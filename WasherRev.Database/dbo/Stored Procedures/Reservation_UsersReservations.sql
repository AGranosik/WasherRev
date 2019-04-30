CREATE PROCEDURE Reservation_UsersReservations(
		@Date datetime = null,
		@UsersId int
)
AS
BEGIN
	DECLARE @lDate datetime = @Date

	SELECT * FROM [dbo].[Reservation]
	WHERE UsersId = @UsersId
	AND
	(@lDate IS NULL OR YEAR(@lDate) = YEAR(StartTime))
	AND
	(@lDate IS NULL OR MONTH(@lDate) = MONTH(StartTime))

END