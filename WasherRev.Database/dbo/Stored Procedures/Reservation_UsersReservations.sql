CREATE PROCEDURE Reservation_UsersReservations(
		@Date datetime = null, -- if null reservation will be removed for the current month
		@UsersId int
)
AS
BEGIN
	DECLARE @lDate datetime = @Date
	IF @Date IS NULL
	BEGIN
		SET @lDate = GETDATE()
	END

	SELECT * FROM [dbo].[Reservation]
	WHERE UsersId = @UsersId
	AND
	YEAR(@lDate) = YEAR(StartTime)
	AND
	MONTH(@lDate) = MONTH(StartTime)

END