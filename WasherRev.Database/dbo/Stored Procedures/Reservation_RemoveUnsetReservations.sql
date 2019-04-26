CREATE PROCEDURE Reservation_RemoveUnsetReservations(
	@Date datetime = null -- if null reservation will be removed for the current month
)
AS
BEGIN
	DECLARE @lDate datetime = @Date
	IF @Date IS NULL
	BEGIN
		SET @lDate = GETDATE()
	END

	DECLARE @Month int = MONTH(@lDate);
	DECLARE @Year int = YEAR(@lDate);

	DELETE FROM [dbo].[Reservation]
	WHERE MONTH(StartTime) = @Month
	AND
	YEAR(StartTime) = @Year
	AND
	UsersId = null 

END